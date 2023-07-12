# Router
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/Router.sol)

**Inherits:**
[HyperlaneConnectionClient](/contracts/HyperlaneConnectionClient.sol/abstract.HyperlaneConnectionClient.md), [IMessageRecipient](/contracts/interfaces/IMessageRecipient.sol/interface.IMessageRecipient.md)


## State Variables
### NO_ROUTER_ENROLLED_REVERT_MESSAGE

```solidity
string private constant NO_ROUTER_ENROLLED_REVERT_MESSAGE =
    "No router enrolled for domain. Did you specify the right domain ID?";
```


### _routers

```solidity
EnumerableMapExtended.UintToBytes32Map internal _routers;
```


### __GAP

```solidity
uint256[49] private __GAP;
```


## Functions
### onlyRemoteRouter

Only accept messages from a remote Router contract


```solidity
modifier onlyRemoteRouter(uint32 _origin, bytes32 _router);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_origin`|`uint32`|The domain the message is coming from|
|`_router`|`bytes32`|The address the message is coming from|


### __Router_initialize


```solidity
function __Router_initialize(address _mailbox) internal onlyInitializing;
```

### __Router_initialize


```solidity
function __Router_initialize(address _mailbox, address _interchainGasPaymaster) internal onlyInitializing;
```

### __Router_initialize


```solidity
function __Router_initialize(address _mailbox, address _interchainGasPaymaster, address _interchainSecurityModule)
    internal
    onlyInitializing;
```

### domains


```solidity
function domains() external view returns (uint32[] memory);
```

### routers


```solidity
function routers(uint32 _domain) public view returns (bytes32);
```

### enrollRemoteRouter

Register the address of a Router contract for the same Application on a remote chain


```solidity
function enrollRemoteRouter(uint32 _domain, bytes32 _router) external virtual onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_domain`|`uint32`|The domain of the remote Application Router|
|`_router`|`bytes32`|The address of the remote Application Router|


### enrollRemoteRouters

Batch version of `enrollRemoteRouter`


```solidity
function enrollRemoteRouters(uint32[] calldata _domains, bytes32[] calldata _addresses) external virtual onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_domains`|`uint32[]`|The domaisn of the remote Application Routers|
|`_addresses`|`bytes32[]`|The addresses of the remote Application Routers|


### handle

Handles an incoming message


```solidity
function handle(uint32 _origin, bytes32 _sender, bytes calldata _message)
    external
    virtual
    override
    onlyMailbox
    onlyRemoteRouter(_origin, _sender);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_origin`|`uint32`|The origin domain|
|`_sender`|`bytes32`|The sender address|
|`_message`|`bytes`|The message|


### _handle


```solidity
function _handle(uint32 _origin, bytes32 _sender, bytes calldata _message) internal virtual;
```

### _enrollRemoteRouter

Set the router for a given domain


```solidity
function _enrollRemoteRouter(uint32 _domain, bytes32 _address) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_domain`|`uint32`|The domain|
|`_address`|`bytes32`|The new router|


### _isRemoteRouter

Return true if the given domain / router is the address of a remote Application Router


```solidity
function _isRemoteRouter(uint32 _domain, bytes32 _address) internal view returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_domain`|`uint32`|The domain of the potential remote Application Router|
|`_address`|`bytes32`|The address of the potential remote Application Router|


### _mustHaveRemoteRouter

Assert that the given domain has a Application Router registered and return its address


```solidity
function _mustHaveRemoteRouter(uint32 _domain) internal view returns (bytes32 _router);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_domain`|`uint32`|The domain of the chain for which to get the Application Router|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_router`|`bytes32`|The address of the remote Application Router on _domain|


### _dispatchWithGas

Dispatches a message to an enrolled router via the local router's Mailbox
and pays for it to be relayed to the destination.

*Reverts if there is no enrolled router for _destinationDomain.*


```solidity
function _dispatchWithGas(
    uint32 _destinationDomain,
    bytes memory _messageBody,
    uint256 _gasAmount,
    uint256 _gasPayment,
    address _gasPaymentRefundAddress
) internal returns (bytes32 _messageId);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_destinationDomain`|`uint32`|The domain of the chain to which to send the message.|
|`_messageBody`|`bytes`|Raw bytes content of message.|
|`_gasAmount`|`uint256`|The amount of destination gas for the message that is requested via the InterchainGasPaymaster.|
|`_gasPayment`|`uint256`|The amount of native tokens to pay for the message to be relayed.|
|`_gasPaymentRefundAddress`|`address`|The address to refund any gas overpayment to.|


### _dispatch

Dispatches a message to an enrolled router via the provided Mailbox.

*Does not pay interchain gas.*

*Reverts if there is no enrolled router for _destinationDomain.*


```solidity
function _dispatch(uint32 _destinationDomain, bytes memory _messageBody) internal virtual returns (bytes32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_destinationDomain`|`uint32`|The domain of the chain to which to send the message.|
|`_messageBody`|`bytes`|Raw bytes content of message.|


## Events
### RemoteRouterEnrolled
Emitted when a router is set.


```solidity
event RemoteRouterEnrolled(uint32 indexed domain, bytes32 router);
```

