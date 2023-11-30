import BuildQuery from "@/components/claim/BuildQuery";
import Title from "@/components/ui/Title";
import autoAirdropJson from '@/lib/abi/AutonomousAirdrop.json';
import { CircuitValueInputs, inputs } from "@/lib/circuit/circuit";
import { bytes32 } from "@/lib/utils";
import { publicClient } from "@/lib/viemClient";
import { Constants } from "@/shared/constants";
//import { AxiomV2Callback, bytes32, getFunctionSelector } from "@axiom-crypto/core";
import { constant } from "@axiom-crypto/client";

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
  const connected = searchParams?.connected as string ?? "";
  const facadeAddress = searchParams?.facadeAddress as string ?? "";
  const txHash = searchParams?.txHash as string ?? "";
  const blockNumber_str = searchParams?.blockNumber as string[];
  const logIdx_str = searchParams?.logIdx as string[];

  const txIdxs: Array<string> = [];
  for (let i = 0; i < txHash.length; i++) {
    const tx = await publicClient.getTransaction({
      hash: txHash[i] as any,
    })
    txIdxs.push(tx.transactionIndex.toString())
  }

  const inputs: CircuitValueInputs = {
    provingAddress: constant(connected),
    facadeAddress: constant(facadeAddress),
    blockNumber: blockNumber_str.map((id: string) => constant(id)),
    txIdx: txIdxs.map((id) => constant(id)),
    logIdx: logIdx_str.map((id) => constant(id)),
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
          inputs={inputs}
          callbackAddress={Constants.GOERLI_MEMBERSHIP_ADDR}
          callbackExtraData={bytes32(connected)}
          refundee={connected}
          membershipAbi={autoAirdropJson.abi}
        />
      </div>
    </>
  )
}
