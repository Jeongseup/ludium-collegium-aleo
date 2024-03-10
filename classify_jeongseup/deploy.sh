#!/bin/bash
args=("$@")

# setup envs
source .env
APP_NAME=$(jq -r .program program.json)

echo "app_name: ${APP_NAME}" 

snarkos developer deploy "${APP_NAME}" \
  --path "./build/" \
  --private-key "${PRIVATE_KEY}" \
  --query "https://api.explorer.aleo.org/v1" \
  --priority-fee 3000000 \
  --broadcast "https://api.explorer.aleo.org/v1/testnet3/transaction/broadcast"