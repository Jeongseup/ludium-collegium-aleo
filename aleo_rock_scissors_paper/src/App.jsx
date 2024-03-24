import { useState } from 'react';
import reactLogo from './assets/react.svg';
import aleoLogo from './assets/aleo.svg';
import './App.css';
import rock_paper_scissors from '../rock_paper_scissors_3lzgy5/build/main.aleo?raw';
import { AleoWorker } from './workers/AleoWorker.js';

import scissorsImage from './assets/scissors2.png';
import rockImage from './assets/rock2.png';
import paperImage from './assets/paper2.png';

const aleoWorker = AleoWorker();
function App() {
  const [executing, setExecuting] = useState(false);
  const [deploying, setDeploying] = useState(false);
  const arr = [0, 2, 5];
  const [selectedValue, setSelectedValue] = useState(null);

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleSelection = (value) => {
    setSelectedValue(value);
  };

  async function execute() {
    let player1 = arr[getRandomInt(0, 2)];
    let player2 = selectedValue;
    const final_player1 = player1 + 'field';
    const final_player2 = player2 + 'field';

    let input = `{ first : ${final_player1}, second : ${final_player2}}`;

    setExecuting(true);
    const result = await aleoWorker.localProgramExecution(
      rock_paper_scissors,
      'main',
      [input]
    );
    setExecuting(false);
    console.log('JSON.stringify(result)', JSON.stringify(result));
    console.log(JSON.stringify(result)[0]);
    if (result[0] === '10field') {
      alert('무승부!');
    } else if (result[0] === final_player1) {
      alert('player1 승리');
    } else if (result[0] === final_player2) {
      alert('player2 승리');
    } else {
      alert('error');
    }
  }

  async function deploy() {
    setDeploying(true);
    try {
      const result = await aleoWorker.deployProgram(rock_paper_scissors);
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
      </div>
      <h1>Aleo Rock, Scissors, Paper ZkGame</h1>

      {/* 가위, 바위, 보 버튼 */}
      <div className="game-controls">
        <h1>가위, 바위, 보</h1>
        <p>
          당신은 Player1입니다 다음 중 먼저 가위/바위/보 중에 한개를 선택하세요
        </p>

        <button onClick={() => handleSelection(2)}>
          <img src={scissorsImage} alt="가위" />
        </button>
        <button onClick={() => handleSelection(0)}>
          <img src={rockImage} alt="바위" />
        </button>
        <button onClick={() => handleSelection(5)}>
          <img src={paperImage} alt="보" />
        </button>
      </div>

      {/* 선택된 값 표시 */}
      {/* {selectedValue !== null && <p>Selected value: {selectedValue}</p>} */}

      <div className="card">
        <p>
          그리고 하단의 버튼을 클릭하시면 컴퓨터의 가위,바위,보가 나오고 결과를
          알 수 있습니다.
        </p>
        <p>
          <button disabled={executing} onClick={execute}>
            {executing
              ? `Executing...check console for details...`
              : `Execute rock scissors paper `}
          </button>
        </p>
      </div>

      {/* 나머지 코드 ... */}

      {/* Advanced Section */}
      <div className="card">
        <h2>Advanced Actions</h2>
        <p>
          다음은 가위,바위,보 게임을 Aleo 테스트넷에 배포하는 버튼입니다.
          클릭해보세요, 단 .env에 저장한 private key의 계정으로 배포하는
          것입니다
        </p>
        <p>
          <button disabled={deploying} onClick={deploy}>
            {deploying
              ? `Deploying...check console for details...`
              : `Deploy rock_paper_scissors.aleo`}
          </button>
        </p>
      </div>
    </>
  );
}

export default App;
