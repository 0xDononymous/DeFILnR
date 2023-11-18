import BuildQuery from "@/components/claim/BuildQuery";
import Title from "@/components/ui/Title";
import autoAirdropJson from '@/lib/abi/AutonomousAirdrop.json';
import { CircuitInputs } from "@/lib/circuit";
import { publicClient } from "@/lib/viemClient";
import { Constants } from "@/shared/constants";
import { AxiomV2Callback, bytes32, getFunctionSelector } from "@axiom-crypto/core";

interface PageProps {
  params: Params;
  searchParams: SearchParams;
}

interface Params {
  connected: string;
  facadeAddress: string;
  log: string[];
  txHash: string[];
  blockNumber: number[];
  logIdx: number[];
}

interface SearchParams {
  connected: any;
  facadeAddress: any;
  txHash: any;
  blockNumber: any;
  logIdx: any
}

export default async function Claim({ searchParams }: PageProps) {
  console.log("tttesttt", searchParams)
  const connected = searchParams?.connected;
  const txHash = searchParams?.txHash;
  const blockNumber = searchParams?.blockNumber;
  const logIdx = searchParams?.logIdx;
  const facadeAddress = searchParams?.facadeAddress;

  let txs = [];
  let txIdxs = [];
  for (let i = 0; i < txHash.length; i++) {
    const tx = await publicClient.getTransaction({
      hash: txHash[i] as `0x${string}`,
    });
    txs.push(tx);
    txIdxs.push(tx.transactionIndex);
  }

  const inputs: CircuitInputs = {
    provingAddress: connected,
    facadeAddress: facadeAddress,
    blockNumber: blockNumber,
    txIdx: txIdxs,
    logIdx: logIdx,
  }

  const callback: AxiomV2Callback = {
    target: Constants.AUTO_AIRDROP_ADDR as `0x${string}`,
    extraData: bytes32(connected),
  }

  return (
    <>
      <Title>
        Claim airdrop
      </Title>
      <div className="text-center">
        Please wait while we generate a compute proof in wasm for the Axiom Query. Once complete, you can click the buttom below to claim your UselessToken airdrop. UselessToken is purely used for testing purposes and holds no financial or nonmonetary value.
      </div>
      <div className="flex flex-col gap-2 items-center">
        <BuildQuery
          inputs={inputs}
          callback={callback}
          airdropAbi={autoAirdropJson.abi}
        />
      </div>
    </>
  )
}
