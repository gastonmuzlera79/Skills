#!/bin/sh
# Una familia, en acuarela: un solo comando reconstruye todo (voz -> eventos -> imagen -> mezcla -> película).
# Requiere la librería Lemo-Opuscar (LIB), Node 20+, ffmpeg 7+ y la parte "voice" y "music" de setup.sh deps.
set -e
HERE=$(cd "$(dirname "$0")" && pwd)
LIB=${LIB:-/home/user/lemomo-ai/lemo-opuscar}
export LIB
[ -f "$LIB/core/render/video.mjs" ] || { echo "poné LIB=<carpeta de la librería>"; exit 1; }
cd "$LIB"
[ -f "$HERE/voice/l1.wav" ] || .venv/bin/python core/tts/tts.py "$HERE/lines.json" "$HERE/voice"
[ -f "$HERE/paper.jpg" ] || (cd "$HERE" && "$LIB/.venv/bin/python" paper.py)
[ -d "$HERE/fonts" ] || (cd "$HERE" && node fetch_fonts.mjs)
node core/render/events.mjs "$HERE"
node core/render/video.mjs "$HERE" --fps 24 --workers 3 --out "$HERE/out/video.mp4"
.venv/bin/python "$HERE/mix.py"
sh core/render/mux.sh "$HERE/out/video.mp4" "$HERE/out/mix.wav" "$HERE/familia-acuarela.mp4" 24 1
