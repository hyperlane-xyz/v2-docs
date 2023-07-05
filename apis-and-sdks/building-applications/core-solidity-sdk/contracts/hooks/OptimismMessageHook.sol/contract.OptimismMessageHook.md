# OptimismMessageHook
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/hooks/OptimismMessageHook.sol)

**Inherits:**
[IMessageHook](/contracts/interfaces/hooks/IMessageHook.sol/interface.IMessageHook.md)

Message hook to inform the Optimism ISM of messages published through
the native Optimism bridge.


## State Variables
### destinationDomain

```solidity
uint32 public immutable destinationDomain;
```


### l1Messenger

```solidity
ICrossDomainMessenger public immutable l1Messenger;
```


### ism

```solidity
address public immutable ism;
```


### GAS_LIMIT

```solidity
uint32 internal constant GAS_LIMIT = 1_920_000;
```


## Functions
### constructor


```solidity
constructor(uint32 _destinationDomain, address _messenger, address _ism);
```

### postDispatch

Hook to inform the optimism ISM of messages published through.

*anyone can call this function, that's why we need to send msg.sender*


```solidity
function postDispatch(uint32 _destination, bytes32 _messageId) public payable override returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_destination`|`uint32`|The destination domain of the message.|
|`_messageId`|`bytes32`|The message ID.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|gasOverhead The gas overhead for the function call on L2.|


