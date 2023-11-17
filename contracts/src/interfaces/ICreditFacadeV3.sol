
pragma solidity 0.8.19;

import {MultiCall} from "../../lib/core-v2/contracts/libraries/MultiCall.sol";

interface ICreditFacadeV3 {
    function openCreditAccount(address onBehalfOf, MultiCall[] calldata calls, uint256 referralCode)
        external
        payable
        returns (address creditAccount);
}