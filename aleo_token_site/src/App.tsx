import React, { FC, useEffect, useMemo, useState } from 'react';
import {
  useWallet,
  WalletProvider,
} from '@demox-labs/aleo-wallet-adapter-react';
import {
  WalletModalProvider,
  WalletMultiButton,
} from '@demox-labs/aleo-wallet-adapter-reactui';
import { LeoWalletAdapter } from '@demox-labs/aleo-wallet-adapter-leo';
import {
  DecryptPermission,
  Transaction,
  Transition,
  WalletAdapterNetwork,
  AleoTransaction,
} from '@demox-labs/aleo-wallet-adapter-base';
import './App.css';
import { Button, Form } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MintPublic } from './Buttons/MintPublic';
import { MintPrivate } from './Buttons/MintPrivate';
import { TransferPublic } from './Buttons/TransferPublic';
import { TransferPrivate } from './Buttons/TransferPrivate';

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
        {/* token_3lzgy5 */}
        <h1 className="text-center">Token_3lzgy5.aleo</h1>

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
      <Button onClick={() => handleTransitionSelection('mint_public')}>
        Mint Public
      </Button>
      <Button onClick={() => handleTransitionSelection('mint_private')}>
        Mint Private
      </Button>
      <Button onClick={() => handleTransitionSelection('transfer_public')}>
        Transfer Public
      </Button>
      <Button
        onClick={() => handleTransitionSelection('transfer_private')}
        disabled
      >
        Transfer Private
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
  switch (transition) {
    case 'mint_public':
      return <MintPublic />;
    case 'mint_private':
      return <MintPrivate />;
    case 'transfer_public':
      return <TransferPublic />;
    case 'transfer_private':
      return <TransferPrivate />;
    case 'transfer_private_to_public':
      return <TransferPrivateToPublic />;
    case 'transfer_public_to_private':
      return <TransferPublicToPrivate />;
    default:
      return null;
  }
};

const TransferPrivateToPublic: React.FC = () => {
  // ... (implementation for TransferPrivateToPublic)
  return <div></div>;
};

const TransferPublicToPrivate: React.FC = () => {
  // ... (implementation for TransferPublicToPrivate)
  return <div></div>;
};

export default App;
