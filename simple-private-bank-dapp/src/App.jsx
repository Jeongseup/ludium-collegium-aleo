import { useState } from "react";
import reactLogo from "./assets/react.svg";
import aleoLogo from "./assets/aleo.svg";
import "./App.css";
import private_aleo from "../private_aleo/build/main.aleo?raw";
import { AleoWorker } from "./workers/AleoWorker.js";

const aleoWorker = AleoWorker();
function App() {
  const [count, setCount] = useState(0);
  const [account, setAccount] = useState(null);
  const [executing, setExecuting] = useState(false);
  const [executing2, setExecuting2] = useState(false);
  const [executing3, setExecuting3] = useState(false);
  const [deploying, setDeploying] = useState(false);
  const [executionResult, setExecutionResult] = useState(null);
  const [executionResult2, setExecutionResult2] = useState(null);
  const [executionResult3, setExecutionResult3] = useState(null);
  const generateAccount = async () => {
    const key = await aleoWorker.getPrivateKey();
    setAccount(await key.to_string());
  };

  async function execute() {
    const inputValue = prompt("enter address (e.g, aleo1~~~)");
    const inputValue2 = prompt("enter amount (e.g., 100u64)");
    setExecuting(true);

    try {
      const result = await aleoWorker.localProgramExecution(
        private_aleo,
        "issue",
        [inputValue, inputValue2]
      );
      alert(JSON.stringify(result));
      setExecutionResult(JSON.stringify(result)); // 결과를 상태에 저장
    } catch (error) {
      console.error(error);
      setExecutionResult({ error: "Error executing the program." });
    }

    setExecuting(false);
  }

  async function execute2() {
    // const inputValue = prompt("enter record (e.g, record { owner: aleo1~~~, amount : 100u64.private, _nonce: 23424~group.public)")
    // const inputValue2 = prompt("enter amount (e.g., 30u64)")

    const inputValue =
      "{ owner: aleo1un2ns2xfja44dqnk6mnttkgsv5s0rtnqp8vyrwfd3wdfh7qm959s7mgrpv.private, amount: 100u64.private, _nonce: 7249632741181861419537500173406230266391864687422215016372541748504743053564group.public}";
    const inputValue2 = "30u64";

    setExecuting2(true);
    console.log("type check inputValue");
    console.log(typeof inputValue);
    console.log(inputValue);
    console.log(inputValue2);
    try {
      const result = await aleoWorker.localProgramExecution2(
        private_aleo,
        "deposit",
        [inputValue, inputValue2]
      );
      console.log("result", result);
      alert(JSON.stringify(result));
      setExecutionResult2(JSON.stringify(result)); // 결과를 상태에 저장
    } catch (error) {
      console.error(error);
      setExecutionResult2({ error: "Error executing the program." });
    }

    setExecuting2(false);
  }

  async function execute3() {
    const inputValue = prompt("enter address (e.g, aleo1~~~)");
    const inputValue2 = prompt("enter amount (e.g., 50u64 amount )");
    const inputValue3 = prompt("enter rate (e.g., 1234u64 12.34%)");
    const inputValue4 = prompt("enter period (e.g., 15u64 15 month)");
    setExecuting3(true);
    console.log("type check inputValue");
    console.log(typeof inputValue);
    console.log(inputValue);
    console.log(inputValue2);
    console.log(inputValue3);
    console.log(inputValue4);
    try {
      const result = await aleoWorker.localProgramExecution(
        private_aleo,
        "withdraw",
        [inputValue, inputValue2, inputValue3, inputValue4]
      );
      console.log("result", result);
      alert(JSON.stringify(result));
      setExecutionResult3(JSON.stringify(result)); // 결과를 상태에 저장
    } catch (error) {
      console.error(error);
      setExecutionResult3({ error: "Error executing the program." });
    }

    setExecuting3(false);
  }

  async function deploy() {
    setDeploying(true);
    try {
      const result = await aleoWorker.deployProgram(private_aleo);
      console.log("Transaction:");
      console.log("https://explorer.hamp.app/transaction?id=" + result);
      alert("Transaction ID: " + result);
    } catch (e) {
      console.log(e);
      alert("Error with deployment, please check console for details");
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
          <button onClick={generateAccount}>
            {account
              ? `Account is ${JSON.stringify(account)}`
              : `Click to generate account`}
          </button>
        </p>
        <p>
          <button disabled={executing} onClick={execute}>
            {executing
              ? `Executing...check console for details...`
              : `Execute issue function`}
          </button>
        </p>

        {/* 결과를 표시하는 부분 추가 */}
        {executionResult && (
          <div>
            <h3>Execution Result</h3>
            {/* <pre>{JSON.stringify(executionResult, null, 2)}</pre> */}
            <pre>{JSON.stringify(executionResult, null, 2)}</pre>
          </div>
        )}

        <p>
          <button disabled={executing2} onClick={execute2}>
            {executing2
              ? `Executing...check console for details...`
              : `Execute deposit function`}
          </button>
        </p>

        {/* 결과를 표시하는 부분 추가 */}
        {executionResult2 && (
          <div>
            <h3>Execution Result</h3>
            {/* <pre>{JSON.stringify(executionResult, null, 2)}</pre> */}
            <pre>{JSON.stringify(executionResult2, null, 2)}</pre>
          </div>
        )}

        <p>
          <button disabled={executing3} onClick={execute3}>
            {executing3
              ? `Executing...check console for details...`
              : `Execute  withdraw function`}
          </button>
        </p>

        {/* 결과를 표시하는 부분 추가 */}
        {executionResult3 && (
          <div>
            <h3>Execution Result</h3>
            {/* <pre>{JSON.stringify(executionResult, null, 2)}</pre> */}
            <pre>{JSON.stringify(executionResult3, null, 2)}</pre>
          </div>
        )}
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
              : `Deploy private_aleo.aleo`}
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
