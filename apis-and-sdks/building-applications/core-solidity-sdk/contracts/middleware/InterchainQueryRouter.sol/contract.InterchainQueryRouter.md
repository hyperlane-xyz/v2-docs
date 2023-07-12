# InterchainQueryRouter
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/middleware/InterchainQueryRouter.sol)

**Inherits:**
[Router](/contracts/Router.sol/abstract.Router.md), [IInterchainQueryRouter](/contracts/interfaces/middleware/IInterchainQueryRouter.sol/interface.IInterchainQueryRouter.md)

*Currently does not support Sovereign Consensus (user specified Interchain Security Modules).*


## Functions
### initialize

Initializes the Router contract with Hyperlane core contracts and the address of the interchain security module.


```solidity
function initialize(
    address _mailbox,
    address _interchainGasPaymaster,
    address _interchainSecurityModule,
    address _owner
) external initializer;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_mailbox`|`address`|The address of the mailbox contract.|
|`_interchainGasPaymaster`|`address`|The address of the interchain gas paymaster contract.|
|`_interchainSecurityModule`|`address`|The address of the interchain security module contract.|
|`_owner`|`address`|The address with owner privileges.|


### query

Dispatches a sequence of static calls (query) to the destination domain and set of callbacks to resolve the results on the dispatcher.

*Callbacks must be returned to the `msg.sender` for security reasons. Require this contract is the `msg.sender` on callbacks.*


```solidity
function query(uint32 _destination, address _to, bytes memory _data, bytes memory _callback)
    public
    returns (bytes32 messageId);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_destination`|`uint32`|The domain of the chain to query.|
|`_to`|`address`|The address of the contract to query|
|`_data`|`bytes`|The calldata encoding the query|
|`_callback`|`bytes`|The calldata of the callback that will be made on the sender. The return value of the query will be appended.|


### query

Dispatches a sequence of static calls (query) to the destination domain and set of callbacks to resolve the results on the dispatcher.

*Recommend using CallLib.build to format the interchain calls.*

*Callbacks must be returned to the `msg.sender` for security reasons. Require this contract is the `msg.sender` on callbacks.*


```solidity
function query(uint32 _destination, CallLib.StaticCallWithCallback[] calldata calls)
    public
    returns (bytes32 messageId);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_destination`|`uint32`|The domain of the chain to query.|
|`calls`|`CallLib.StaticCallWithCallback[]`|The sequence of static calls to dispatch and callbacks on the sender to resolve the results.|


### _handle

Handles a message from remote enrolled Interchain Query Router.


```solidity
function _handle(uint32 _origin, bytes32, bytes calldata _message) internal override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_origin`|`uint32`|The domain of the chain that sent the message.|
|`<none>`|`bytes32`||
|`_message`|`bytes`|The ABI-encoded interchain query.|


## Events
### QueryDispatched
Emitted when a query is dispatched to another chain.


```solidity
event QueryDispatched(uint32 indexed destination, address indexed sender);
```

### QueryExecuted
Emitted when a query is executed on the and callback dispatched to the origin chain.


```solidity
event QueryExecuted(uint32 indexed originDomain, bytes32 indexed sender);
```

### QueryResolved
Emitted when a query is resolved on the origin chain.


```solidity
event QueryResolved(uint32 indexed destination, address indexed sender);
```

