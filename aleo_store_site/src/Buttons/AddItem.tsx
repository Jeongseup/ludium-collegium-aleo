import { Transaction, Transition, WalletAdapterNetwork } from "@demox-labs/aleo-wallet-adapter-base";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export const AddItem = ({program_name}:{program_name: string}) => {
  const { requestTransaction, publicKey } = useWallet();
  const [receiverAddress, setReceiverAddress] = useState<string>("");
  const [itemID, setItemID] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  const handleAddItem = async () => {
    const add_item_transition= new Transition(
      program_name,
      "add_item",
      [itemID.toString() + "u8", quantity.toString() + "u64", price.toString() + "u64"]
    );

    const add_item_tx = new Transaction(
      publicKey!,
      WalletAdapterNetwork.Testnet,
      [add_item_transition],
      1000000, // set your desired fee
      false
    );

    console.log("add_item_tx:", add_item_tx);

    if (requestTransaction) {
      try {
        const res = await requestTransaction(add_item_tx);
        setReceiverAddress("");
        setItemID(0);
        setQuantity(0);
        setPrice(0);
        console.log("Transaction submitted:", res);
      } catch (error) {
        console.error("Error submitting transaction:", error);
      }
    }
  };

  return (
    <div>
      <h3>Add Item</h3>
      <Form.Group>
        <Form.Label>Item ID:</Form.Label>
        <Form.Control
          type="number"
          placeholder="number"
          onChange={(e) => setItemID(Number(e.target.value))}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Quantity:</Form.Label>
        <Form.Control
          type="number"
          placeholder="number"
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Price:</Form.Label>
        <Form.Control
          type="number"
          placeholder="number"
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </Form.Group>
      <Button onClick={handleAddItem}>✨ Add Item</Button>
    </div>
  );
};