import express from "express";
import { ProjectController } from "../controller/project.controller";

export const projectRouter = express.Router();
const projectController = new ProjectController();

projectRouter.post("/project", projectController.createProject);
projectRouter.get("/project", projectController.getProjects);
projectRouter.get("/project/:id", projectController.getOneProject);
projectRouter.put("/project", projectController.updateProject);
projectRouter.delete("/project/:id", projectController.deleteProject);
