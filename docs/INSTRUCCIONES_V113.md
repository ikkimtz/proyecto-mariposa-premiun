# Parche v1.1.3 — Carta solo al abrir

Este parche corrige de forma definitiva que la carta aparezca fuera del sobre.

## Reemplaza solo este archivo

```text
components/Opening/PremiumEnvelope.tsx
```

## Qué cambia

- La carta ya no se renderiza cuando el sobre está cerrado.
- La carta aparece únicamente después de pulsar “Abrir invitación”.
- Si después de este cambio la carta se sigue viendo en reposo, significa que GitHub/Vercel no está usando este archivo o que existe otra copia del componente.
