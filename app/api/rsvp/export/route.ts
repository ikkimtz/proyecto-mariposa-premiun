import { NextRequest, NextResponse } from "next/server";
import {
  buildSupabaseRestUrl,
  supabaseHeaders,
} from "@/lib/supabase-rest";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function escapeCsv(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
}

export async function GET(request: NextRequest) {
  const configuredPassword = process.env.ADMIN_PASSWORD?.trim();
  const receivedPassword = request.headers.get("x-admin-password")?.trim();

  if (
    !configuredPassword ||
    !receivedPassword ||
    configuredPassword !== receivedPassword
  ) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  try {
    const response = await fetch(
      buildSupabaseRestUrl("rsvp", {
        select: "name,attendance,created_at,updated_at",
        order: "created_at.asc",
      }),
      {
        headers: supabaseHeaders(),
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const rows = (await response.json()) as Array<{
      name: string;
      attendance: boolean;
      created_at: string;
      updated_at: string;
    }>;

    const lines = [
      ["Nombre", "Respuesta", "Fecha de registro", "Última actualización"]
        .map(escapeCsv)
        .join(","),
      ...rows.map((row) =>
        [
          row.name,
          row.attendance ? "Sí asistirá" : "No asistirá",
          new Date(row.created_at).toLocaleString("es-MX"),
          new Date(row.updated_at).toLocaleString("es-MX"),
        ]
          .map(escapeCsv)
          .join(",")
      ),
    ];

    return new NextResponse("\uFEFF" + lines.join("\n"), {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition":
          'attachment; filename="confirmaciones-proyecto-mariposa.csv"',
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("RSVP export error:", error);

    return NextResponse.json(
      { error: "No se pudo exportar el registro." },
      { status: 500 }
    );
  }
}
