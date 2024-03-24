import {
  Account,
  ProgramManager,
  PrivateKey,
  initThreadPool,
  AleoKeyProvider,
  AleoNetworkClient,
  NetworkRecordProvider,
} from "@aleohq/sdk";
import { expose, proxy } from "comlink";

await initThreadPool();

//localProgramExecution2
async function localProgramExecution(program, aleoFunction, inputs) {
  const programManager = new ProgramManager();
  console.log("programManager", programManager);

  // Create a temporary account for the execution of the program
  const account = new Account();
  console.log("Account", account);

  programManager.setAccount(account);
  console.log("programManager Account", programManager);

  const executionResponse = await programManager.run(
    program,
    aleoFunction,
    inputs,
    false
  );

  console.log("executionResponse", executionResponse);
  return executionResponse.getOutputs();
}

async function localProgramExecution2(program, aleoFunction, inputs) {
  const programManager = new ProgramManager();

  // Create a temporary account for the execution of the program
  const account = new Account();
  programManager.setAccount(account);

  const executionResponse = await programManager.run(
    program,
    aleoFunction,
    inputs,
    false
  );
  return executionResponse.getOutputs();
}

async function getPrivateKey() {
  const key = new PrivateKey();
  return proxy(key);
}

async function deployProgram(program) {
  const keyProvider = new AleoKeyProvider();
  keyProvider.useCache(true);

  // Create a record provider that will be used to find records and transaction data for Aleo programs
  const networkClient = new AleoNetworkClient(
    "https://api.explorer.aleo.org/v1"
  );

  // Use existing account with funds
  const account = new Account({
    privateKey: import.meta.env.PRIVATE_KEY,
  });

  const recordProvider = new NetworkRecordProvider(account, networkClient);

  // Initialize a program manager to talk to the Aleo network with the configured key and record providers
  const programManager = new ProgramManager(
    "https://api.explorer.aleo.org/v1",
    keyProvider,
    recordProvider
  );

  programManager.setAccount(account);

  // Define a fee to pay to deploy the program
  const fee = 12; // 1.9 Aleo credits

  // Deploy the program to the Aleo network
  const tx_id = await programManager.deploy(program, fee);

  // Optional: Pass in fee record manually to avoid long scan times
  // const feeRecord = "{  owner: aleo1xxx...xxx.private,  microcredits: 2000000u64.private,  _nonce: 123...789group.public}";
  // const tx_id = await programManager.deploy(program, fee, undefined, feeRecord);

  return tx_id;
}

const workerMethods = {
  localProgramExecution,
  getPrivateKey,
  deployProgram,
  localProgramExecution2,
};
expose(workerMethods);
