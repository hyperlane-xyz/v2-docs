# CheckpointLib
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/libs/CheckpointLib.sol)


## Functions
### digest

Returns the digest validators are expected to sign when signing checkpoints.

*Message ID must match leaf content of checkpoint root at index.*


```solidity
function digest(
    uint32 _origin,
    bytes32 _originMailbox,
    bytes32 _checkpointRoot,
    uint32 _checkpointIndex,
    bytes32 _messageId
) internal pure returns (bytes32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_origin`|`uint32`|The origin domain of the checkpoint.|
|`_originMailbox`|`bytes32`|The address of the origin mailbox as bytes32.|
|`_checkpointRoot`|`bytes32`|The root of the checkpoint.|
|`_checkpointIndex`|`uint32`|The index of the checkpoint.|
|`_messageId`|`bytes32`|The message ID of the checkpoint.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes32`|The digest of the checkpoint.|


### domainHash

Returns the domain hash that validators are expected to use
when signing checkpoints.


```solidity
function domainHash(uint32 _origin, bytes32 _originMailbox) internal pure returns (bytes32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_origin`|`uint32`|The origin domain of the checkpoint.|
|`_originMailbox`|`bytes32`|The address of the origin mailbox as bytes32.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes32`|The domain hash.|


