import BuildQuery from "@/components/claim/BuildQuery";
import Title from "@/components/ui/Title";
import autoAirdropJson from '@/lib/abi/AutonomousAirdrop.json';
import { CircuitInputs, defaultInputs } from "@/lib/circuit";
import { publicClient } from "@/lib/viemClient";
import { Constants } from "@/shared/constants";
import { AxiomV2Callback, bytes32, getFunctionSelector } from "@axiom-crypto/core";
import { useRouter } from 'next/navigation'

interface PageProps {
  params: Params;
  searchParams: SearchParams;
}

interface Params {
  connected: string;
  facadeAddress: string;
  txHash: string[];
  blockNumber: string[];
  logIdx: string[];
}

interface SearchParams {
  connected: any;
  facadeAddress: any;
  txHash: any;
  blockNumber: string[];
  logIdx: string[];
}

export default async function Claim({ searchParams }: PageProps) {
  const connected = searchParams?.connected;
  const facadeAddress = searchParams?.facadeAddress;
  const txHash = searchParams?.txHash;
  let blockNumber_str = searchParams?.blockNumber;
  let logIdx_str = searchParams?.logIdx;

  let txs = [];
  let txIdxs = [];
  for (let i = 0; i < txHash.length; i++) {
    const tx = await publicClient.getTransaction({
      hash: txHash[i] as `0x${string}`,
    });
    txs.push(tx);
    txIdxs.push(tx.transactionIndex);
  }

  let blockNumber = [];
  let logIdx = [];
  for (let i = 0; i < txHash.length; i++) {
    blockNumber[i] = parseInt(blockNumber_str[i]);
    logIdx[i] = parseInt(logIdx_str[i]);
  }


  console.log("test",  {
    provingAddress: connected,
    facadeAddress: facadeAddress,
    blockNumber: blockNumber,
    txIdx: txIdxs,
    logIdx: logIdx,
  })
  const inputs: CircuitInputs = {
    "provingAddress": connected,
    "facadeAddress": facadeAddress,
    "blockNumber": blockNumber,
    "txIdx": txIdxs,
    "logIdx": logIdx,
  }

  const callback: AxiomV2Callback = {
    target: Constants.GOERLI_MEMBERSHIP_ADDR as `0x${string}`,
    extraData: "0x",
  }

  return (
    <>
      <Title>
        Open Credit Account
      </Title>
      <div className="text-center">
        Please wait while we generate a compute proof in wasm for the Axiom Query. Once complete, we will create a credit account based on your on-chain credit.
      </div>
      <div className="flex flex-col gap-2 items-center">
        <BuildQuery
          inputs={defaultInputs}
          callback={callback}
          membershipAbi={autoAirdropJson.abi}
        />
      </div>
    </>
  )
}
