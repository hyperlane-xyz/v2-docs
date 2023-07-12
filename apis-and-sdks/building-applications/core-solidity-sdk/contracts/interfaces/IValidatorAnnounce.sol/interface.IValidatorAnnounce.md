# IValidatorAnnounce
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/interfaces/IValidatorAnnounce.sol)


## Functions
### localDomain

Returns the local domain for validator announcements


```solidity
function localDomain() external view returns (uint32);
```

### mailbox

Returns the mailbox contract for validator announcements


```solidity
function mailbox() external view returns (address);
```

### getAnnouncedValidators

Returns a list of validators that have made announcements


```solidity
function getAnnouncedValidators() external view returns (address[] memory);
```

### getAnnouncedStorageLocations

Returns a list of all announced storage locations for `validators`


```solidity
function getAnnouncedStorageLocations(address[] calldata _validators) external view returns (string[][] memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_validators`|`address[]`|The list of validators to get storage locations for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string[][]`|A list of announced storage locations|


### announce

Announces a validator signature storage location


```solidity
function announce(address _validator, string calldata _storageLocation, bytes calldata _signature)
    external
    returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_validator`|`address`||
|`_storageLocation`|`string`|Information encoding the location of signed checkpoints|
|`_signature`|`bytes`|The signed validator announcement|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|True upon success|


