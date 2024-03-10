import {
  Transaction,
  Transition,
  WalletAdapterNetwork,
} from '@demox-labs/aleo-wallet-adapter-base';
import { useWallet } from '@demox-labs/aleo-wallet-adapter-react';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

export const TransferPublic = () => {
  const { requestTransaction, publicKey } = useWallet();
  const [amount, setAmount] = useState<number>(0);
  const [toAddr, setToAddr] = useState<string>('');

  const handleTransfer = async () => {
    const transfer_public_transition = new Transition(
      'token_3lzgy5.aleo',
      'transfer_public',
      [toAddr, amount.toString() + 'u64']
    );

    const transfer_public_tx = new Transaction(
      publicKey!,
      WalletAdapterNetwork.Testnet,
      // 트랜잭션안에 트랜지션을 넣음.
      // 여러개를 넣을 수도 있음. [trs, trs.. ]
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
      <h3>Transfer_Public</h3>
      <Form.Group>
        <Form.Label>Receiver Address:</Form.Label>
        <Form.Control
          type="text"
          placeholder="aleo public key"
          onChange={(e) => setToAddr(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Amount:</Form.Label>
        <Form.Control
          type="number"
          placeholder="token amount"
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </Form.Group>
      <Button onClick={handleTransfer}>✨ Transfer Aleo Credits</Button>
    </div>
  );
};
