"use client";

import { useEffect, useMemo, useState } from "react";

type RSVPRow = {
  id: string;
  name: string;
  attendance: boolean;
  created_at: string;
  updated_at: string;
};

type RSVPResponse = {
  rows: RSVPRow[];
  summary: {
    total: number;
    attending: number;
    notAttending: number;
  };
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [data, setData] = useState<RSVPResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedPassword = window.sessionStorage.getItem(
      "proyecto-mariposa-admin-password"
    );

    if (savedPassword) {
      setPassword(savedPassword);
      void loadData(savedPassword);
    }
  }, []);

  async function loadData(passwordToUse = password) {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/rsvp", {
        headers: {
          "x-admin-password": passwordToUse,
        },
        cache: "no-store",
      });

      const payload = (await response.json()) as RSVPResponse & {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(payload.error || "No se pudo abrir el panel.");
      }

      window.sessionStorage.setItem(
        "proyecto-mariposa-admin-password",
        passwordToUse
      );

      setAuthenticated(true);
      setData(payload);
    } catch (error) {
      setAuthenticated(false);
      setData(null);
      setError(
        error instanceof Error ? error.message : "No se pudo abrir el panel."
      );
    } finally {
      setLoading(false);
    }
  }

  async function exportCsv() {
    setError("");

    try {
      const response = await fetch("/api/rsvp/export", {
        headers: {
          "x-admin-password": password,
        },
      });

      if (!response.ok) {
        const payload = (await response.json()) as { error?: string };
        throw new Error(payload.error || "No se pudo exportar.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "confirmaciones-proyecto-mariposa.csv";
      link.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "No se pudo exportar."
      );
    }
  }

  const rows = useMemo(() => data?.rows || [], [data]);

  if (!authenticated) {
    return (
      <main className="min-h-screen px-4 py-10">
        <section className="panel mx-auto max-w-[460px]">
          <p className="kicker">Panel de administración</p>
          <h1 className="mt-3 font-serif text-4xl text-[#553D42]">
            Confirmaciones
          </h1>

          <form
            className="mt-6 text-left"
            onSubmit={(event) => {
              event.preventDefault();
              void loadData();
            }}
          >
            <label className="mb-2 block font-medium" htmlFor="admin-password">
              Contraseña
            </label>

            <input
              id="admin-password"
              type="password"
              className="min-h-[52px] w-full rounded-[18px] border border-[rgba(200,168,78,.30)] bg-white/80 px-4 py-3 outline-none"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            {error && (
              <p className="mt-3 text-sm text-red-700" role="alert">
                {error}
              </p>
            )}

            <button
              className="primary-button mt-5 w-full"
              type="submit"
              disabled={loading}
            >
              {loading ? "Ingresando..." : "Entrar"}
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-8">
      <section className="mx-auto w-full max-w-[900px]">
        <div className="panel text-left">
          <p className="kicker">Panel de administración</p>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="font-serif text-4xl font-semibold text-[#553D42]">
                Confirmaciones
              </h1>
              <p className="mt-2 text-muted">Jessica &amp; Claudia</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                className="secondary-button"
                type="button"
                onClick={() => void loadData()}
                disabled={loading}
              >
                Actualizar
              </button>

              <button
                className="primary-button"
                type="button"
                onClick={() => void exportCsv()}
              >
                Descargar CSV
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <Stat label="Sí asistirán" value={data?.summary.attending || 0} />
          <Stat
            label="No asistirán"
            value={data?.summary.notAttending || 0}
          />
          <Stat label="Total registros" value={data?.summary.total || 0} />
        </div>

        <div className="panel mt-4 overflow-hidden text-left">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] border-collapse text-sm">
              <thead className="bg-white/70">
                <tr>
                  <th className="px-4 py-3 text-left">Nombre</th>
                  <th className="px-4 py-3 text-left">Respuesta</th>
                  <th className="px-4 py-3 text-left">Registro</th>
                  <th className="px-4 py-3 text-left">Actualización</th>
                </tr>
              </thead>

              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-t border-[rgba(200,168,78,.14)]"
                  >
                    <td className="px-4 py-3 font-medium">{row.name}</td>
                    <td className="px-4 py-3">
                      {row.attendance ? "Sí asistirá" : "No asistirá"}
                    </td>
                    <td className="px-4 py-3 text-muted">
                      {new Date(row.created_at).toLocaleString("es-MX")}
                    </td>
                    <td className="px-4 py-3 text-muted">
                      {new Date(row.updated_at).toLocaleString("es-MX")}
                    </td>
                  </tr>
                ))}

                {rows.length === 0 && (
                  <tr>
                    <td className="px-4 py-8 text-center text-muted" colSpan={4}>
                      Todavía no hay confirmaciones.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {error && (
            <p className="mt-4 text-sm text-red-700" role="alert">
              {error}
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[28px] border border-[rgba(200,168,78,.18)] bg-white/70 p-5 text-center shadow-soft">
      <p className="kicker">{label}</p>
      <p className="mt-2 font-serif text-4xl font-semibold text-[#8b6d20]">
        {value}
      </p>
    </div>
  );
}
