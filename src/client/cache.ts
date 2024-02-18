const EXPIRY_DURATION_MS = 1 * 24 * 60 * 60 * 1000;   // 1 day

export function hasCacheExpired(et: number, rc?: number) {
  if (rc && rc > 3) return true;
  return (Math.abs(et - Date.now()) > EXPIRY_DURATION_MS);
}

function generateNewExpiryDate() {
  return Date.now() + EXPIRY_DURATION_MS;
}

export function getCache(k: string) {
  const v = localStorage.getItem(k);
  if (!v) throw new Error(`Cached key not available: ${k}`);
  const parsedValue = JSON.parse(v);
  if (!Object.keys(parsedValue).includes("readCount")) {
    parsedValue.readCount = 0;
  }
  parsedValue.readCount = parsedValue.readCount + 1;
  localStorage.setItem(k, JSON.stringify(parsedValue));
  return parsedValue;
}

export function storeCache(k: string, v: any) {
  localStorage.setItem(k, JSON.stringify({ body: v, expiresAt: generateNewExpiryDate() }));
}

export function removeCache(k: string) {
  localStorage.removeItem(k);
}
