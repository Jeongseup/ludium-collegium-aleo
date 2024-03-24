PRIVATEKEY=$1
ADDRESS=$2
APPNAME="private_aleo"

RECORD="{
  owner: ${ADDRESS}.private,
  amount: 1001461u64.private,
  _nonce: 4513204524124196877350358100870981907805409842113116750172457858941724687873group.public
}"

cd .. && snarkos developer execute "${APPNAME}.aleo" "deposit" "${RECORD}"  30u64 --private-key "${PRIVATEKEY}" --query "https://api.explorer.aleo.org/v1" --broadcast "https://api.explorer.aleo.org/v1/testnet3/transaction/broadcast" --priority-fee 1000000  
