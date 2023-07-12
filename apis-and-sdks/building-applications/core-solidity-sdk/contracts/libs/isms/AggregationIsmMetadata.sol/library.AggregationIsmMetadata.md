# AggregationIsmMetadata
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/libs/isms/AggregationIsmMetadata.sol)

Format of metadata:
[????:????] Metadata start/end uint32 ranges, packed as uint64
[????:????] ISM metadata, packed encoding


## State Variables
### RANGE_SIZE

```solidity
uint256 private constant RANGE_SIZE = 4;
```


## Functions
### hasMetadata

Returns whether or not metadata was provided for the ISM at
`_index`

*Callers must ensure _index is less than the number of metadatas
provided*


```solidity
function hasMetadata(bytes calldata _metadata, uint8 _index) internal pure returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_metadata`|`bytes`|Encoded Aggregation ISM metadata|
|`_index`|`uint8`|The index of the ISM to check for metadata for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|Whether or not metadata was provided for the ISM at `_index`|


### metadataAt

Returns the metadata provided for the ISM at `_index`

*Callers must ensure _index is less than the number of metadatas
provided*

*Callers must ensure `hasMetadata(_metadata, _index)`*


```solidity
function metadataAt(bytes calldata _metadata, uint8 _index) internal pure returns (bytes calldata);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_metadata`|`bytes`|Encoded Aggregation ISM metadata|
|`_index`|`uint8`|The index of the ISM to return metadata for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes`|The metadata provided for the ISM at `_index`|


### _metadataRange

Returns the range of the metadata provided for the ISM at
`_index`, or zeroes if not provided

*Callers must ensure _index is less than the number of metadatas
provided*


```solidity
function _metadataRange(bytes calldata _metadata, uint8 _index) private pure returns (uint32, uint32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_metadata`|`bytes`|Encoded Aggregation ISM metadata|
|`_index`|`uint8`|The index of the ISM to return metadata range for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint32`|The range of the metadata provided for the ISM at `_index`, or zeroes if not provided|
|`<none>`|`uint32`||


