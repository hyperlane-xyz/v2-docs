# MerkleRootMultisigIsmMetadata
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/libs/isms/MerkleRootMultisigIsmMetadata.sol)

Format of metadata:
[   0:  32] Origin mailbox address
[  32:  36] Signed checkpoint index
[  36:  68] Signed checkpoint message ID
[  68:1092] Merkle proof
[1092:????] Validator signatures (length := threshold * 65)


## State Variables
### ORIGIN_MAILBOX_OFFSET

```solidity
uint8 private constant ORIGIN_MAILBOX_OFFSET = 0;
```


### CHECKPOINT_INDEX_OFFSET

```solidity
uint8 private constant CHECKPOINT_INDEX_OFFSET = 32;
```


### CHECKPOINT_MESSAGE_ID_OFFSET

```solidity
uint8 private constant CHECKPOINT_MESSAGE_ID_OFFSET = 36;
```


### MERKLE_PROOF_OFFSET

```solidity
uint8 private constant MERKLE_PROOF_OFFSET = 68;
```


### MERKLE_PROOF_LENGTH

```solidity
uint16 private constant MERKLE_PROOF_LENGTH = 32 * 32;
```


### SIGNATURES_OFFSET

```solidity
uint16 private constant SIGNATURES_OFFSET = 1092;
```


### SIGNATURE_LENGTH

```solidity
uint8 private constant SIGNATURE_LENGTH = 65;
```


## Functions
### originMailbox

Returns the origin mailbox of the signed checkpoint as bytes32.


```solidity
function originMailbox(bytes calldata _metadata) internal pure returns (bytes32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_metadata`|`bytes`|ABI encoded Multisig ISM metadata.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes32`|Origin mailbox of the signed checkpoint as bytes32|


### index

Returns the index of the signed checkpoint.


```solidity
function index(bytes calldata _metadata) internal pure returns (uint32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_metadata`|`bytes`|ABI encoded Multisig ISM metadata.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint32`|Index of the signed checkpoint|


### messageId

Returns the message ID of the signed checkpoint.


```solidity
function messageId(bytes calldata _metadata) internal pure returns (bytes32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_metadata`|`bytes`|ABI encoded Multisig ISM metadata.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes32`|Message ID of the signed checkpoint|


### proof

Returns the merkle proof branch of the message.

*This appears to be more gas efficient than returning a calldata
slice and using that.*


```solidity
function proof(bytes calldata _metadata) internal pure returns (bytes32[32] memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_metadata`|`bytes`|ABI encoded Multisig ISM metadata.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes32[32]`|Merkle proof branch of the message.|


### signatureAt

Returns the validator ECDSA signature at `_index`.

*Assumes signatures are sorted by validator*

*Assumes `_metadata` encodes `threshold` signatures.*

*Assumes `_index` is less than `threshold`*


```solidity
function signatureAt(bytes calldata _metadata, uint256 _index) internal pure returns (bytes calldata);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_metadata`|`bytes`|ABI encoded Multisig ISM metadata.|
|`_index`|`uint256`|The index of the signature to return.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes`|The validator ECDSA signature at `_index`.|


