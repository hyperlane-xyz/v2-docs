# LegacyMultisigIsm
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/isms/multisig/LegacyMultisigIsm.sol)

**Inherits:**
[IMultisigIsm](/contracts/interfaces/isms/IMultisigIsm.sol/interface.IMultisigIsm.md), Ownable

Manages an ownable set of validators that ECDSA sign checkpoints to
reach a quorum.


## State Variables
### moduleType

```solidity
uint8 public constant moduleType = uint8(IInterchainSecurityModule.Types.LEGACY_MULTISIG);
```


### threshold
The validator threshold for each remote domain.


```solidity
mapping(uint32 => uint8) public threshold;
```


### validatorSet
The validator set for each remote domain.


```solidity
mapping(uint32 => EnumerableSet.AddressSet) private validatorSet;
```


### commitment
A succinct commitment to the validator set and threshold for each remote
domain.


```solidity
mapping(uint32 => bytes32) public commitment;
```


## Functions
### constructor


```solidity
constructor() Ownable;
```

### enrollValidators

Enrolls multiple validators into a validator set.

*Reverts if `_validator` is already in the validator set.*

*_validators[i] are the validators to enroll for _domains[i].*


```solidity
function enrollValidators(uint32[] calldata _domains, address[][] calldata _validators) external onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_domains`|`uint32[]`|The remote domains of the validator sets.|
|`_validators`|`address[][]`|The validators to add to the validator sets.|


### enrollValidator

Enrolls a validator into a validator set.

*Reverts if `_validator` is already in the validator set.*


```solidity
function enrollValidator(uint32 _domain, address _validator) external onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_domain`|`uint32`|The remote domain of the validator set.|
|`_validator`|`address`|The validator to add to the validator set.|


### unenrollValidator

Unenrolls a validator from a validator set.

*Reverts if `_validator` is not in the validator set.*


```solidity
function unenrollValidator(uint32 _domain, address _validator) external onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_domain`|`uint32`|The remote domain of the validator set.|
|`_validator`|`address`|The validator to remove from the validator set.|


### setThresholds

Sets the quorum threshold for multiple domains.


```solidity
function setThresholds(uint32[] calldata _domains, uint8[] calldata _thresholds) external onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_domains`|`uint32[]`|The remote domains of the validator sets.|
|`_thresholds`|`uint8[]`|The new quorum thresholds.|


### isEnrolled

Returns whether an address is enrolled in a validator set.


```solidity
function isEnrolled(uint32 _domain, address _address) external view returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_domain`|`uint32`|The remote domain of the validator set.|
|`_address`|`address`|The address to test for set membership.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|True if the address is enrolled, false otherwise.|


### setThreshold

Sets the quorum threshold.


```solidity
function setThreshold(uint32 _domain, uint8 _threshold) public onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_domain`|`uint32`|The remote domain of the validator set.|
|`_threshold`|`uint8`|The new quorum threshold.|


### verify

Verifies that a quorum of the origin domain's validators signed
a checkpoint, and verifies the merkle proof of `_message` against that
checkpoint.


```solidity
function verify(bytes calldata _metadata, bytes calldata _message) external view returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_metadata`|`bytes`|ABI encoded module metadata (see LegacyMultisigIsmMetadata.sol)|
|`_message`|`bytes`|Formatted Hyperlane message (see Message.sol).|


### validators

Gets the current validator set


```solidity
function validators(uint32 _domain) public view returns (address[] memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_domain`|`uint32`|The remote domain of the validator set.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address[]`|The addresses of the validator set.|


### validatorsAndThreshold

Returns the set of validators responsible for verifying _message
and the number of signatures required

*Can change based on the content of _message*


```solidity
function validatorsAndThreshold(bytes calldata _message) external view returns (address[] memory, uint8);
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


### validatorCount

Returns the number of validators enrolled in the validator set.


```solidity
function validatorCount(uint32 _domain) public view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_domain`|`uint32`|The remote domain of the validator set.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The number of validators enrolled in the validator set.|


### _enrollValidator

Enrolls a validator into a validator set.

*Reverts if `_validator` is already in the validator set.*


```solidity
function _enrollValidator(uint32 _domain, address _validator) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_domain`|`uint32`|The remote domain of the validator set.|
|`_validator`|`address`|The validator to add to the validator set.|


### _updateCommitment

Updates the commitment to the validator set for `_domain`.


```solidity
function _updateCommitment(uint32 _domain) internal returns (bytes32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_domain`|`uint32`|The remote domain of the validator set.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes32`|The commitment to the validator set for `_domain`.|


### _verifyMerkleProof

Verifies the merkle proof of `_message` against the provided
checkpoint.


```solidity
function _verifyMerkleProof(bytes calldata _metadata, bytes calldata _message) internal pure returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_metadata`|`bytes`|ABI encoded module metadata (see LegacyMultisigIsmMetadata.sol)|
|`_message`|`bytes`|Formatted Hyperlane message (see Message.sol).|


### _verifyValidatorSignatures

Verifies that a quorum of the origin domain's validators signed
the provided checkpoint.


```solidity
function _verifyValidatorSignatures(bytes calldata _metadata, bytes calldata _message) internal view returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_metadata`|`bytes`|ABI encoded module metadata (see LegacyMultisigIsmMetadata.sol)|
|`_message`|`bytes`|Formatted Hyperlane message (see Message.sol).|


## Events
### ValidatorEnrolled
Emitted when a validator is enrolled in a validator set.


```solidity
event ValidatorEnrolled(uint32 indexed domain, address indexed validator, uint256 validatorCount);
```

### ValidatorUnenrolled
Emitted when a validator is unenrolled from a validator set.


```solidity
event ValidatorUnenrolled(uint32 indexed domain, address indexed validator, uint256 validatorCount);
```

### ThresholdSet
Emitted when the quorum threshold is set.


```solidity
event ThresholdSet(uint32 indexed domain, uint8 threshold);
```

### CommitmentUpdated
Emitted when the validator set or threshold changes.


```solidity
event CommitmentUpdated(uint32 domain, bytes32 commitment);
```

