# DomainRoutingIsmFactory
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/isms/routing/DomainRoutingIsmFactory.sol)


## State Variables
### _implementation

```solidity
address private immutable _implementation;
```


## Functions
### constructor


```solidity
constructor();
```

### deploy

Deploys and initializes a DomainRoutingIsm using a minimal proxy


```solidity
function deploy(uint32[] calldata _domains, IInterchainSecurityModule[] calldata _modules)
    external
    returns (DomainRoutingIsm);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_domains`|`uint32[]`|The origin domains|
|`_modules`|`IInterchainSecurityModule[]`|The ISMs to use to verify messages|


## Events
### ModuleDeployed
Emitted when a routing module is deployed


```solidity
event ModuleDeployed(DomainRoutingIsm module);
```

