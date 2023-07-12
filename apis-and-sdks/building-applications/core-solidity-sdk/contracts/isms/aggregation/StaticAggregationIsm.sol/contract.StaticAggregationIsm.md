# StaticAggregationIsm
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/isms/aggregation/StaticAggregationIsm.sol)

**Inherits:**
[AbstractAggregationIsm](/contracts/isms/aggregation/AbstractAggregationIsm.sol/abstract.AbstractAggregationIsm.md)

Manages per-domain m-of-n ISM sets that are used to verify
interchain messages.


## Functions
### modulesAndThreshold

Returns the set of ISMs responsible for verifying _message
and the number of ISMs that must verify

*Can change based on the content of _message*


```solidity
function modulesAndThreshold(bytes calldata) public view virtual override returns (address[] memory, uint8);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address[]`|modules The array of ISM addresses|
|`<none>`|`uint8`|threshold The number of ISMs needed to verify|


