PRIVATEKEY=$1
APPNAME="simple_arc721"

cd .. && snarkos developer execute "${APPNAME}.aleo" "create_collection" "aleo1un2ns2xfja44dqnk6mnttkgsv5s0rtnqp8vyrwfd3wdfh7qm959s7mgrpv" 0u128 --private-key "${PRIVATEKEY}" --query "https://api.explorer.aleo.org/v1" --broadcast "https://api.explorer.aleo.org/v1/testnet3/transaction/broadcast" --priority-fee 1000000
