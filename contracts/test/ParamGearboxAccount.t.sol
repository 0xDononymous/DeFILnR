// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import { Test, console } from 'forge-std/Test.sol';
import { ParamGearboxAccount } from '../src/ParamGearboxAccount.sol';
import { IAxiomV2Query } from '../src/interfaces/IAxiomV2Query.sol';

contract ParamGearboxAccountTest is Test {
    address public constant AXIOM_V2_QUERY_GOERLI_ADDR = 0x8DdE5D4a8384F403F888E1419672D94C570440c9;
    address public constant GEARBOX_V2_ADDRPROVIDER_GOERLI_ADDR = 0x95f4cea53121b8A2Cb783C6BFB0915cEc44827D3;
    bytes32 public constant CALLBACK_QUERY_SCHEMA = bytes32(0x6bf0e6fdf43cd348a907e75c79aeb6a44b337690f4476e7c7a52db20b76ce6f0);
    // bytes public constant TEST_DATAQUERY = hex"00000000000000050003000548ec8cb5f934664d26c0cf435e2f7c924ef757ab4c84b20e7320e21f468551b70000006700000000c42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67000548ec8cb5f934664d26c0cf435e2f7c924ef757ab4c84b20e7320e21f468551b70000006700000002c42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67000548ec8cb5f934664d26c0cf435e2f7c924ef757ab4c84b20e7320e21f468551b700000034000000000000000000000000000000000000000000000000000000000000000000000000";
    // bytes public constant TEST_CALLBACK = hex"51b17b290000000000000000000000000000000000000000000000000000000000000005000000000000000000000000d780ba6903fecebede0d7dfcc0a558227f9eadc200000000000000000000000000000000000000000000000000000000000000002f3a19a5c1a80ef8c5f6ca793dacff43891949ff694eafa80f5ab88f74adf97e00000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000001400000000000000000000000000000000000000000000000000000000000000003c42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67000000000000000000000000b392448932f6ef430555631f765df0dfae34eff3000000000000000000000000000000000000000000000000000000000092b34a0000000000000000000000000000000000000000000000000000000000000014b392448932f6ef430555631f765df0dfae34eff3000000000000000000000000";
    
    bytes32[] public callbackData;
    ParamGearboxAccount paramGearboxAccount;

    function setUp() public {
        paramGearboxAccount = new ParamGearboxAccount(
            AXIOM_V2_QUERY_GOERLI_ADDR, 
            5, 
            CALLBACK_QUERY_SCHEMA,
            GEARBOX_V2_ADDRPROVIDER_GOERLI_ADDR
        );
    }

    function test_updateCreditManagerAddr() public {
        address newCreditManager = 0x8DdE5D4a8384F403F888E1419672D94C570440c9; // FIXME: change to new address
        paramGearboxAccount.updateCreditManagerAddr(newCreditManager);
    }

    function test_isCorrectProvider() public {
        address gearboxProvider = GEARBOX_V2_ADDRPROVIDER_GOERLI_ADDR;
        // FIXME
    }

    function test_openCreditAccount() public {
        // vm.prank(msg.sender);
        paramGearboxAccount._openCreditAccount(100, msg.sender);
    }
    /* function debugDataQuery(bytes calldata dataQuery, uint256 a, uint256 b) public pure returns (bytes32) {
        return bytes32(dataQuery[a:b]);
    } */

}