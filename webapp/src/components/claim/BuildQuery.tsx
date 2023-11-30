"use client";

import { useAxiomCircuit } from "@axiom-crypto/react";
import { CircuitInputs } from "../../lib/circuit/circuit";
import { useEffect } from "react";
import LoadingAnimation from "../ui/LoadingAnimation";
import DegenMembershipClient from "./DegenMembershipClient";

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
  console.log(inputs)
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

  /*useEffect(() => {
    const buildQuery = async () => {
      //console.log("buildQuery input", inputs)
      //console.log("buildQuery callback", callbackAddress)
      if (!areParamsSet) {
        return;
      }
      console.log(44)
      //console.log(build)
      await build();
      console.log(46)
    };
    buildQuery();
  }, [build, areParamsSet, route]);*/

  useEffect(() => {
    const buildQuery = async () => {
      if (!areParamsSet) {
        return;
      }
      console.log(44)
      await build();
      console.log(46)
    };

    buildQuery();
  }, [build, areParamsSet]);

  console.log("builtQuery", builtQuery)

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
