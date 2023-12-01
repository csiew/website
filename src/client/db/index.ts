import config from "../../config";

export async function queryDbRest(table: string, query: string) {
  const response = await fetch(
    `https://${config.supabase.host}/rest/v1/${table}?${query}`,
    {
      headers: {
        "apikey": config.supabase.apiKey as string
      }
    }
  );
  const result = await response.json();
  return result.map((r: any) => r.body);
}
