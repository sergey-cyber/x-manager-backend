import express from "express";
import { TaskController } from "../controller/task.controller";

export const taskRouter = express.Router();
const taskController = new TaskController();

taskRouter.post("/task", taskController.createTask);
taskRouter.get("/task/:project_id", taskController.getTasksByProject);
taskRouter.delete("/task/:task_id", taskController.deleteTask);
taskRouter.put("/task", taskController.updateTask);
