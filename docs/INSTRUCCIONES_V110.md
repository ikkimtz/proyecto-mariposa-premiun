# Premium Assets v1.1.0 — Instrucciones

## Reemplaza/sube estas carpetas y archivos

1. Reemplaza:

```text
components/Opening/PremiumEnvelope.tsx
```

2. Reemplaza o sube esta carpeta completa:

```text
public/assets/
```

3. Opcional, si quieres asegurar compatibilidad:

```text
components/Opening/OpeningExperience.tsx
```

## Qué cambia

- La portada usa assets separados reales:
  - sobre base
  - solapa
  - carta
  - sello
  - flores
  - mariposas
  - destellos
- Ya no depende de un solo SVG dibujado dentro del componente.
- La carta inicia integrada visualmente con el sobre.
- El diseño debería diferenciarse más claramente de las versiones preliminares.

## Después de subir

Haz commit en GitHub y espera el deploy de Vercel.
