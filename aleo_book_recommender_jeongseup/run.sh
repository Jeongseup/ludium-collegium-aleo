#!/bin/bash

APPNAME="aleo_book_recommender_jeongseup"
ENV_FILE=".env"
PRIVATE_KEY=$(grep "PRIVATE_KEY" $ENV_FILE | cut -d '=' -f2)

snarkos developer execute "${APPNAME}.aleo" main 32571i32 32767i32 32767i32 0i32 0i32 0i32 0i32 \
    --private-key "${PRIVATE_KEY}" \
    --query "https://api.explorer.aleo.org/v1" \
    --priority-fee 3000000 \
    --broadcast "https://api.explorer.aleo.org/v1/testnet3/transaction/broadcast" 

# https://explorer.hamp.app/transaction?id=at13vaqx5vuqssmyj3hupm6usdryzdzz9ntvu4jcfc0jzldfswh85xsze29mk    