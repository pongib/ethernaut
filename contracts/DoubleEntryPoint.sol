// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// import "forge-std/console.sol";

error CallNotSuccess();

interface ITarget {
    function setDetectionBot(address detectionBotAddress) external;

    function notify(address user, bytes calldata msgData) external;

    function raiseAlert(address user) external;

    function cryptoVault() external view returns (address);

    function delegatedFrom() external view returns (address);

    function forta() external view returns (address);

    function underlying() external view returns (address);

    function delegate() external view returns (address);

    function player() external view returns (address);

    function sweepToken(address token) external;
}

contract DoubleEntryPoint {
    ITarget private target;
    address private forta;
    address private underlying;
    address private vault;
    address private legacyToken;
    address private player;

    function pwn(address targetAddress) public {
        target = ITarget(targetAddress);
        player = msg.sender;

        underlying = address(target);
        vault = target.cryptoVault();
        legacyToken = target.delegatedFrom();
        forta = target.forta();
    }

    // register with setDectectionBot
    // check it from underlying token
    // check is come from vault
    // if yes call raiseAlert
    function handleTransaction(address user, bytes calldata msgData) public {
        (address to, uint256 amount, address originSender) = abi.decode(
            msgData[4:], // slice first 4 bytes for decode msg.data
            (address, uint256, address)
        );

        if (originSender == vault) {
            ITarget(forta).raiseAlert(player);
        }
    }
}
