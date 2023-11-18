import MainLayout from '@/components/layout/MainLayout'
import ConnectWallet from '@/components/ui/ConnectWallet'
import LinkButton from '@/components/ui/LinkButton'
import Title from '@/components/ui/Title'
import { forwardSearchParams } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'


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

export default async function Home({ searchParams }: PageProps) {
  const connected = searchParams?.connected as string ?? "";
  console.log(searchParams);

  const renderButton = () => {
    if (connected) {
      return <LinkButton
        label="Check Eligibility"
        href={"/check?" + forwardSearchParams(searchParams)}
      />;
    }
    return <ConnectWallet connected={connected} />;
  }

  return (
    <>
      <Title>
        DeFi Loyalty and Reward System
      </Title>
      <div className="text-left">
        1. Connect wallet <br />
        2. Enter your preferred leverage factor and amount <br />
        3. Generate the proof and open a credit account on Gearbox <br />
        <br />
        <br />
        Leverage Factor *
        <input
          type="text"
          className="mx-2 p-1 border border-gray-300 rounded"
        /> <br /><br />
        🚨 Rule: holding X ETH for 20 days get to set * X the max <br />
        <br /><br /><br />
        Amount =
        <input
          type="text"
          className="mx-2 p-1 border border-gray-300 rounded"
        />
      </div> ETH
      🚨 Make sure the wallet balance is enough for the amount
      {renderButton()}
    </>
  )
}
