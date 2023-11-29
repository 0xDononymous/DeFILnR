// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import {Script, console2} from "forge-std/Script.sol";
import {Membership} from "../src/Membership.sol";

contract MembershipScript is Script {
    address public constant AXIOM_V2_QUERY_GOERLI_MOCK_ADDR = 0xBd5307B0Bf573E3F2864Af960167b24Aa346952b;
    address public constant HYPERLANE_MAILBOX_ADDR = 0x49cfd6Ef774AcAb14814D699e3F7eE36Fdfba932;
    uint64 public constant CALLBACK_SOURCE_CHAIN_ID = 5;
    uint32 public constant MESSAGE_DESTINATION_DOMAIN = 7878;
    bytes32 public constant QUERY_SCHEMA = 0xaf8e20184ddcaa915d0026f75cfc9e4738f3eaac7b15db9457fcd8fbd9eaa45e;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        Membership membership = new Membership(
            AXIOM_V2_QUERY_GOERLI_MOCK_ADDR,
            HYPERLANE_MAILBOX_ADDR,
            CALLBACK_SOURCE_CHAIN_ID,
            MESSAGE_DESTINATION_DOMAIN,
            QUERY_SCHEMA
        );

        membership.deposit{value: 0.05 ether}();

        vm.stopBroadcast();
    }
}
