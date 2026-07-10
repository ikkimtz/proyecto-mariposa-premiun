"use client";

import { FormEvent, useState } from "react";

type RSVP = {
  options: string[];
  successTitle: string;
  successMessage: string;
  successFooter: string;
};

type SubmitState = "idle" | "loading" | "success" | "error";

export function RSVPForm({ rsvp }: { rsvp: RSVP }) {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<boolean | null>(null);
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || attendance === null) {
      setState("error");
      setMessage("Escribe tu nombre y selecciona una respuesta.");
      return;
    }

    setState("loading");
    setMessage("");

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          attendance,
        }),
      });

      const data = (await response.json()) as {
        error?: string;
        message?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || "No se pudo guardar la confirmación.");
      }

      setState("success");
      setMessage(data.message || "Confirmación registrada.");
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "No se pudo guardar la confirmación."
      );
    }
  }

  if (state === "success") {
    return (
      <section className="panel">
        <div className="py-6 text-center">
          <div className="mx-auto mb-5 grid h-[74px] w-[74px] place-items-center rounded-full bg-gradient-to-br from-coral to-[#b64b50] font-serif font-bold text-white shadow-[0_14px_24px_rgba(99,45,52,.22)]">
            J&amp;C
          </div>

          <h3 className="font-serif text-3xl text-[#553D42]">
            {rsvp.successTitle}
          </h3>

          <p className="mx-auto mt-3 max-w-[340px] text-muted">
            {rsvp.successMessage}
          </p>

          <p className="mt-3 font-serif text-xl text-[#8b6d20]">
            {rsvp.successFooter} 🦋
          </p>

          <p className="mt-4 text-sm text-muted">{message}</p>

          <button
            className="secondary-button mt-6"
            type="button"
            onClick={() => {
              setState("idle");
              setMessage("");
            }}
          >
            Modificar respuesta
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="panel">
      <p className="kicker">Confirma tu asistencia</p>

      <form className="mt-5 text-left" onSubmit={handleSubmit}>
        <label className="mb-2 block font-medium" htmlFor="rsvp-name">
          Nombre
        </label>

        <input
          className="min-h-[52px] w-full rounded-[18px] border border-[rgba(200,168,78,.30)] bg-[rgba(255,255,255,.82)] px-4 py-3 outline-none focus:border-coral focus:ring-4 focus:ring-coral/10"
          id="rsvp-name"
          name="name"
          type="text"
          placeholder="Escribe tu nombre"
          autoComplete="name"
          maxLength={120}
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />

        <fieldset className="mt-5 border-0 p-0">
          <legend className="mb-2 font-medium">¿Nos acompañarás?</legend>

          <label className="my-3 flex min-h-[52px] cursor-pointer items-center gap-3 rounded-[18px] border border-[rgba(200,168,78,.20)] bg-white/60 p-4">
            <input
              type="radio"
              name="attendance"
              checked={attendance === true}
              onChange={() => setAttendance(true)}
              required
            />
            <span>{rsvp.options[0] || "Sí asistiré"}</span>
          </label>

          <label className="my-3 flex min-h-[52px] cursor-pointer items-center gap-3 rounded-[18px] border border-[rgba(200,168,78,.20)] bg-white/60 p-4">
            <input
              type="radio"
              name="attendance"
              checked={attendance === false}
              onChange={() => setAttendance(false)}
              required
            />
            <span>{rsvp.options[1] || "No podré asistir"}</span>
          </label>
        </fieldset>

        {state === "error" && (
          <p className="mt-3 text-sm text-red-700" role="alert">
            {message}
          </p>
        )}

        <button
          className="primary-button mt-4 w-full disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
          disabled={state === "loading"}
        >
          {state === "loading" ? "Guardando..." : "Confirmar"}
        </button>
      </form>
    </section>
  );
}
