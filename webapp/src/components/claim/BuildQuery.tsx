"use client";

import { useAxiomCircuit } from "@axiom-crypto/react";
import { CircuitInputs } from "../../lib/circuit";
import { AxiomV2Callback } from "@axiom-crypto/core";
import { useEffect } from "react";
import LoadingAnimation from "../ui/LoadingAnimation";
import DegenMembershipClient from "./DegenMembershipClient";
import { useRouter } from 'next/navigation'

export default function BuildQuery({
  inputs,
  callback,
  membershipAbi
}: {
  inputs: CircuitInputs;
  callback: AxiomV2Callback;
  membershipAbi: any[];
}) {
  const route = useRouter()
  console.log("entering build query")

  const {
    build,
    builtQuery,
    payment,
    setParams,
    areParamsSet
  } = useAxiomCircuit();

  useEffect(() => {
    setParams(inputs, callback);
  }, [setParams, inputs, callback]);

  useEffect(() => {
    const buildQuery = async () => {
      console.log("buildQuery input", inputs)
      console.log("buildQuery callback", callback)
      if (!areParamsSet) {
        return;
      }
      await build();
    };
    buildQuery();
  }, [build, areParamsSet, route]);

  if (!builtQuery || !payment) {
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
