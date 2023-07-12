# InterchainQueryMessage
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/libs/middleware/InterchainQueryMessage.sol)

Format of message:
[   0: 32] Sender address
[  32: 64] Message type (left padded with zeroes)
[  64:???] Encoded call array


## State Variables
### SENDER_OFFSET

```solidity
uint256 private constant SENDER_OFFSET = 0;
```


### TYPE_OFFSET

```solidity
uint256 private constant TYPE_OFFSET = 32;
```


### CALLS_OFFSET

```solidity
uint256 private constant CALLS_OFFSET = 64;
```


## Functions
### sender

Parses and returns the query sender from the provided message


```solidity
function sender(bytes calldata _message) internal pure returns (bytes32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_message`|`bytes`|The interchain query message|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes32`|The query sender as bytes32|


### messageType

Parses and returns the message type from the provided message


```solidity
function messageType(bytes calldata _message) internal pure returns (MessageType);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_message`|`bytes`|The interchain query message|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`MessageType`|The message type (query or response)|


### encode

Returns formatted InterchainQueryMessage, type == QUERY


```solidity
function encode(bytes32 _sender, CallLib.StaticCallWithCallback[] calldata _calls)
    internal
    pure
    returns (bytes memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_sender`|`bytes32`|The query sender as bytes32|
|`_calls`|`CallLib.StaticCallWithCallback[]`|The sequence of queries to make, with the corresponding response callbacks|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes`|Formatted message body|


### encode

Returns formatted InterchainQueryMessage, type == QUERY


```solidity
function encode(bytes32 _sender, address _to, bytes memory _data, bytes memory _callback)
    internal
    pure
    returns (bytes memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_sender`|`bytes32`|The query sender as bytes32|
|`_to`|`address`|The address of the contract to query|
|`_data`|`bytes`|The calldata encoding the query|
|`_callback`|`bytes`|The calldata of the callback that will be made on the sender. The return value of the query will be appended.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes`|Formatted message body|


### callsWithCallbacks

Parses and returns the calls and callbacks from the message


```solidity
function callsWithCallbacks(bytes calldata _message)
    internal
    pure
    returns (CallLib.StaticCallWithCallback[] memory _calls);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_message`|`bytes`|The interchain query message, type == QUERY|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_calls`|`CallLib.StaticCallWithCallback[]`|The sequence of queries to make with the corresponding response callbacks|


### encode

Returns formatted InterchainQueryMessage, type == RESPONSE


```solidity
function encode(bytes32 _sender, bytes[] memory _calls) internal pure returns (bytes memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_sender`|`bytes32`|The query sender as bytes32|
|`_calls`|`bytes[]`|The sequence of callbacks to make|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes`|Formatted message body|


### rawCalls

Parses and returns the callbacks from the message


```solidity
function rawCalls(bytes calldata _message) internal pure returns (bytes[] memory _calls);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_message`|`bytes`|The interchain query message, type == RESPONSE|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_calls`|`bytes[]`|The sequence of callbacks to make|


## Enums
### MessageType

```solidity
enum MessageType {
    QUERY,
    RESPONSE
}
```

