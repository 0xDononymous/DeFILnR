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
      if (!areParamsSet) {
        return;
      }
      await build();
    };
    buildQuery().then(() => {
      route.push(`/success/?address=${inputs.provingAddress}`)
    });
  }, [build, areParamsSet, route]);

  if (!builtQuery || !payment) {
    return (
      <div className="flex flex-row items-center font-mono gap-2">
        {"Building Query"} <LoadingAnimation />
      </div>
    );
  }
  
  return (
  <div>
  </div>
  );
}
