// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import {Script, console2} from "forge-std/Script.sol";
import {Membership} from "../src/Membership.sol";

contract MembershipScript is Script {
    address public constant AXIOM_V2_QUERY_GOERLI_MOCK_ADDR = 0xBd5307B0Bf573E3F2864Af960167b24Aa346952b;
    address public constant HYPERLANE_MAILBOX_ADDR = 0x49cfd6Ef774AcAb14814D699e3F7eE36Fdfba932;
    uint64 public constant CALLBACK_SOURCE_CHAIN_ID = 5;
    uint32 public constant MESSAGE_DESTINATION_DOMAIN = 7878;
    bytes32 public constant QUERY_SCHEMA = 0x872c49db095ae13ee005c761229aebf912beb3c3422e54d61664efec2b2d17f1;

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
