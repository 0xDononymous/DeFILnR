// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {Ownable} from "openzeppelin-contracts/contracts/access/Ownable.sol";

contract TierGater is Ownable {
    event TeirUpdated(address indexed userAddress, uint16 indexed tier);

    mapping(uint32 origin => address trustedSource) trustedSources;
    mapping(address user => uint16 tier) public userTier;

    function setTrustedSource(uint32 _origin, address _trustedSource) public onlyOwner {
        trustedSources[_origin] = _trustedSource;
    }

    function handle(uint32 _origin, bytes32 _sender, bytes calldata _message) external payable {
        require(trustedSources[_origin] != address(0), "Gater: trusted source not set.");
        require(_sender == bytes32(uint256(uint160(trustedSources[_origin]))), "Gater: origin not trusted");

        (uint16 tier, address user) = abi.decode(_message, (uint16, address));
        userTier[user] = tier;
        emit TeirUpdated(user, tier);
    }
}
