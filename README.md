# Ajuste v2.0.5 — Sello con contenedor fijo

Reemplaza estos archivos:

```text
components/Opening/PremiumEnvelope.tsx
PremiumEnvelope.tsx
```

Cambio:
- El sello ahora tiene un contenedor externo fijo centrado.
- Framer Motion ya no puede sobrescribir el centrado.
- Se incluye también `PremiumEnvelope.tsx` en raíz por si el proyecto estaba usando esa copia.
