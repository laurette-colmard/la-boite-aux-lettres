#!/usr/bin/env bash
set -euo pipefail

if [ -z "${GIT_CRYPT_KEY:-}" ]; then
  echo "GIT_CRYPT_KEY not set, skipping decryption (local dev)"
  exit 0
fi

# Decode key and unlock
echo "$GIT_CRYPT_KEY" | base64 -d > /tmp/git-crypt-key.bin
git-crypt unlock /tmp/git-crypt-key.bin
rm /tmp/git-crypt-key.bin

echo "Fonts decrypted successfully"
