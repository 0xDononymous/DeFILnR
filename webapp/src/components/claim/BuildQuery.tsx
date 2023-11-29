"use client";

import { useAxiomCircuit } from "@axiom-crypto/react";
import { CircuitInputs } from "../../lib/circuit/circuit";
import { useEffect } from "react";
import LoadingAnimation from "../ui/LoadingAnimation";
import DegenMembershipClient from "./DegenMembershipClient";
import { useRouter } from 'next/navigation'

export default function BuildQuery({
  inputs,
  callbackAddress,
  callbackExtraData,
  refundee,
  membershipAbi
}: {
  inputs: CircuitInputs;
  callbackAddress: string;
  callbackExtraData: string;
  refundee: string;
  membershipAbi: any[];
}) {
  const route = useRouter()
  console.log("entering build query")

  const {
    build,
    builtQuery,
    setParams,
    areParamsSet
  } = useAxiomCircuit();

  useEffect(() => {
    setParams(inputs, callbackAddress, callbackExtraData, refundee);
  }, [setParams, inputs, callbackAddress, callbackExtraData, refundee]);

  useEffect(() => {
    const buildQuery = async () => {
      console.log("buildQuery input", inputs)
      console.log("buildQuery callback", callbackAddress)
      if (!areParamsSet) {
        return;
      }
      await build();
    };
    buildQuery();
  }, [build, areParamsSet, route]);

  if (!builtQuery) {
    return (
      <div className="flex flex-row items-center font-mono gap-2">
        {"Building Query"} <LoadingAnimation />
      </div>
    );
  }
  
  return (
    <DegenMembershipClient membershipAbi={membershipAbi} />
  );
}
