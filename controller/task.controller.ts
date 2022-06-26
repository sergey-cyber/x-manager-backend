import { Request, Response } from "express";
import { pool } from "../db/db";
import { DBException, projectNotFoundException, taskNotFoundException } from "../utils/exceptions";

export class TaskController {
  async createTask(req: Request, res: Response) {
    try {
      const { name, description, created, type, status, project_id } = req.body;
      const project = await pool.query(`select * from project where id = $1`, [project_id]);
      if (!project.rows[0]) {
        projectNotFoundException(res, project_id);
      }
      const newTask = await pool.query(
        `INSERT INTO task (name, description, created, type, status, project_id) values ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [name, description, created, type, status, project_id]
      );
      if (!newTask.rows[0]) {
        const error = {
          message: `Error while create new task`,
          details: null,
        };
        res.status(404).json(error);
      } else {
        res.json(newTask.rows[0]);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getTasksByProject(req: Request, res: Response) {
    try {
      const project_id = req.params.project_id;
      const project = await pool.query(`select * from project where id = $1`, [project_id]);
      console.log(project);
      if (!project.rows[0]) {
        projectNotFoundException(res, project_id);
      }

      if (project.rows[0].name === "error") {
        DBException(res);
      }
      const tasks = await pool.query(`select * from task where project_id = $1`, [project_id]);
      res.json(tasks.rows);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      const { id, name, description, updated, type, status } = req.body;
      console.log(req.body);
      const updatedTask = await pool.query(
        `UPDATE task set name = $1, description = $2, updated = $3, type = $4, status = $5 where id = $6 RETURNING *`,
        [name, description, updated, type, status, id]
      );
      if (updatedTask.rows[0]) {
        res.json(updatedTask.rows[0]);
      } else {
        taskNotFoundException(res, id);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      const task_id = req.params.task_id;
      const task = await pool.query(`select * from task where id = $1`, [task_id]);
      if (!task.rows[0]) {
        taskNotFoundException(res, task_id);
      } else {
        await pool.query(`DELETE FROM task where id = $1`, [task_id]);
        res.status(200).json("Объект удален успешно");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
