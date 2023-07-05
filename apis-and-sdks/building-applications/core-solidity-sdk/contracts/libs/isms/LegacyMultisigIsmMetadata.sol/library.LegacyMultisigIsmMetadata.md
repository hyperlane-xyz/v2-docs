# LegacyMultisigIsmMetadata
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/libs/isms/LegacyMultisigIsmMetadata.sol)

Format of metadata:
[   0:  32] Merkle root
[  32:  36] Root index
[  36:  68] Origin mailbox address
[  68:1092] Merkle proof
[1092:1093] Threshold
[1093:????] Validator signatures, 65 bytes each, length == Threshold
[????:????] Addresses of the entire validator set, left padded to bytes32


## State Variables
### MERKLE_ROOT_OFFSET

```solidity
uint256 private constant MERKLE_ROOT_OFFSET = 0;
```


### MERKLE_INDEX_OFFSET

```solidity
uint256 private constant MERKLE_INDEX_OFFSET = 32;
```


### ORIGIN_MAILBOX_OFFSET

```solidity
uint256 private constant ORIGIN_MAILBOX_OFFSET = 36;
```


### MERKLE_PROOF_OFFSET

```solidity
uint256 private constant MERKLE_PROOF_OFFSET = 68;
```


### THRESHOLD_OFFSET

```solidity
uint256 private constant THRESHOLD_OFFSET = 1092;
```


### SIGNATURES_OFFSET

```solidity
uint256 private constant SIGNATURES_OFFSET = 1093;
```


### SIGNATURE_LENGTH

```solidity
uint256 private constant SIGNATURE_LENGTH = 65;
```


## Functions
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


### threshold

Returns the number of required signatures. Verified against
the commitment stored in the module.


```solidity
function threshold(bytes calldata _metadata) internal pure returns (uint8);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_metadata`|`bytes`|ABI encoded Multisig ISM metadata.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint8`|The number of required signatures.|


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


### validatorAt

Returns the validator address at `_index`.

*Assumes `_index` is less than the number of validators*


```solidity
function validatorAt(bytes calldata _metadata, uint256 _index) internal pure returns (address);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_metadata`|`bytes`|ABI encoded Multisig ISM metadata.|
|`_index`|`uint256`|The index of the validator to return.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The validator address at `_index`.|


### validators

Returns the validator set encoded as bytes. Verified against the
commitment stored in the module.

*Validator addresses are encoded as tightly packed array of bytes32,
sorted to match the enumerable set stored by the module.*


```solidity
function validators(bytes calldata _metadata) internal pure returns (bytes calldata);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_metadata`|`bytes`|ABI encoded Multisig ISM metadata.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes`|The validator set encoded as bytes.|


### validatorCount

Returns the size of the validator set encoded in the metadata

*Validator addresses are encoded as tightly packed array of bytes32,
sorted to match the enumerable set stored by the module.*


```solidity
function validatorCount(bytes calldata _metadata) internal pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_metadata`|`bytes`|ABI encoded Multisig ISM metadata.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The size of the validator set encoded in the metadata|


### _validatorsOffset

Returns the offset in bytes of the list of validators within
`_metadata`.


```solidity
function _validatorsOffset(bytes calldata _metadata) private pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_metadata`|`bytes`|ABI encoded Multisig ISM metadata.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The index at which the list of validators starts|


