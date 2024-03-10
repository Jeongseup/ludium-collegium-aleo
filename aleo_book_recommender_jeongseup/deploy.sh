#!/bin/bash 

APPNAME="aleo_book_recommender_jeongseup"
ENV_FILE=".env"
PRIVATE_KEY=$(grep "PRIVATE_KEY" $ENV_FILE | cut -d '=' -f2)

snarkos developer deploy "${APPNAME}.aleo" \
  --path "./build/" \
  --private-key "${PRIVATE_KEY}" \
  --query "https://api.explorer.aleo.org/v1" \
  --priority-fee 3000000 \
  --broadcast "https://api.explorer.aleo.org/v1/testnet3/transaction/broadcast" 

# https://explorer.hamp.app/transaction?id=at1lw6yflknqd87l90r9rwsschxmq4ckly8p9p7fcke2xj86zrkt5zqd2ntm6
