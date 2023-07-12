# InterchainAccountMessage
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/libs/middleware/InterchainAccountMessage.sol)

Format of message:
[   0:  32] ICA owner
[  32:  64] ICA ISM
[  64:????] Calls, abi encoded


## Functions
### encode

Returns formatted (packed) InterchainAccountMessage

*This function should only be used in memory message construction.*


```solidity
function encode(address _owner, bytes32 _ism, address _to, uint256 _value, bytes memory _data)
    internal
    pure
    returns (bytes memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_owner`|`address`|The owner of the interchain account|
|`_ism`|`bytes32`|The address of the remote ISM|
|`_to`|`address`|The address of the contract to call|
|`_value`|`uint256`|The value to include in the call|
|`_data`|`bytes`|The calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes`|Formatted message body|


### encode

Returns formatted (packed) InterchainAccountMessage

*This function should only be used in memory message construction.*


```solidity
function encode(bytes32 _owner, bytes32 _ism, CallLib.Call[] calldata _calls) internal pure returns (bytes memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_owner`|`bytes32`|The owner of the interchain account|
|`_ism`|`bytes32`|The address of the remote ISM|
|`_calls`|`CallLib.Call[]`|The sequence of calls to make|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes`|Formatted message body|


### encode

Returns formatted (packed) InterchainAccountMessage

*This function should only be used in memory message construction.*


```solidity
function encode(address _owner, bytes32 _ism, CallLib.Call[] calldata _calls) internal pure returns (bytes memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_owner`|`address`|The owner of the interchain account|
|`_ism`|`bytes32`|The address of the remote ISM|
|`_calls`|`CallLib.Call[]`|The sequence of calls to make|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes`|Formatted message body|


### decode

Parses and returns the calls from the provided message


```solidity
function decode(bytes calldata _message) internal pure returns (bytes32, bytes32, CallLib.Call[] memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_message`|`bytes`|The interchain account message|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes32`|The array of calls|
|`<none>`|`bytes32`||
|`<none>`|`CallLib.Call[]`||


### ism

Parses and returns the ISM address from the provided message


```solidity
function ism(bytes calldata _message) internal pure returns (address);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_message`|`bytes`|The interchain account message|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The ISM encoded in the message|


