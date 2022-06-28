import pg from "pg";
const { Pool } = pg;

const { NODE_ENV } = process.env;

const dev_mode = NODE_ENV === "develop";

export const pool = new Pool({
  user: dev_mode ? "postgres" : "eksbmiocszwtha",
  password: dev_mode
    ? "Kirkhammett1990"
    : "96e87aed06f2627342606c7c5f3e337bf97f4a930ff9e9b78ac4e088226d70aa",
  host: dev_mode ? "localhost" : "ec2-54-159-22-90.compute-1.amazonaws.com",
  port: 5432,
  database: dev_mode ? "jira" : "d3vdp5e6gpeeuv",
});
