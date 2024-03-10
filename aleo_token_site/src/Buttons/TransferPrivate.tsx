import {
  Transaction,
  Transition,
  WalletAdapterNetwork,
} from '@demox-labs/aleo-wallet-adapter-base';
import { useWallet } from '@demox-labs/aleo-wallet-adapter-react';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

export const TransferPrivate = () => {
  const { requestTransaction, publicKey } = useWallet();
  const [amount, setAmount] = useState<number>(0);
  const [record, setRecord] = useState<string>('');
  const [toAddr, setToAddr] = useState<string>('');

  const handleTransferPrivate = async () => {
    toast.success(record);

    const _record = record.replace(/\s+/g, '').trim();

    // const res_1 = record;
    console.log('record:', _record);

    try {
      const inputs = [JSON.parse(_record), toAddr, amount];

      console.log(inputs);

      const test_tx = Transaction.createTransaction(
        publicKey!,
        WalletAdapterNetwork.Testnet,
        'token_3lzgy5.aleo',
        'transfer_private',
        inputs,
        1000000
      );

      if (requestTransaction) {
        console.log(1111111);
        const result = await requestTransaction(test_tx);

        console.log(2222222);

        setAmount(0);
        setToAddr('');
        console.log('check:', result);
      }
    } catch (error: any) {
      toast.error(error.toString());
      // You might want to display an error toast message or take some action here
    }
  };

  return (
    <div>
      <h3>Transfer_Private</h3>
      <Form.Group>
        <Form.Label>Record:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Record string"
          onChange={(e) => setRecord(e.target.value)}
        />
      </Form.Group>
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
      <Button onClick={handleTransferPrivate}>
        ✨ Get Records and Transfer Aleo Credits Privately
      </Button>
    </div>
  );
};
