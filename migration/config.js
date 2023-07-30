const process = require("process");

module.exports = {
  user: process.env.SUPABASE_DB_USER,
  password: process.env.SUPABASE_DB_PASSWORD,
  host: process.env.SUPABASE_DB_HOST,
  database: process.env.SUPABASE_DB_DATABASE,
  port: process.env.SUPABASE_DB_PORT
};
