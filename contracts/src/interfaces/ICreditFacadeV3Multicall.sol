pragma solidity 0.8.19;

interface ICreditFacadeV3Multicall {
    function increaseDebt(uint256 amount) external;
    function addCollateral(address token, uint256 amount) external;
}