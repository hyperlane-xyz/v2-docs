# IMultisigIsm
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/interfaces/isms/IMultisigIsm.sol)

**Inherits:**
[IInterchainSecurityModule](/contracts/interfaces/IInterchainSecurityModule.sol/interface.IInterchainSecurityModule.md)


## Functions
### validatorsAndThreshold

Returns the set of validators responsible for verifying _message
and the number of signatures required

*Can change based on the content of _message*


```solidity
function validatorsAndThreshold(bytes calldata _message)
    external
    view
    returns (address[] memory validators, uint8 threshold);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_message`|`bytes`|Hyperlane formatted interchain message|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`validators`|`address[]`|The array of validator addresses|
|`threshold`|`uint8`|The number of validator signatures needed|


