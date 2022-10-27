# What I Learn from this Ethernaut

If do it again I will use Foundry instead of Hardhat.
Because it very fast and useful when debug error with stack trace.

## Fallback
* Call smart contract directly with empty data it will trigger receive function.

## Fallout
* Don’t the wrong typo.

## Coin Flip
* Random onchain is a deterministic fix by using oracle like ChainLink.
* Even you can determine future value from block but you can’t use it stable with off-chain send tx like ethers it lack of stable time. You must use smart contract to calling smart contract is better when need to use global variable such as blockhash, block.number

## Telephone
* tx.orgin vs msg.sender; With msg.sender the owner can be a contract. With tx.origin the owner can never be a contract. 
* In a simple call chain `A->B->C->D`, inside D msg.sender will be C, and tx.origin will be A.

## Token
* Overflow and underflow can be dangerous in solidity before version 0.8 after this it build in check overflow and underflow no need to use safeMath.
* Sometimes simple code is like no bug but it bug!!! You need to look it closely in every line and treat as EVM to compile it. such as `require(balances[msg.sender] - _value >= 0);` . Don’t move _value to right side like this `require(balances[msg.sender] >= _value);` you must evaluate it directly not overthink. Must look it as uint256 - uint256 and find a loophole in it.
* Underflow doesn’t need to be 0 - 1 it can be 20 - 21 as well.


## Delegation

* Create call transaction data without knowing of abi from ethersjs. Noted: gas limit is need when it delegation call.

```js
const ABI = ["function pwn()"]

const iface = new ethers.utils.Interface(ABI)
const data = iface.encodeFunctionData("pwn")

const tx = await deployer.sendTransaction({
  to: targetAddress,
  data,
  gasLimit: 100000,
})
```

## Force
* Way to send ether to contract that without payable or receive function.
  1. Use `selfdestruct(address target)` to destroy contract and send eth to target address.
  2. Reward from node validator; PoS validators can choose where their issued rewards are sent - this issuance can't be refused by contracts.
  3. Send to contract before it exist.
  4. Send to contract that use solidity before 0.4 because `payable` introduced in version 0.4 and later.
* Not rely on `address(this).balance` for business logic but use `uint256 balance` to keep record instead.

## Vault
* `provider.getStorageAt(address, slotPosition)` use for get data from contact and layout is the same start 0 and next is 1 can get data event visibility is private. 

```js
const provider = new ethers.providers.JsonRpcProvider(
  process.env.GOERLI_RPC_URL
)
const targetAddress = "0x99A5EbD95B475BC1329faff1FeAaF97a725B6459"
const pwd = await provider.getStorageAt(targetAddress, 0)
```

## King

* Can send eth to selfdestruct contract.
* If want to break other people from call something you can use contract and just revert it when other contract try to interaction.

## Reentrace
* Always seen in many place.

## Evalator
- Sometime function names can be tricky. For Example,  `isLastFloor` looks like a view function but turns out it is not view function that make you read code and think it view function. With this narrative, you won’t find a solution because you think it view function not mutate state function.
- So carefully look at function state to look it as view or pure or have state mutable.
- `abi.encodeWithSignature("goTo(uint256)", floor)` must not use data type alias, `unit` , when encode because it will fail. Must use full like `uint256`

## Privacy
- Compact for optimization may store uint8, uint8, and uint16 and read it as a Little endian.  Because it read like this in memory 0x0000000000000000000000000000000000000000000000000000000090bfff0a 
- Cast bytes16 to bytes32 it will keep the most significant bit first 16 bytes.  

## Gatekeeper One
- uint64 to uint32 it will keep from least significant bit not most significant bit. 
- `gasleft()` is used to show how much gas remains it uses opcode `GAS` and `gasleft()` will return after `GAS` is called not before. You can track it with Remix. 

## Gatekeeper Two
- `xor` bitwise use `^` mean same digit is 0 different is 1.
- From `c = a ^ b`; If want to find `b`; `b = a ^ c` or `b = c^a`; just swap it and the order doesn’t matter.
- Check the length of the bit carefully sometimes if most significant bit is zero it will not show and length will reduce.
- Get contract size code with assembly `extcodesize(address)` It can return size is zero when **call from constructor contract**.
- `address(0xaabbcc)` returns address `0x0000000000000000000000000000000000AaBbCc`

