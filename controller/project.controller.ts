import { Request, Response } from "express";
import { pool } from "../db/db";
import { projectNotFoundException } from "../utils/exceptions";

export class ProjectController {
  async createProject(req: Request, res: Response) {
    try {
      const { name, description, created, status, ownerId, icon } = req.body;
      const newProject = await pool.query(
        `INSERT INTO project ( name, description, created, status, ownerId, icon) values ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [name, description, created, status, ownerId, icon]
      );
      res.json(newProject.rows[0]);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getProjects(req: Request, res: Response) {
    try {
      const projects = await pool.query("select * from project");
      res.json(projects.rows);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getOneProject(req: Request, res: Response) {
    try {
      const project_id = req.params.id;
      const project = await pool.query(`select * from project where id = $1`, [project_id]);
      if (project.rows[0]) {
        res.json(project.rows[0]);
      } else {
        projectNotFoundException(res, project_id);
      }
    } catch (error) {
      res.json(error);
    }
  }

  async updateProject(req: Request, res: Response) {
    try {
      const { id, name, description, status, updated } = req.body;
      const updatedProject = await pool.query(
        `UPDATE project set name = $1, description = $2, status = $3, updated = $4 where id = $5 RETURNING *`,
        [name, description, status, updated, id]
      );
      if (updatedProject.rows[0]) {
        res.json(updatedProject.rows[0]);
      } else {
        projectNotFoundException(res, id);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async deleteProject(req: Request, res: Response) {
    try {
      const project_id = req.params.id;
      const project = await pool.query(`select * from project where id = $1`, [project_id]);
      if (!project.rows[0]) {
        projectNotFoundException(res, project_id);
      } else {
        // TODO: Сейчас сначала удаляются все таски со ссылкой на проект, потом сам проект. Скорее всего это можно как-то объеденить
        await pool.query(`DELETE FROM task where project_id = $1`, [project_id]);
        await pool.query(`DELETE FROM project where id = $1`, [project_id]);
        res.status(200).json({ status: "OK", message: "Проект удален успешно" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
