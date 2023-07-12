# IAggregationIsm
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/interfaces/isms/IAggregationIsm.sol)

**Inherits:**
[IInterchainSecurityModule](/contracts/interfaces/IInterchainSecurityModule.sol/interface.IInterchainSecurityModule.md)


## Functions
### modulesAndThreshold

Returns the set of modules responsible for verifying _message
and the number of modules that must verify

*Can change based on the content of _message*


```solidity
function modulesAndThreshold(bytes calldata _message)
    external
    view
    returns (address[] memory modules, uint8 threshold);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_message`|`bytes`|Hyperlane formatted interchain message|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`modules`|`address[]`|The array of ISM addresses|
|`threshold`|`uint8`|The number of modules needed to verify|


