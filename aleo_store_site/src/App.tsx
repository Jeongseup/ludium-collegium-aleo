import React, { useMemo, useState } from 'react';
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
import { Button } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CheckMapping } from './Buttons/CheckMapping';
import { BuyItem } from './Buttons/BuyItem';
import { AddItem } from './Buttons/AddItem';
import { MintToken } from './Buttons/MintToken';

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
        <h1 className="text-center">store_3lzgy5.aleo</h1>

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

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
        />
      </div>
    </div>
  );
};

const WalletToolBox = () => {
  const [selectedTransition, setSelectedTransition] = useState<string | null>(
    'mint_public'
  );

  const handleTransitionSelection = (transition: string) => {
    setSelectedTransition(transition);
  };

  return (
    <div className="mt-2 flex-column rounded border-2 p-4 bg-light shadow">
      <Button onClick={() => handleTransitionSelection('mint_token')}>
        Mint Token
      </Button>
      <Button onClick={() => handleTransitionSelection('add_item')}>
        Add Item
      </Button>
      <Button onClick={() => handleTransitionSelection('buy_item')}>
        Buy Item
      </Button>
      <Button onClick={() => handleTransitionSelection('check_mapping')}>
        Check Mapping
      </Button>

      {selectedTransition && (
        <TransitionComponent transition={selectedTransition} />
      )}
    </div>
  );
};

const TransitionComponent: React.FC<{ transition: string }> = ({
  transition,
}) => {
  const program_name = 'store_3lzgy5.aleo';

  switch (transition) {
    case 'mint_token':
      return <MintToken program_name={program_name} />;
    case 'add_item':
      return <AddItem program_name={program_name} />;
    case 'buy_item':
      return <BuyItem program_name={program_name} />;
    case 'check_mapping':
      return <CheckMapping program_name={program_name} />;
    default:
      return null;
  }
};

export default App;
