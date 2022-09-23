// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

error CallNotSuccess(bytes data);

contract Force {
    uint256 public number = 1234;

    function pwn(address payable target) external payable {
        selfdestruct(target);
    }
}
