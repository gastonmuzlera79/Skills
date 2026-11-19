# Skills

Repositorio de skills para Claude. Cada skill es una carpeta dentro de `skills/` con un archivo `SKILL.md` y, si hace falta, scripts o material de referencia.

## Estructura

```
skills/
  <nombre-de-la-skill>/
    SKILL.md        instrucciones y metadatos (obligatorio)
    scripts/        código auxiliar (opcional)
    references/     documentos de apoyo (opcional)
```

`skills/plantilla/` sirve de punto de partida: copiala y renombrala.

## Cómo agregar una skill

1. Copiá `skills/plantilla` a `skills/<nombre>`. El nombre va en minúsculas y con guiones.
2. Completá el encabezado de `SKILL.md`. La `description` es lo que Claude lee para decidir si usa la skill, así que tiene que decir qué hace y cuándo aplicarla.
3. Escribí las instrucciones en el cuerpo del archivo.
4. Hacé commit y push.

## Cómo usarlas

Cada carpeta de `skills/` se puede subir como skill en Claude (Configuración > Capacidades) comprimida en un .zip, o copiarla a `~/.claude/skills/` para usarla en Claude Code.
