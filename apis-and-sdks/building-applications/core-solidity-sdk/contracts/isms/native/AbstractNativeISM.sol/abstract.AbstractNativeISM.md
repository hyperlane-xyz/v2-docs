# AbstractNativeISM
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/isms/native/AbstractNativeISM.sol)

**Inherits:**
[IInterchainSecurityModule](/contracts/interfaces/IInterchainSecurityModule.sol/interface.IInterchainSecurityModule.md), Initializable

Uses the native bridges to verify interchain messages.

*In the future, the hook might be moved inside the Mailbox which doesn't require storage mappings for senders.
for more details see https://github.com/hyperlane-xyz/hyperlane-monorepo/issues/2381*


## State Variables
### verifiedMessageIds

```solidity
mapping(bytes32 => mapping(address => bool)) public verifiedMessageIds;
```


## Functions
### verify

Verify a message was received by ISM.


```solidity
function verify(bytes calldata, bytes calldata _message) external view returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes`||
|`_message`|`bytes`|Message to verify.|


## Events
### ReceivedMessage

```solidity
event ReceivedMessage(address indexed sender, bytes32 indexed messageId);
```

