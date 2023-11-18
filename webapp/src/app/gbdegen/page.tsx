"use client"

import Title from "@/components/ui/Title";
import { gearBoxTestnet } from "@/lib/wagmiConfig";
import { Constants } from "@/shared/constants";
import { useState, useEffect } from "react";
import { createPublicClient, http } from "viem";

const client = createPublicClient({ chain: gearBoxTestnet, transport: http() })

interface Params {
  slug: string;
}

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export default function Success() {

  const ca = "0x000000"
  
  const [maxDebt, setMaxDebt] = useState(0);

  useEffect(() => {
    // pull data
    // await client.
  }, )

  return (
    <>
      <Title>
      Hi Degen!!! &#128056;
      </Title>
      <div className="text-left">
        Max Debt: <br />
        CA Address: <br />
      </div> 
    </>
  )
}
