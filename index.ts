import express from "express";
import "dotenv/config";
import { projectRouter } from "./routes/project.router";
import { setCors } from "./middleware/setCors";
import { taskRouter } from "./routes/task.router";

const PORT = process.env.PORT || 8080;

console.log(process.env.NODE_ENV);

const app = express();

app.use(express.json());
app.use(setCors);
app.use("/api", projectRouter);
app.use("/api", taskRouter);

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});
