import {
  CircuitValue,
  CircuitValue256,
  constant,
  add,
  and,
  or,
  not,
  checkEqual,
  log,
  getReceipt,
  getTx,
  addToCallback
} from "@axiom-crypto/client";
export const inputs = {
  provingAddress: "0xf13df765f3047850Cede5aA9fDF20a12A75f7F70",
  facadeAddress: "0x15A43dbcD8dBc094f7866c2F458cAb68c35BBe16",
  blockNumber: [7925445, 7926956, 0, 0, 0],
  txIdx: [34, 46, 0, 0, 0, 0, 0, 0, 0, 0],
  logIdx: [5, 3, 0, 0, 0, 0, 0, 0, 0, 0]
};
export type CircuitInputType = typeof inputs;
export interface CircuitInputs extends CircuitInputType {}
export interface CircuitValueInputs {
  provingAddress: CircuitValue;
  facadeAddress: CircuitValue;
  blockNumber: CircuitValue[];
  txIdx: CircuitValue[];
  logIdx: CircuitValue[];
}
export const circuit = async ({
  provingAddress,
  facadeAddress,
  blockNumber,
  txIdx,
  logIdx
}: CircuitValueInputs) => {
  //
  //                 _                 _____  ______ _____  _
  //     /\         (_)               |  __ \|  ____|  __ \| |
  //    /  \   __  ___  ___  _ __ ___ | |__) | |__  | |__) | |
  //   / /\ \  \ \/ / |/ _ \| '_ ` _ \|  _  /|  __| |  ___/| |
  //  / ____ \  >  <| | (_) | | | | | | | \ \| |____| |    | |____
  // /_/    \_\/_/\_\_|\___/|_| |_| |_|_|  \_\______|_|    |______|
  //
  //

  // notes:
  // 1. write script
  // 2. test circuit
  // 3. generate keys
  // 4. export ...

  // input:
  // a. blockNumber[]
  // b. txIdx[]
  // c. logIdx[]
  // d. provingAddress
  // e. facadeAddress

  // example Axiom REPL circuit to prove the first block an account transacted
  // get the previous block number

  // `OpenCreditAccount (address onBehalfOf, address creditAccount, uint256 borrowAmount, uint16 referralCode)` event schema
  const eventSchema =
    "0xfa2baf5d3eb95569f312f22477b246f9d4c50276f1cb3ded8e1aeadcbc07a763";

  let verifyTxCnt = 0;

  for (let i = 0; i < blockNumber.length; i++) {
    if (blockNumber[i].number() == 0) {
      break;
    }
    // specify and fetch the data you want Axiom to verify
    let receipt = getReceipt(blockNumber[i], txIdx[i]);
    let receiptLog = receipt.log(logIdx[i]);
    let onBehalfOf = (await receiptLog.topic(1, eventSchema)).toCircuitValue();

    checkEqual(provingAddress, onBehalfOf);

    // get the `to` field of the transaction
    let tx = getTx(blockNumber[i], txIdx[i]);
    let txTo = (await tx.to()).toCircuitValue();
    checkEqual(facadeAddress, txTo);
    verifyTxCnt++;
  }

  let receipt = getReceipt(blockNumber[0], txIdx[0]);
  let receiptLog = receipt.log(logIdx[0]);
  let openCASchema = await receiptLog.topic(0, eventSchema);

  addToCallback(openCASchema);
  addToCallback(provingAddress);
  addToCallback(facadeAddress);
  addToCallback(constant(verifyTxCnt));
};
