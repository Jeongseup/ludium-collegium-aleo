import { Transaction, Transition, WalletAdapterNetwork } from "@demox-labs/aleo-wallet-adapter-base";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

export const BuyItem = ({program_name}:{program_name: string}) => {
  const { requestTransaction, publicKey } = useWallet();
  const [record, setRecord] = useState<string>("");
  const [itemID, setItemID] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [billAmount, setBillAmount] = useState<number>(0);

  const handleTransferPrivate = async () => {

    // toast.success(record);

    // const _record = record.replace(/\s+/g, '').trim()

    // console.log("record:",_record)

    // try {
    //   const inputs = [JSON.parse(_record), toAddr, amount];

    //   console.log(inputs)

    //   const test_tx = Transaction.createTransaction(
    //     publicKey!,
    //     WalletAdapterNetwork.Testnet,
    //     program_name,
    //     'buy',
    //     inputs,
    //     1000000,
    //   )

    //   if (requestTransaction) {
    //     console.log(1111111);
    //     const result = await requestTransaction(test_tx);

    //     console.log(2222222);

    //     setAmount(0);
    //     setToAddr("");
    //     console.log("check:", result);
    //   }
    // } catch (error:any) {

    //   toast.error(error.toString());
    //   // You might want to display an error toast message or take some action here
    // }
  };

  return (
    <div>
      <h3>Buy Item</h3>
      <Form.Group>
        <Form.Label>Token:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Record string"
          onChange={(e) => setRecord(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Item ID:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Item ID"
          onChange={(e) => setItemID(Number(e.target.value))}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Quantity:</Form.Label>
        <Form.Control
          type="number"
          placeholder="Item Quantity"
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Bill Amount:</Form.Label>
        <Form.Control
          type="number"
          placeholder="Bill Amount to spend token"
          onChange={(e) => setBillAmount(Number(e.target.value))}
        />
      </Form.Group>
      <Button onClick={handleTransferPrivate}>✨ Buy Item</Button>
    </div>
  );
};
