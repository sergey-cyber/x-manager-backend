import { Request, Response } from "express";

export function setCors(req: Request, res: Response, next: () => void) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
}
