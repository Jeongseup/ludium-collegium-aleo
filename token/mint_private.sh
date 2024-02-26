#!/bin/bash

args=("$@")

# setup envs
source .env

APP_NAME=$(jq -r .program program.json)
echo "app_name: ${APP_NAME}" 

QUERY_URL="https://explorer.hamp.app"
# BROADCAST_URL="${QUERY_URL}/testnet3/transaction/broadcast"
# QUERY_URL="https://api.explorer.aleo.org/v1"
BROADCAST_URL="https://api.explorer.aleo.org/v1/testnet3/transaction/broadcast"


snarkos developer execute \
    --private-key "${PRIVATE_KEY}" \
    --priority-fee 3000000 \
    --broadcast "${BROADCAST_URL}" \
    --query "${QUERY_URL}" \
    "token_3lzgy5.aleo" "mint_private" "aleo1jxpthhnm4yv5kly69a80cd0gxzmfr9zyj5ktpwy6c3wfhxm6q58q3lzgy5" "100u64"
