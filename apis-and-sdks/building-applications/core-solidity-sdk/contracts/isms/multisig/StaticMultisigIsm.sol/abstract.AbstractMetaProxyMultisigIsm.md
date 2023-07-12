# AbstractMetaProxyMultisigIsm
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/isms/multisig/StaticMultisigIsm.sol)

**Inherits:**
[AbstractMultisigIsm](/contracts/isms/multisig/AbstractMultisigIsm.sol/abstract.AbstractMultisigIsm.md)

Manages per-domain m-of-n Validator set that is used
to verify interchain messages.


## Functions
### validatorsAndThreshold

Returns the set of validators responsible for verifying _message
and the number of signatures required

*Can change based on the content of _message*


```solidity
function validatorsAndThreshold(bytes calldata) public pure override returns (address[] memory, uint8);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address[]`|validators The array of validator addresses|
|`<none>`|`uint8`|threshold The number of validator signatures needed|


