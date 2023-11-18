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
      You are not yet a Degen!!!
      </Title>
      <div className="text-left">
        Proof is generated! <br />
        You are not yet a Degen <br />
        You borrowing amount limitation: 5 WETH
      </div> 
      {renderButton()}
    </>
  )
}
