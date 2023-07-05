# AbstractMessageIdMultisigIsm
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/isms/multisig/AbstractMessageIdMultisigIsm.sol)

**Inherits:**
[AbstractMultisigIsm](/contracts/isms/multisig/AbstractMultisigIsm.sol/abstract.AbstractMultisigIsm.md)

This ISM minimizes gas/performance overhead of the checkpoints verification by compromising on the censorship resistance.
For censorship resistance consider using `AbstractMerkleRootMultisigIsm`.
If the validators (`validatorsAndThreshold`) skip messages by not sign checkpoints for them,
the relayers will not be able to aggregate a quorum of signatures sufficient to deliver these messages via this ISM.
Integrations are free to choose the trade-off between the censorship resistance and the gas/processing overhead.

*Provides the default implementation of verifying signatures over a checkpoint related to a specific message ID.
This abstract contract can be customized to change the `validatorsAndThreshold()` (static or dynamic).*


## State Variables
### moduleType

```solidity
uint8 public constant moduleType = uint8(IInterchainSecurityModule.Types.MESSAGE_ID_MULTISIG);
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
function signatureAt(bytes calldata _metadata, uint256 _index) internal pure virtual override returns (bytes memory);
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


