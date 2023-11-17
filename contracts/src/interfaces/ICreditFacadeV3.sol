
pragma solidity 0.8.19;
interface ICreditFacadeV3 {
    function openCreditAccount(address onBehalfOf, MultiCall[] calldata calls, uint256 referralCode)
        external
        payable
        returns (address creditAccount);
}