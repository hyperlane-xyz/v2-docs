# ValidatorAnnounce
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/ValidatorAnnounce.sol)

**Inherits:**
[IValidatorAnnounce](/contracts/interfaces/IValidatorAnnounce.sol/interface.IValidatorAnnounce.md)

Stores the location(s) of validator signed checkpoints


## State Variables
### mailbox

```solidity
address public immutable mailbox;
```


### localDomain

```solidity
uint32 public immutable localDomain;
```


### validators

```solidity
EnumerableSet.AddressSet private validators;
```


### storageLocations

```solidity
mapping(address => string[]) private storageLocations;
```


### replayProtection

```solidity
mapping(bytes32 => bool) private replayProtection;
```


## Functions
### constructor


```solidity
constructor(address _mailbox);
```

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


### getAnnouncedStorageLocations

Returns a list of all announced storage locations


```solidity
function getAnnouncedStorageLocations(address[] calldata _validators) external view returns (string[][] memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_validators`|`address[]`|The list of validators to get registrations for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string[][]`|A list of registered storage metadata|


### getAnnouncedValidators

Returns a list of validators that have made announcements


```solidity
function getAnnouncedValidators() external view returns (address[] memory);
```

## Events
### ValidatorAnnouncement
Emitted when a new validator announcement is made


```solidity
event ValidatorAnnouncement(address indexed validator, string storageLocation);
```

