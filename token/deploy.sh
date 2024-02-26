#!/bin/bash
args=("$@")

# setup envs
source .env
APP_NAME=$(jq -r .program program.json)
QUERY_URL="https://api.explorer.aleo.org/v1"
BROADCAST_URL="${QUERY_URL}/testnet3/transaction/broadcast"


echo "app_name: ${APP_NAME}" 
# echo "your record: ${RECORD}"

snarkos developer deploy token_3lzgy5.aleo \
  --path "./build/" \
  --private-key "${PRIVATE_KEY}" \
  --query "${QUERY_URL}" \
  --priority-fee 3000000 \
  --broadcast "${BROADCAST_URL}" 