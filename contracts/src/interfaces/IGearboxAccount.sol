// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

// https://dev.gearbox.fi/credit/open
interface IGearboxAccount {
    event OpenCreditAccount(
        address indexed sender,
        address indexed onBehalfOf,
        address indexed creditAccount,
        uint256 amount,
        uint256 borrowAmount,
        uint256 referralCode
    );

    function openCreditAccount(
        uint256 amount,
        address onBehalfOf,
        uint16 leverageFactor,
        uint16 referralCode
    ) external payable;
}
