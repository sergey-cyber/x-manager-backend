import pg from "pg";
const { Pool } = pg;

export const pool = new Pool({
  user: "postgres",
  password: "Kirkhammett1990",
  host: "localhost",
  port: 5432,
  database: "jira",
});
