const process = require("process");

module.exports = {
  user: process.env.MIGRATION_SUPABASE_DB_USER,
  password: process.env.MIGRATION_SUPABASE_DB_PASSWORD,
  host: process.env.MIGRATION_SUPABASE_DB_HOST,
  database: process.env.MIGRATION_SUPABASE_DB_DATABASE,
  port: process.env.MIGRATION_SUPABASE_DB_PORT
};
