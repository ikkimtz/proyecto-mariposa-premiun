# Manual de usuario — Proyecto Mariposa Premium Edition v1.0

## Qué incluye
- Sobre interactivo premium.
- Cuenta regresiva.
- Detalles del evento.
- Google Maps.
- RSVP simple.
- Pantalla final de agradecimiento.
- Panel inicial `/admin`.

## Cambiar información del evento
Edita `data/event.json`.

### Nombres
```json
"honorees": ["Jessica", "Claudia"]
```

### Fecha
```json
"date": "2026-08-22"
```

### Hora
```json
"time": "17:30"
```

### Lugar
```json
"name": "Salón Paraíso Fiesta"
```

### Dirección
```json
"address": "Nueva dirección"
```

### Google Maps
```json
"mapsUrl": "https://maps.app.goo.gl/..."
```

## Publicar cambios
1. Edita archivos en GitHub.
2. Haz commit.
3. Vercel redeploya automáticamente.

## Solución de problemas
- Si no ves cambios, abre en incógnito.
- Si Vercel falla, revisa que `package.json` esté en la raíz.
- No subas una carpeta dentro de otra carpeta.
