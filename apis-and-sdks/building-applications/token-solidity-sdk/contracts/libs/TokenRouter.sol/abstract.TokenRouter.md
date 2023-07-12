# TokenRouter
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/libs/TokenRouter.sol)

**Inherits:**
GasRouter

**Author:**
Abacus Works


## Functions
### transferRemote

Transfers `_amountOrId` token to `_recipient` on `_destination` domain.

*Delegates transfer logic to `_transferFromSender` implementation.*

*Emits `SentTransferRemote` event on the origin chain.*


```solidity
function transferRemote(uint32 _destination, bytes32 _recipient, uint256 _amountOrId)
    public
    payable
    virtual
    returns (bytes32 messageId);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_destination`|`uint32`|The identifier of the destination chain.|
|`_recipient`|`bytes32`|The address of the recipient on the destination chain.|
|`_amountOrId`|`uint256`|The amount or identifier of tokens to be sent to the remote recipient.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`messageId`|`bytes32`|The identifier of the dispatched message.|


### _transferFromSender

*Should transfer `_amountOrId` of tokens from `msg.sender` to this token router.*

*Called by `transferRemote` before message dispatch.*

*Optionally returns `metadata` associated with the transfer to be passed in message.*


```solidity
function _transferFromSender(uint256 _amountOrId) internal virtual returns (bytes memory metadata);
```

### _handle

*Mints tokens to recipient when router receives transfer message.*

*Emits `ReceivedTransferRemote` event on the destination chain.*


```solidity
function _handle(uint32 _origin, bytes32, bytes calldata _message) internal override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_origin`|`uint32`|The identifier of the origin chain.|
|`<none>`|`bytes32`||
|`_message`|`bytes`|The encoded remote transfer message containing the recipient address and amount.|


### _transferTo

*Should transfer `_amountOrId` of tokens from this token router to `_recipient`.*

*Called by `handle` after message decoding.*

*Optionally handles `metadata` associated with transfer passed in message.*


```solidity
function _transferTo(address _recipient, uint256 _amountOrId, bytes calldata metadata) internal virtual;
```

## Events
### SentTransferRemote
*Emitted on `transferRemote` when a transfer message is dispatched.*


```solidity
event SentTransferRemote(uint32 indexed destination, bytes32 indexed recipient, uint256 amount);
```

### ReceivedTransferRemote
*Emitted on `_handle` when a transfer message is processed.*


```solidity
event ReceivedTransferRemote(uint32 indexed origin, bytes32 indexed recipient, uint256 amount);
```

