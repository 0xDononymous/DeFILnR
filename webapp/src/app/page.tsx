/* eslint-disable @next/next/no-async-client-component */
"use client"

import MainLayout from '@/components/layout/MainLayout'
import ConnectWallet from '@/components/ui/ConnectWallet'
import LinkButton from '@/components/ui/LinkButton'
import Title from '@/components/ui/Title'
import { forwardSearchParams } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'


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

export default function Home({ searchParams }: PageProps) {
  const connected = searchParams?.connected as string ?? "";
  console.log(searchParams);

  const [leverageFactor, setLeverageFactor] = useState(0);

  const renderButton = () => {
    if (connected) {
      return <LinkButton
        label="Generate Proof"
        //TODO: Link membership.sol
        href={"/check?" + forwardSearchParams(searchParams)}
        // href={"/fail?" + forwardSearchParams(searchParams)}
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
      </div> 
      {renderButton()}
    </>
  )
}
