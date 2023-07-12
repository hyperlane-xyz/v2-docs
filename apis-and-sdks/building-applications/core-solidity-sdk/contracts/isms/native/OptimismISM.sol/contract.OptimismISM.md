# OptimismISM
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/isms/native/OptimismISM.sol)

**Inherits:**
CrossChainEnabledOptimism, [AbstractNativeISM](/contracts/isms/native/AbstractNativeISM.sol/abstract.AbstractNativeISM.md)

Uses the native Optimism bridge to verify interchain messages.


## State Variables
### moduleType

```solidity
uint8 public constant moduleType = uint8(IInterchainSecurityModule.Types.NULL);
```


### l1Hook

```solidity
address public l1Hook;
```


## Functions
### isAuthorized

Check if sender is authorized to message `verifyMessageId`.


```solidity
modifier isAuthorized();
```

### constructor


```solidity
constructor(address _l2Messenger) CrossChainEnabledOptimism(_l2Messenger);
```

### setOptimismHook


```solidity
function setOptimismHook(address _l1Hook) external initializer;
```

### verifyMessageId

Receive a message from the L2 messenger.

*Only callable by the L2 messenger.*


```solidity
function verifyMessageId(address _sender, bytes32 _messageId) external isAuthorized;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_sender`|`address`|Address of the sender.|
|`_messageId`|`bytes32`|Hyperlane ID for the message.|


