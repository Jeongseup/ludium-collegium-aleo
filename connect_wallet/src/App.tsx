import { useMemo, useState } from 'react';
import { WalletProvider } from '@demox-labs/aleo-wallet-adapter-react';
import {
  WalletModalProvider,
  WalletMultiButton,
} from '@demox-labs/aleo-wallet-adapter-reactui';
import { LeoWalletAdapter } from '@demox-labs/aleo-wallet-adapter-leo';
import {
  DecryptPermission,
  WalletAdapterNetwork,
} from '@demox-labs/aleo-wallet-adapter-base';
import './App.css';
import { Button, Form } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Default styles that can be overridden by your app
require('@demox-labs/aleo-wallet-adapter-reactui/styles.css');

export const App = () => {
  const wallets = useMemo(
    () => [
      new LeoWalletAdapter({
        appName: 'Leo Demo App',
      }),
    ],
    []
  );

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="flex-column rounded border-2 p-4 bg-light shadow">
        <h1 className="text-center">Hello, Aleo!</h1>

        <WalletProvider
          wallets={wallets}
          decryptPermission={DecryptPermission.UponRequest}
          network={WalletAdapterNetwork.Testnet}
          autoConnect={true}
        >
          <WalletModalProvider>
            <WalletMultiButton />
            <WalletToolBox />
          </WalletModalProvider>
        </WalletProvider>
      </div>
    </div>
  );
};

const WalletToolBox = () => {
  const [programId, setProgramId] = useState<string>('');
  const [hyperlink, setHyperlink] = useState<string | null>(null);

  const handleGenerateHyperlink = () => {
    if (programId && programId.endsWith('.aleo')) {
      const explorerLink = `https://explorer.hamp.app/program?id=${programId}`;
      toast.success('Hyperlink has been generated.');
      setHyperlink(explorerLink);
    } else {
      // Display an error toast message
      toast.error(
        "Invalid program ID. Please enter a valid program ID ending with '.aleo'."
      );
      setHyperlink(null);
    }
  };

  return (
    <div className="mt-2 flex-column rounded border-2 p-4 bg-light shadow">
      <Form.Group>
        <Form.Label>Program ID:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter program ID (e.g., program_name.aleo)"
          onChange={(e) => setProgramId(e.target.value)}
        />
      </Form.Group>
      <Button className="mt-3" onClick={handleGenerateHyperlink}>
        Click to generate Hyperlink
      </Button>

      {hyperlink && (
        <div className="mt-2">
          <p>Generated Hyperlink:</p>
          <a href={hyperlink} target="_blank" rel="noopener noreferrer">
            🔗
          </a>
          &nbsp; Link
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default App;
