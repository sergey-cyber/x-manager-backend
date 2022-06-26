import { Response } from "express";

enum ExceptionCodes {
  NOT_FOUND = 404,
  DB_EXCEPTION = 5000,
}

export const projectNotFoundException = (res: Response, project_id: string) => {
  const error = {
    code: ExceptionCodes.NOT_FOUND,
    message: `Project with id: ${project_id} not found`,
    details: null,
  };
  res.status(404).json(error);
};

export const taskNotFoundException = (res: Response, task_id: string) => {
  const error = {
    code: ExceptionCodes.NOT_FOUND,
    message: `Task with id: ${task_id} not found`,
    details: null,
  };
  res.status(404).json(error);
};

export const DBException = (res: Response) => {
  const error = {
    code: ExceptionCodes.DB_EXCEPTION,
    message: `Data base Error`,
    details: null,
  };
  res.status(500).json(error);
};