## Preservation
- Immutable not live in storage layout. So when use with `delegatecall` it won’t count in storage.  So mapping storage between context and implementation will not map 1 - 1 it need to ship index by how many immutable you have.
- `constant` store in runtime bytecode and `immutable` as well. But `immutable` will come from creation code from the compiler and mapping to `immutable` value when construction time and return bytecode that reflect changed and return to store in blockchain.

## Recovery
- When encode with signature if function is `function destroy(address payable to) public {}` Just encode with `“destroy(address)”` no need to encode `payable`.

## MagicNumber
- OPCODE 6060604052 is mean PUSH1 bytes to stack with value 60 and PUSH1 bytes to stack with value 40 and MSTORE to first 40 bytes. Translate to normal is. PUSH1 opcode is 60. MSTORE opcode is 52.
- EVM store data in 3 place stack (PUSH), memory (MSTORE), disk (SSTORE).
- If you deploy only the return value without function, pure opcode, or Yul code, you can use any ABI function to call and the result will always return regardless of the function name.

## Alien Codex
- SHA3 and Keccak256 different is Keccak padding rule has change but internal security is the same like SHA3.
- How to get array data in solidity with ethers.js, It store with length array in storage slot and value come from `keccek(storageNumber) + index`.
- Find value in mapping it use `keccak256(key.concat(storageNumber))`
- Array, Struct, and Mapping in local variable default data location is storage. That is why need to type memory every time.
- You can use uint256 to access arbitrary memory space in solidity it ranges from 0 to 2 ** 256 - 1 and 32 bytes each. Way to access is `(2 ** 256 - 1) - uint256(referenceAddress) + 1` .
- **referenceAddress** is `keccak256(storageSlotNumber)` it case it is an array of bytes.
- `+1` use for overflow to move index to **storage slot 0**. If `+2` to **storage slot 1**. If `+3` to **storage slot 2** respectively.

## Denial
- `CALL` opcode can use gas 63/64 of remaining gas for external call.

## Shop
- `view` function, so when you call it, the code is just executed locally on one node and no transaction is added to the blockchain. This means it can't mutate any state.
- Interface cannot have constructor and state variable.
- How to read state variable from other contract inside contract, you need to create an interface view function for that variable. Because public state variable combine with 2 things state variable and external getter function.
- You can rely on state change to do logic stuff not only in your contract but in other contracts as well. It good for exploit but unsafe for develop thing.

## Dex
- TWAP in Uniswap can manipulate if it low on liquidity.
- Use constant sum formula can drain the pool to zero.

## Dex2
- `staticcall` for call without mutate state.
- If interacting with other contract it can do anything they want with same interface function name such as `balanceOf`, `transferFrom` . Don’t expect this function will do the same way as ERC20 does.
- Don’t narrow your thinking follow with name of function or Contract and treat it as normal behavior. Focus only if it can input address so it can be any contract and can do anything.

## Puzzle wallet
- When it allows to call other contract it can be calling to itself also.
- When calling to contract itself it not limit to call only other function but calling to function itself also. It is like reentrance in itself.
- Change state on what you can or have permission to do is more easy than you change state of other people. Such change balance of other people in `mapping(address ⇒ uint256) balances;`. So just focus on what you can do not other can do.
- Allocate the array for two dimensions.
```solidity
address[][] memory mintQuantity = new address[][](2);
mintQuantity[0] = new address[](3);
mintQuantity[1] = new address[](5);
mintQuantity[0][0] = address(0);
mintQuantity[1][0] = address(0);
```
- Cannot push in memory array or resize it. For dynamic memory array it must create with `new` keyword and precalculate size.
- `delegatecall`s keep the original `msg.value` as the same.

## Motorbike and UUPS
- No need to have admin proxy just add upgrade login inside implementation.
- Benefit is deploy cost cheap than Transparent upgradeable proxy.
- Downside is added complexity in implementation for upgrade logic and if you forget to add upgrade logic into implementation this proxy will no longer upgradeable any more.
- struct type does not acquire any slot except you declare a variable with that struct type and it read from storage like an array that uses `keccak(slotPosition) + index`.
- `selfdestruct` you need to call and let it mined so all current state will gone but if you calling `selfdestruct` then call other function with that state in same transaction the state still exists.
- If won’t found any entry point to attack contract try to access with the way normaly won’t access such if cannot find any exploit in proxy just go to make transaction on implementation.

## Good Samaritan
- If scan through code and found some loophole you can start with it don’t need to read the whole code line by line to understand it all, this improves speed to solve very much. But make sure to understand the big picture of what this contract does.
