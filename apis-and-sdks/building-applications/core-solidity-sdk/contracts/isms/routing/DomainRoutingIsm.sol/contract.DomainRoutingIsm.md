# DomainRoutingIsm
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/isms/routing/DomainRoutingIsm.sol)

**Inherits:**
[AbstractRoutingIsm](/contracts/isms/routing/AbstractRoutingIsm.sol/abstract.AbstractRoutingIsm.md), OwnableUpgradeable


## State Variables
### modules

```solidity
mapping(uint32 => IInterchainSecurityModule) public modules;
```


## Functions
### initialize


```solidity
function initialize(address _owner) public initializer;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_owner`|`address`|The owner of the contract.|


### initialize

Sets the ISMs to be used for the specified origin domains


```solidity
function initialize(address _owner, uint32[] calldata _domains, IInterchainSecurityModule[] calldata _modules)
    public
    initializer;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_owner`|`address`|The owner of the contract.|
|`_domains`|`uint32[]`|The origin domains|
|`_modules`|`IInterchainSecurityModule[]`|The ISMs to use to verify messages|


### set

Sets the ISM to be used for the specified origin domain


```solidity
function set(uint32 _domain, IInterchainSecurityModule _module) external onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_domain`|`uint32`|The origin domain|
|`_module`|`IInterchainSecurityModule`|The ISM to use to verify messages|


### route

Returns the ISM responsible for verifying _message

*Can change based on the content of _message*


```solidity
function route(bytes calldata _message) public view virtual override returns (IInterchainSecurityModule);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_message`|`bytes`|Formatted Hyperlane message (see Message.sol).|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`IInterchainSecurityModule`|module The ISM to use to verify _message|


### _set

Sets the ISM to be used for the specified origin domain


```solidity
function _set(uint32 _domain, IInterchainSecurityModule _module) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_domain`|`uint32`|The origin domain|
|`_module`|`IInterchainSecurityModule`|The ISM to use to verify messages|


## Events
### ModuleSet
Emitted when a module is set for a domain


```solidity
event ModuleSet(uint32 indexed domain, IInterchainSecurityModule module);
```

