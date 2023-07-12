# AbstractMerkleRootMultisigIsm
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/isms/multisig/AbstractMerkleRootMultisigIsm.sol)

**Inherits:**
[AbstractMultisigIsm](/contracts/isms/multisig/AbstractMultisigIsm.sol/abstract.AbstractMultisigIsm.md)

This ISM allows using a newer signed checkpoint (say #33) to prove existence of an older message (#22) in the validators' MerkleTree.
This guarantees censorship resistance as validators cannot hide a message
by refusing to sign its checkpoint but later signing a checkpoint for a newer message.
If validators decide to censor a message, they are left with only one option — to not produce checkpoints at all.
Otherwise, the very next signed checkpoint (#33) can be used by any relayer to prove the previous message inclusion using this ISM.
This is censorship resistance is missing in the sibling implementation `AbstractMessageIdMultisigIsm`,
since it can only verify messages having the corresponding checkpoints.

*Provides the default implementation of verifying signatures over a checkpoint and the message inclusion in that checkpoint.
This abstract contract can be overridden for customizing the `validatorsAndThreshold()` (static or dynamic).*

*May be adapted in future to support batch message verification against a single root.*


## State Variables
### moduleType

```solidity
uint8 public constant moduleType = uint8(IInterchainSecurityModule.Types.MERKLE_ROOT_MULTISIG);
```


## Functions
### digest

Returns the digest to be used for signature verification.


```solidity
function digest(bytes calldata _metadata, bytes calldata _message) internal pure override returns (bytes32);
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
function signatureAt(bytes calldata _metadata, uint256 _index)
    internal
    pure
    virtual
    override
    returns (bytes memory signature);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_metadata`|`bytes`|ABI encoded module metadata|
|`_index`|`uint256`|The index of the signature to return|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`signature`|`bytes`|Packed encoding of signature (65 bytes)|


