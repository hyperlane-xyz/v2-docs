# AbstractMultisigIsm
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/isms/multisig/AbstractMultisigIsm.sol)

**Inherits:**
[IMultisigIsm](/contracts/interfaces/isms/IMultisigIsm.sol/interface.IMultisigIsm.md)

Manages per-domain m-of-n Validator sets that are used to verify
interchain messages.

*See ./AbstractMerkleRootMultisigIsm.sol and ./AbstractMessageIdMultisigIsm.sol
for concrete implementations of `digest` and `signatureAt`.*

*See ./StaticMultisigIsm.sol for concrete implementations.*


## Functions
### validatorsAndThreshold

Returns the set of validators responsible for verifying _message
and the number of signatures required

*Can change based on the content of _message*


```solidity
function validatorsAndThreshold(bytes calldata _message) public view virtual returns (address[] memory, uint8);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_message`|`bytes`|Hyperlane formatted interchain message|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address[]`|validators The array of validator addresses|
|`<none>`|`uint8`|threshold The number of validator signatures needed|


### digest

Returns the digest to be used for signature verification.


```solidity
function digest(bytes calldata _metadata, bytes calldata _message) internal view virtual returns (bytes32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_metadata`|`bytes`|ABI encoded module metadata|
|`_message`|`bytes`|Formatted Hyperlane message (see Message.sol).|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes32`|digest The digest to be signed by validators|


### signatureAt

Returns the signature at a given index from the metadata.


```solidity
function signatureAt(bytes calldata _metadata, uint256 _index) internal pure virtual returns (bytes memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_metadata`|`bytes`|ABI encoded module metadata|
|`_index`|`uint256`|The index of the signature to return|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes`|signature Packed encoding of signature (65 bytes)|


### verify

Requires that m-of-n validators verify a merkle root,
and verifies a me∑rkle proof of `_message` against that root.


```solidity
function verify(bytes calldata _metadata, bytes calldata _message) public view returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_metadata`|`bytes`|ABI encoded module metadata|
|`_message`|`bytes`|Formatted Hyperlane message (see Message.sol).|


