import {
  Transaction,
  Transition,
  WalletAdapterNetwork,
} from '@demox-labs/aleo-wallet-adapter-base';
import { useWallet } from '@demox-labs/aleo-wallet-adapter-react';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

export const CheckMapping = ({ program_name }: { program_name: string }) => {
  const { requestTransaction, publicKey } = useWallet();
  const [amount, setAmount] = useState<number>(0);
  const [toAddr, setToAddr] = useState<string>('');

  const handleTransfer = async () => {
    const transfer_public_transition = new Transition(
      program_name,
      'transfer_public',
      [toAddr, amount.toString() + 'u64']
    );

    const transfer_public_tx = new Transaction(
      publicKey!,
      WalletAdapterNetwork.Testnet,
      [transfer_public_transition],
      1000000,
      false
    );

    console.log('transfer_public_tx:', transfer_public_tx);

    if (requestTransaction) {
      const res = await requestTransaction(transfer_public_tx);
      setAmount(0);
      setToAddr('');

      console.log('check: ', res);
    }
  };

  return (
    <div>
      <h3>Check Mapping</h3>
      <a href="https://explorer.hamp.app/program?id=store_3lzgy5.aleo#read">
        CHECK MAPPING
      </a>
    </div>
  );
};
