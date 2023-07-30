import { Pool, PoolConfig } from "pg";
import config from "../../config";

export async function queryDb(query: string, params?: any[]) {
  const pool = new Pool(config.database as PoolConfig);
  return pool.query(query, params);
}

export async function queryDbRest(table: string, query: string) {
  const response = await fetch(
    `https://${config.supabase.host}/rest/v1/${table}?${query}`,
    {
      headers: {
        "apikey": config.supabase.apiKey as string
      }
    }
  );
  return (await response.json()).map((item: any) => item.body);
}
