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
  txHash: string;
  blockNumber: string;
  logIdx: string;
}

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export default async function Claim({ params }: PageProps) {
  console.log("testtt", params)
  const connected = params?.connected as string ?? "";
  const txHash = params?.txHash as string ?? "";
  const blockNumber = params?.blockNumber as string ?? "";
  const logIdx = params?.logIdx as string ?? "";

  const tx = await publicClient.getTransaction({
    hash: txHash as `0x${string}`,
  });
  const txIdx = tx.transactionIndex.toString();

  const inputs: CircuitInputs = {
    blockNumber: Number(blockNumber),
    txIdx: Number(txIdx),
    logIdx: Number(logIdx),
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
