import { NextRequest, NextResponse } from "next/server";
import {
  buildSupabaseRestUrl,
  normalizeName,
  supabaseHeaders,
} from "@/lib/supabase-rest";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RSVPBody = {
  name?: unknown;
  attendance?: unknown;
};

function isAdmin(request: NextRequest) {
  const configuredPassword = process.env.ADMIN_PASSWORD?.trim();
  const receivedPassword = request.headers.get("x-admin-password")?.trim();

  return Boolean(
    configuredPassword &&
      receivedPassword &&
      receivedPassword === configuredPassword
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RSVPBody;
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const attendance = body.attendance;

    if (name.length < 2 || name.length > 120) {
      return NextResponse.json(
        { error: "Escribe un nombre válido." },
        { status: 400 }
      );
    }

    if (typeof attendance !== "boolean") {
      return NextResponse.json(
        { error: "Selecciona si asistirás o no." },
        { status: 400 }
      );
    }

    const normalizedName = normalizeName(name);

    const existingResponse = await fetch(
      buildSupabaseRestUrl("rsvp", {
        normalized_name: `eq.${normalizedName}`,
        select: "id",
      }),
      {
        headers: supabaseHeaders(),
        cache: "no-store",
      }
    );

    if (!existingResponse.ok) {
      throw new Error(await existingResponse.text());
    }

    const existing = (await existingResponse.json()) as Array<{ id: string }>;

    if (existing.length > 0) {
      const updateResponse = await fetch(
        buildSupabaseRestUrl("rsvp", {
          id: `eq.${existing[0].id}`,
        }),
        {
          method: "PATCH",
          headers: supabaseHeaders({ Prefer: "return=representation" }),
          body: JSON.stringify({
            name,
            attendance,
            updated_at: new Date().toISOString(),
          }),
          cache: "no-store",
        }
      );

      if (!updateResponse.ok) {
        throw new Error(await updateResponse.text());
      }

      return NextResponse.json({
        ok: true,
        updated: true,
        message: "Tu confirmación fue actualizada.",
      });
    }

    const insertResponse = await fetch(buildSupabaseRestUrl("rsvp"), {
      method: "POST",
      headers: supabaseHeaders({ Prefer: "return=representation" }),
      body: JSON.stringify({
        name,
        normalized_name: normalizedName,
        attendance,
      }),
      cache: "no-store",
    });

    if (!insertResponse.ok) {
      throw new Error(await insertResponse.text());
    }

    return NextResponse.json({
      ok: true,
      updated: false,
      message: "Confirmación registrada.",
    });
  } catch (error) {
    console.error("RSVP POST error:", error);

    return NextResponse.json(
      { error: "No pudimos guardar la confirmación. Intenta nuevamente." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  try {
    const response = await fetch(
      buildSupabaseRestUrl("rsvp", {
        select: "id,name,attendance,created_at,updated_at",
        order: "created_at.desc",
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
      id: string;
      name: string;
      attendance: boolean;
      created_at: string;
      updated_at: string;
    }>;

    const attending = rows.filter((row) => row.attendance).length;

    return NextResponse.json({
      rows,
      summary: {
        total: rows.length,
        attending,
        notAttending: rows.length - attending,
      },
    });
  } catch (error) {
    console.error("RSVP GET error:", error);

    return NextResponse.json(
      { error: "No se pudo cargar el registro." },
      { status: 500 }
    );
  }
}
