#!/bin/sh
cd "$(dirname "$0")"
export PORT="${PORT:-5173}"
exec python3 serve.py
