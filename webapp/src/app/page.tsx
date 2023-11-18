/* eslint-disable @next/next/no-async-client-component */
"use client"

import MainLayout from '@/components/layout/MainLayout'
import ConnectWallet from '@/components/ui/ConnectWallet'
import LinkButton from '@/components/ui/LinkButton'
import Title from '@/components/ui/Title'
import { forwardSearchParams } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useAccount } from 'wagmi'
import { useState } from 'react'

import logo from '../imgs/janissary-removebg-preview.png'

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
  const { address, isConnected } = useAccount()

  console.log('connected', isConnected)

  console.log(searchParams);

  const [leverageFactor, setLeverageFactor] = useState(0);

  const renderButton = () => {
    if (isConnected && address) {
      return <LinkButton
        label="Generate Proof"
        //TODO: Link membership.sol
        href={"/check?" + forwardSearchParams(searchParams)}
        // href={"/fail?" + forwardSearchParams(searchParams)}
      />;
    }
    return <ConnectWallet />;
  } 

  return (
    <>
      <Image height={200} src={logo} alt="logo"/>
      <Title>
        {/* Welcome to DeFi Loyalty and Reward System */}
        Welcome to Janissary Farm
      </Title>
      <div className="text-left">
        {/* 1. Connect wallet <br /> */}
        Leveraged DeFi access based on on-chain credit<br />
        {/* Generate the proof of your loyalty tier and open a CA with better leverage flexibility on Gearbox  */}
        <br />
      </div> 
      {renderButton()}
    </>
  )
}
