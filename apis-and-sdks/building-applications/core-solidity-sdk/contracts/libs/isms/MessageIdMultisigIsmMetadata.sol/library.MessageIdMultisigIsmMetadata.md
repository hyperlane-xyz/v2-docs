# MessageIdMultisigIsmMetadata
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/libs/isms/MessageIdMultisigIsmMetadata.sol)

Format of metadata:
[   0:  32] Origin mailbox address
[  32:  64] Signed checkpoint root
[  64:????] Validator signatures (length := threshold * 65)


## State Variables
### ORIGIN_MAILBOX_OFFSET

```solidity
uint8 private constant ORIGIN_MAILBOX_OFFSET = 0;
```


### MERKLE_ROOT_OFFSET

```solidity
uint8 private constant MERKLE_ROOT_OFFSET = 32;
```


### SIGNATURES_OFFSET

```solidity
uint8 private constant SIGNATURES_OFFSET = 64;
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


### root

Returns the merkle root of the signed checkpoint.


```solidity
function root(bytes calldata _metadata) internal pure returns (bytes32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_metadata`|`bytes`|ABI encoded Multisig ISM metadata.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes32`|Merkle root of the signed checkpoint|


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


