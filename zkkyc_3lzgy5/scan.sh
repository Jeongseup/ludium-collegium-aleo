#!/bin/bash
args=("$@")

# setup envs
source .env

snarkos developer scan \
    --private-key "$PRIVATE_KEY" \
    --last 10000 \
    --endpoint "https://api.explorer.aleo.org/v1"
