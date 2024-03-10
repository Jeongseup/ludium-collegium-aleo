#!/bin/bash
args=("$@")

# setup envs
source .env
APP_NAME=$(jq -r .program program.json)

FUNCTION_NAME=$1

echo "app_name: ${APP_NAME}" 
echo "app_name: ${FUNCTION_NAME}" 


snarkos developer execute "${APPNAAPP_NAMEE}.aleo" $FUNCTION_NAME "${ALEO_ADDRESS}" 100u64 \
  --private-key "${PRIVATE_KEY}" \
  --query "https://api.explorer.aleo.org/v1" \
  --priority-fee 1000000 \
  --broadcast "https://api.explorer.aleo.org/v1/testnet3/transaction/broadcast"