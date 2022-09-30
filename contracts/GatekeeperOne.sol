// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

error CallNotSuccess();

contract GatekeeperOne {
    function pwn(address target, bytes8 gateKey) public {
        (bool success, ) = target.call(
            abi.encodeWithSignature("enter(bytes8)", gateKey)
        );
        if (!success) revert CallNotSuccess();
    }
}
