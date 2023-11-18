import Title from "@/components/ui/Title";
import { Constants } from "@/shared/constants";
import Link from "next/link";
import LinkButton from '@/components/ui/LinkButton'
import ConnectWallet from '@/components/ui/ConnectWallet'
import { forwardSearchParams } from '@/lib/utils'


interface PageProps {
  params: Params;
  searchParams: SearchParams;
}

interface Params {
  slug: string;
}

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export default async function Success({ searchParams }: PageProps) {
  const connected = searchParams?.connected as string ?? "";

  const renderButton = () => {
    if (connected) {
      return <LinkButton
        label="Open a CA on Gearbox"
        //TODO: Link membership.sol
        href={"/check?" + forwardSearchParams(searchParams)}
      />;
    }
    return <ConnectWallet connected={connected} />;
  } 

  return (
    <>
      <Title>
        Welcome to DeFi Loyalty and Reward System
      </Title>
      <div className="text-left">
        1. Connect wallet <br />
        2. Generate the proof of your loyalty tier and open a CA with better leverage flexibility on Gearbox <br />
        <br />
        <></>
        <></>
        Proof is generated! <br />
        You are not yet a Degen <br />
        You borrowing amount limitation: 5 WETH
      </div> 
      {renderButton()}
    </>
  )
}
