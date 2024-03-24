ADDRESS=$1
PRIVATEKEY=$2
APPNAME="private_aleo"


cd .. && snarkos developer execute "${APPNAME}.aleo" "issue" "${ADDRESS}"  100u64 --private-key "${PRIVATEKEY}" --query "https://api.explorer.aleo.org/v1" --broadcast "https://api.explorer.aleo.org/v1/testnet3/transaction/broadcast" --priority-fee 1000000  
