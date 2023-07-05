# StaticMOfNAddressSetFactory
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/libs/StaticMOfNAddressSetFactory.sol)


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

### _deployImplementation


```solidity
function _deployImplementation() internal virtual returns (address);
```

### deploy

Deploys a StaticMOfNAddressSet contract address for the given
values

*Consider sorting addresses to ensure contract reuse*


```solidity
function deploy(address[] calldata _values, uint8 _threshold) external returns (address);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_values`|`address[]`|An array of addresses|
|`_threshold`|`uint8`|The threshold value to use|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|set The contract address representing this StaticMOfNAddressSet|


### getAddress

Returns the StaticMOfNAddressSet contract address for the given
values

*Consider sorting addresses to ensure contract reuse*


```solidity
function getAddress(address[] calldata _values, uint8 _threshold) external view returns (address);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_values`|`address[]`|An array of addresses|
|`_threshold`|`uint8`|The threshold value to use|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|set The contract address representing this StaticMOfNAddressSet|


### _getAddress

Returns the StaticMOfNAddressSet contract address for the given
values


```solidity
function _getAddress(bytes32 _salt, bytes memory _bytecode) private view returns (address);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_salt`|`bytes32`|The salt used in Create2|
|`_bytecode`|`bytes`|The metaproxy bytecode used in Create2|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|set The contract address representing this StaticMOfNAddressSet|


### _saltAndBytecode

Returns the create2 salt and bytecode for the given values


```solidity
function _saltAndBytecode(address[] calldata _values, uint8 _threshold) private view returns (bytes32, bytes memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_values`|`address[]`|An array of addresses|
|`_threshold`|`uint8`|The threshold value to use|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes32`|_salt The salt used in Create2|
|`<none>`|`bytes`|_bytecode The metaproxy bytecode used in Create2|


