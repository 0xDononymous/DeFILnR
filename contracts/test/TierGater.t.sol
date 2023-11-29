// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {Test, console} from "forge-std/Test.sol";
import {TierGater} from "../src/TierGater.sol";
import {LibUserSegmentation} from "../src/libraries/LibUserSegmentation.sol";

contract TierGaterTest is Test {
    TierGater gater;

    address public constant MAILBOX = address(0xaa);
    address public constant MEMBERSHIP = address(0xbb);
    uint32 public constant ORIGIN = 5;

    function setUp() public {
        gater = new TierGater(
            MAILBOX// mailbox
        );
        gater.setTrustedSource(ORIGIN, MEMBERSHIP);
    }

    function test_setTrustedSource() public {
        gater.setTrustedSource(6, address(0xcc));
        address trustedSource = gater.trustedSources(6);
        assertEq(trustedSource, address(0xcc));
    }

    function test_handle() public {
        address user = vm.addr(uint256(keccak256("RandomSeed")));
        // test handle (global entrypoint)
        vm.prank(MAILBOX);
        bytes memory data = abi.encode(uint16(LibUserSegmentation.UserSegment.Tier1), user);
        gater.handle(ORIGIN, bytes32(uint256(uint160(MEMBERSHIP))), data);

        uint16 Tier = gater.userTier(user);
        assertEq(Tier, uint16(LibUserSegmentation.UserSegment.Tier1));
    }
}
