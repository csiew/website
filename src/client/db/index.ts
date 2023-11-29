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
  const resultStr = await response.text();
  console.debug(resultStr);
  let result;
  try {
    result = await response.json();
  } catch (err) {
    console.error(err);
    result = JSON.parse(resultStr);
  }
  return result.map((r: any) => r.body);
}
