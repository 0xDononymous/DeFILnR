// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import { IAxiomV2Query } from './IAxiomV2Query.sol';

interface IAxiomV2Input {
    struct AxiomV2QueryData {
        uint64 sourceChainId;
        bytes32 dataQueryHash;
        IAxiomV2Query.AxiomV2ComputeQuery computeQuery;
        IAxiomV2Query.AxiomV2Callback callback;
        bytes32 userSalt;
        uint64 maxFeePerGas;
        uint32 callbackGasLimit;
        address refundee;
        bytes dataQuery;
    }
}
