# Parche v1.1.2 — Ocultar carta en reposo

Este parche corrige de forma estricta que la carta se vea fuera del sobre.

## Reemplaza solo este archivo

```text
components/Opening/PremiumEnvelope.tsx
```

## Qué cambia

- La carta tiene `opacity: 0` cuando el sobre está cerrado.
- La carta aparece solo cuando inicia la animación.
- Se añadió una segunda capa del sobre como máscara visual encima de la carta.
- No necesitas volver a subir `public/assets`.
