// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IMailbox {
    event Dispatch(address indexed sender, uint32 indexed destination, bytes32 indexed recipient, bytes message);

    event DispatchId(bytes32 indexed messageId);

    event ProcessId(bytes32 indexed messageId);

    event Process(uint32 indexed origin, bytes32 indexed sender, address indexed recipient);

    function localDomain() external view returns (uint32);

    function delivered(bytes32 messageId) external view returns (bool);

    function dispatch(uint32 _destinationDomain, bytes32 _recipientAddress, bytes memory _messageBody)
        external
        payable
        returns (bytes32);

    function quoteDispatch(uint32 destinationDomain, bytes32 recipientAddress, bytes calldata messageBody)
        external
        view
        returns (uint256 fee);

    function process(bytes calldata _metadata, bytes calldata _message) external;

    function count() external view returns (uint32);

    function root() external view returns (bytes32);

    function latestCheckpoint() external view returns (bytes32, uint32);
}
