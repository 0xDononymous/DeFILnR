// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import {Script, console2} from "forge-std/Script.sol";
import {TierGater} from "../src/TierGater.sol";

contract TierGaterScript is Script {
    address mailbox = 0x58483b754Abb1E8947BE63d6b95DF75b8249543A;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        TierGater gater = new TierGater(mailbox);

        vm.stopBroadcast();
    }
}
