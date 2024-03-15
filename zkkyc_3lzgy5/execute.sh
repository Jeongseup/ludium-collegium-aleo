#!/bin/bash
args=("$@")

# setup envs
source .env
APP_NAME=$(jq -r .program program.json)

echo "app_name: ${APP_NAME}" 
# echo "your record: ${RECORD}"

snarkos developer execute "${APP_NAME}" main 0u32 1u32 0u32 100u32 5u32 \
  --private-key "${PRIVATE_KEY}" \
  --query "https://api.explorer.aleo.org/v1" \
  --priority-fee 3000000 \
  --broadcast "https://api.explorer.aleo.org/v1/testnet3/transaction/broadcast" 