const rawSupabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function normalizeSupabaseUrl(value: string) {
  return value
    .trim()
    .replace(/\/rest\/v1\/?$/i, "")
    .replace(/\/+$/, "");
}

export function assertSupabaseConfig() {
  if (!rawSupabaseUrl || !serviceRoleKey) {
    throw new Error("Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  }

  const supabaseUrl = normalizeSupabaseUrl(rawSupabaseUrl);

  if (!/^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(supabaseUrl)) {
    throw new Error(
      "SUPABASE_URL no es válida. Debe tener el formato https://ID.supabase.co"
    );
  }

  return { supabaseUrl, serviceRoleKey };
}

export function supabaseHeaders(extra?: HeadersInit): HeadersInit {
  const { serviceRoleKey } = assertSupabaseConfig();

  return {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

export function normalizeName(name: string) {
  return name.trim().replace(/\s+/g, " ").toLocaleLowerCase("es-MX");
}

export function buildSupabaseRestUrl(
  table: string,
  params?: Record<string, string>
) {
  const { supabaseUrl } = assertSupabaseConfig();
  const url = new URL(`/rest/v1/${table}`, supabaseUrl);

  for (const [key, value] of Object.entries(params ?? {})) {
    url.searchParams.set(key, value);
  }

  return url.toString();
}
