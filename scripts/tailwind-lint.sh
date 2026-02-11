#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

conflicts_pattern="transition-transform transition-colors|transition-colors transition-transform"

if rg -n "$conflicts_pattern" src >/dev/null; then
  echo "tailwind-lint: found conflicting transition utility combinations:"
  rg -n "$conflicts_pattern" src
  exit 1
fi

canonical_pattern="sm:h-\\[[0-9]+px\\]|sm:w-\\[[0-9]+px\\]|h-\\[[0-9]+px\\]|w-\\[[0-9]+px\\]"
if rg -n "$canonical_pattern" src/components/post-chart-blocks.tsx >/dev/null; then
  echo "tailwind-lint: found pixel-based arbitrary size utilities where canonical spacing is preferred:"
  rg -n "$canonical_pattern" src/components/post-chart-blocks.tsx
  exit 1
fi

echo "tailwind-lint: ok"
