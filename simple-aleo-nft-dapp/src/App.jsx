import { useState } from 'react';
import reactLogo from './assets/react.svg';
import aleoLogo from './assets/aleo.svg';
import './App.css';
import simple_arc721 from '../simple_arc721_3lzgy5/build/main.aleo?raw';
import { AleoWorker } from './workers/AleoWorker.js';

const aleoWorker = AleoWorker();
function App() {
  const [count, setCount] = useState(0);

  const [executing, setExecuting] = useState(false);
  const [executingCreCol, setExecutingCreCol] = useState(false);
  const [executingMint, setExecutingMint] = useState(false);
  const [deploying, setDeploying] = useState(false);

  async function create_collection() {
    const inputValue = prompt('Enter a address value (e.g., aleo1~~~):');
    const inputValue2 = prompt('Enter a u128 value (e.g., 0u128):');
    console.log('inputValue', inputValue);
    console.log('inputValue2', inputValue2);
    if (
      inputValue !== null &&
      inputValue !== '' &&
      inputValue2 !== null &&
      inputValue2 !== ''
    ) {
      setExecutingCreCol(true);
      const result = await aleoWorker.localProgramExecution(
        simple_arc721,
        'create_collection',
        [inputValue, inputValue2] // You can use inputValue here
      );
      console.log('result', result);
      setExecutingCreCol(false);

      alert(JSON.stringify(result));
    } else {
      alert('Invalid input. Please enter a value.');
    }
  }

  async function mint() {
    const inputValue = prompt('Enter a address value (e.g., aleo1~~~):');
    const inputValue2 = prompt(
      'Enter a TokenID Object value (e.g., token_number : 0u128, collection_number:0u128):'
    );
    const inputValue3 = prompt(
      'Enter a NFT Meta_DATA value (e.g., {  part0: 140152554740597502496524452237299901250u128, part1: 133324194421918155921132289162654938981u128, part2: 93509703548909910993375653557521895508u128, part3: 147831289382731815962129268963868147712u128'
    );
    console.log('inputValue', inputValue);
    console.log('inputValue2', inputValue2);
    console.log('inputValue3', inputValue3);
    // Check if inputValue is not null (user clicked Cancel) or empty
    if (
      inputValue !== null &&
      inputValue !== '' &&
      inputValue2 !== null &&
      inputValue2 !== '' &&
      inputValue3 !== null &&
      inputValue3 !== ''
    ) {
      setExecutingMint(true);
      const result = await aleoWorker.localProgramExecution(
        simple_arc721,
        'mint',
        [inputValue, inputValue2, inputValue3] // You can use inputValue here
      );
      console.log('result', result);
      setExecutingMint(false);

      alert(JSON.stringify(result));
    } else {
      alert('Invalid input. Please enter a value.');
    }
  }

  async function deploy() {
    setDeploying(true);
    try {
      const result = await aleoWorker.deployProgram(simple_arc721);
      console.log('Transaction:');
      console.log('https://explorer.hamp.app/transaction?id=' + result);
      alert('Transaction ID: ' + result);
    } catch (e) {
      console.log(e);
      alert('Error with deployment, please check console for details');
    }
    setDeploying(false);
  }

  return (
    <>
      <div>
        <a href="https://aleo.org" target="_blank">
          <img src={aleoLogo} className="logo" alt="Aleo logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Aleo + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          <button disabled={executingCreCol} onClick={create_collection}>
            {executingCreCol
              ? `Executing...check console for details...`
              : `Execute create_collection.aleo`}
          </button>
        </p>
        <p>
          <button disabled={executingMint} onClick={mint}>
            {executingMint
              ? `Executing...check console for details...`
              : `Execute mint.aleo`}
          </button>
        </p>

        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

      {/* Advanced Section */}
      <div className="card">
        <h2>Advanced Actions</h2>
        <p>
          Deployment on Aleo requires certain prerequisites like seeding your
          wallet with credits and retrieving a fee record. Check README for more
          details.
        </p>
        <p>
          <button disabled={deploying} onClick={deploy}>
            {deploying
              ? `Deploying...check console for details...`
              : `Deploy simple_arc721.aleo`}
          </button>
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Aleo and React logos to learn more
      </p>
    </>
  );
}

export default App;
