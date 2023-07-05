# AbstractAggregationIsm
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/isms/aggregation/AbstractAggregationIsm.sol)

**Inherits:**
[IAggregationIsm](/contracts/interfaces/isms/IAggregationIsm.sol/interface.IAggregationIsm.md)

Manages per-domain m-of-n ISM sets that are used to verify
interchain messages.


## State Variables
### moduleType

```solidity
uint8 public constant moduleType = uint8(IInterchainSecurityModule.Types.AGGREGATION);
```


## Functions
### modulesAndThreshold

Returns the set of ISMs responsible for verifying _message
and the number of ISMs that must verify

*Can change based on the content of _message*


```solidity
function modulesAndThreshold(bytes calldata _message) public view virtual returns (address[] memory, uint8);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_message`|`bytes`|Hyperlane formatted interchain message|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address[]`|modules The array of ISM addresses|
|`<none>`|`uint8`|threshold The number of ISMs needed to verify|


### verify

Requires that m-of-n ISMs verify the provided interchain message.


```solidity
function verify(bytes calldata _metadata, bytes calldata _message) public returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_metadata`|`bytes`|ABI encoded module metadata (see AggregationIsmMetadata.sol)|
|`_message`|`bytes`|Formatted Hyperlane message (see Message.sol).|


