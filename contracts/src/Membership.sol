// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {AxiomV2Client} from "./AxiomV2Client.sol";
import {HyperlaneSender} from "./HyperlaneSender.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import {IMembership} from "./interfaces/IMembership.sol";

import {LibUserSegmentation} from "./libraries/LibUserSegmentation.sol";

contract Membership is IMembership, AxiomV2Client, HyperlaneSender, Ownable {
    uint64 public callbackSourceChainId;
    uint32 public messageDestinationDomain;
    bytes32 public axiomCallbackQuerySchema;
    address public recipientAddress;

    uint32 public constant PROVING_INTERVAL = 1728000;

    constructor(
        address _axiomV2QueryAddress,
        address _mailBoxAddress,
        uint64 _callbackSourceChainId,
        uint32 _messageDestinationDomain,
        bytes32 _axiomCallbackQuerySchema
    ) payable AxiomV2Client(_axiomV2QueryAddress) HyperlaneSender(_mailBoxAddress) {
        callbackSourceChainId = _callbackSourceChainId;
        messageDestinationDomain = _messageDestinationDomain;
        axiomCallbackQuerySchema = _axiomCallbackQuerySchema;
    }

    function sendProvedMembership(address provingAddress) public override {}

    function _axiomV2Callback(
        uint64, /*sourceChainId*/
        address callerAddr,
        bytes32, /*querySchema*/
        uint256, /*queryId*/
        bytes32[] calldata axiomResults,
        bytes calldata /*extraData*/
    ) internal virtual override {
        // Parse results
        bytes32 _eventSchema = axiomResults[0];
        address _provingAddress = address(uint160(uint256(axiomResults[1])));
        address _facadeAddress = address(uint160(uint256(axiomResults[2])));
        uint256 _openCATimes = uint256(axiomResults[3]);

        // Validate the results
        // event schema should be equal to
        // `OpenCreditAccount (address onBehalfOf, address creditAccount, uint256 borrowAmount, uint16 referralCode)` event schema
        if (_eventSchema != 0xfa2baf5d3eb95569f312f22477b246f9d4c50276f1cb3ded8e1aeadcbc07a763) {
            revert("event schema mismatch");
        }
        // proving address should be the caller
        /*if (provingAddress == callerAddr) {
            revert("caller address and proving address mismatch");
        }*/
        // facade address should be equal to 0x15A43dbcD8dBc094f7866c2F458cAb68c35BBe16
        if (_facadeAddress != 0x15A43dbcD8dBc094f7866c2F458cAb68c35BBe16) {
            revert("facade address mismatch");
        }

        // User segmentation
        // balance criteria should be used to determine the user level
        //
        // example of decoding when destination chain received this
        // (uint16 leverageFactor, address callerAddr) =
        //     abi.decode(_messageBody, (uint256, address));
        LibUserSegmentation.UserSegment _userSegment = LibUserSegmentation.segmentationByV2Usage(_openCATimes);
        if (_userSegment == LibUserSegmentation.UserSegment.Tier1) {
            bytes memory _messageBody = abi.encodePacked(uint256(5 ether), _provingAddress);
            dispatch(messageDestinationDomain, bytes32(uint256(uint160(recipientAddress))), _messageBody);
        } else if (_userSegment == LibUserSegmentation.UserSegment.Tier2) {
            bytes memory _messageBody = abi.encodePacked(uint256(20 ether), _provingAddress);
            dispatch(messageDestinationDomain, bytes32(uint256(uint160(recipientAddress))), _messageBody);
        } else if (_userSegment == LibUserSegmentation.UserSegment.Tier3) {
            bytes memory _messageBody = abi.encodePacked(type(uint256).max, _provingAddress);
            dispatch(messageDestinationDomain, bytes32(uint256(uint160(recipientAddress))), _messageBody);
        }
    }

    function _validateAxiomV2Call(uint64 sourceChainId, address, /*callerAddr*/ bytes32 querySchema)
        internal
        virtual
        override
    {
        require(sourceChainId == callbackSourceChainId, "AxiomV2: caller sourceChainId mismatch");
        require(querySchema == axiomCallbackQuerySchema, "AxiomV2: query schema mismatch");
    }

    function deposit() public payable {}

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        (bool sent,) = msg.sender.call{value: balance}("");
        require(sent, "Transaction failed");
    }

    function setRecipient(address _recipient) public onlyOwner {
        recipientAddress = _recipient;
    }
}
