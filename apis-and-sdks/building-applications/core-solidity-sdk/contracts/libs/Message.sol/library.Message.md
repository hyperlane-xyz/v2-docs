# Message
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/libs/Message.sol)

Library for formatted messages used by Mailbox


## State Variables
### VERSION_OFFSET

```solidity
uint256 private constant VERSION_OFFSET = 0;
```


### NONCE_OFFSET

```solidity
uint256 private constant NONCE_OFFSET = 1;
```


### ORIGIN_OFFSET

```solidity
uint256 private constant ORIGIN_OFFSET = 5;
```


### SENDER_OFFSET

```solidity
uint256 private constant SENDER_OFFSET = 9;
```


### DESTINATION_OFFSET

```solidity
uint256 private constant DESTINATION_OFFSET = 41;
```


### RECIPIENT_OFFSET

```solidity
uint256 private constant RECIPIENT_OFFSET = 45;
```


### BODY_OFFSET

```solidity
uint256 private constant BODY_OFFSET = 77;
```


## Functions
### formatMessage

Returns formatted (packed) Hyperlane message with provided fields

*This function should only be used in memory message construction.*


```solidity
function formatMessage(
    uint8 _version,
    uint32 _nonce,
    uint32 _originDomain,
    bytes32 _sender,
    uint32 _destinationDomain,
    bytes32 _recipient,
    bytes calldata _messageBody
) internal pure returns (bytes memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_version`|`uint8`|The version of the origin and destination Mailboxes|
|`_nonce`|`uint32`|A nonce to uniquely identify the message on its origin chain|
|`_originDomain`|`uint32`|Domain of origin chain|
|`_sender`|`bytes32`|Address of sender as bytes32|
|`_destinationDomain`|`uint32`|Domain of destination chain|
|`_recipient`|`bytes32`|Address of recipient on destination chain as bytes32|
|`_messageBody`|`bytes`|Raw bytes of message body|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes`|Formatted message|


### id

Returns the message ID.


```solidity
function id(bytes memory _message) internal pure returns (bytes32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_message`|`bytes`|ABI encoded Hyperlane message.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes32`|ID of `_message`|


### version

Returns the message version.


```solidity
function version(bytes calldata _message) internal pure returns (uint8);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_message`|`bytes`|ABI encoded Hyperlane message.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint8`|Version of `_message`|


### nonce

Returns the message nonce.


```solidity
function nonce(bytes calldata _message) internal pure returns (uint32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_message`|`bytes`|ABI encoded Hyperlane message.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint32`|Nonce of `_message`|


### origin

Returns the message origin domain.


```solidity
function origin(bytes calldata _message) internal pure returns (uint32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_message`|`bytes`|ABI encoded Hyperlane message.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint32`|Origin domain of `_message`|


### sender

Returns the message sender as bytes32.


```solidity
function sender(bytes calldata _message) internal pure returns (bytes32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_message`|`bytes`|ABI encoded Hyperlane message.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes32`|Sender of `_message` as bytes32|


### senderAddress

Returns the message sender as address.


```solidity
function senderAddress(bytes calldata _message) internal pure returns (address);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_message`|`bytes`|ABI encoded Hyperlane message.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|Sender of `_message` as address|


### destination

Returns the message destination domain.


```solidity
function destination(bytes calldata _message) internal pure returns (uint32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_message`|`bytes`|ABI encoded Hyperlane message.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint32`|Destination domain of `_message`|


### recipient

Returns the message recipient as bytes32.


```solidity
function recipient(bytes calldata _message) internal pure returns (bytes32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_message`|`bytes`|ABI encoded Hyperlane message.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes32`|Recipient of `_message` as bytes32|


### recipientAddress

Returns the message recipient as address.


```solidity
function recipientAddress(bytes calldata _message) internal pure returns (address);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_message`|`bytes`|ABI encoded Hyperlane message.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|Recipient of `_message` as address|


### body

Returns the message body.


```solidity
function body(bytes calldata _message) internal pure returns (bytes calldata);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_message`|`bytes`|ABI encoded Hyperlane message.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes`|Body of `_message`|


