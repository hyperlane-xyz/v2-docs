# InterchainAccountRouter
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/middleware/InterchainAccountRouter.sol)

**Inherits:**
[HyperlaneConnectionClient](/contracts/HyperlaneConnectionClient.sol/abstract.HyperlaneConnectionClient.md), [IRouter](/contracts/interfaces/IRouter.sol/interface.IRouter.md), [IInterchainAccountRouter](/contracts/interfaces/middleware/IInterchainAccountRouter.sol/interface.IInterchainAccountRouter.md)


## State Variables
### localDomain

```solidity
uint32 internal immutable localDomain;
```


### implementation

```solidity
address internal immutable implementation;
```


### bytecodeHash

```solidity
bytes32 internal immutable bytecodeHash;
```


### _domains

```solidity
uint32[] private _domains;
```


### routers

```solidity
mapping(uint32 => bytes32) public routers;
```


### isms

```solidity
mapping(uint32 => bytes32) public isms;
```


### __GAP

```solidity
uint256[47] private __GAP;
```


## Functions
### constructor

Constructor deploys a relay (OwnableMulticall.sol) contract that
will be cloned for each interchain account.

*Set proxy to address(0) to use this contract without a proxy.*


```solidity
constructor(uint32 _localDomain, address _proxy);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_localDomain`|`uint32`|The Hyperlane domain ID on which this contract is deployed.|
|`_proxy`|`address`|The address of a proxy contract that delegates calls to this contract. Used by OwnableMulticall for access control.|


### initialize

Initializes the contract with HyperlaneConnectionClient contracts


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
|`_mailbox`|`address`|The address of the mailbox contract|
|`_interchainGasPaymaster`|`address`|Unused but required by HyperlaneConnectionClient|
|`_interchainSecurityModule`|`address`|The address of the local ISM contract|
|`_owner`|`address`|The address with owner privileges|


### enrollRemoteRouters

Registers the address of many remote InterchainAccountRouter
contracts to use as a default when making interchain calls


```solidity
function enrollRemoteRouters(uint32[] calldata _destinations, bytes32[] calldata _routers) external onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_destinations`|`uint32[]`|The remote domains|
|`_routers`|`bytes32[]`|The addresses of the remote InterchainAccountRouters|


### callRemote

Dispatches a single remote call to be made by an owner's
interchain account on the destination domain

*Uses the default router and ISM addresses for the destination
domain, reverting if none have been configured*


```solidity
function callRemote(uint32 _destination, address _to, uint256 _value, bytes memory _data) external returns (bytes32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_destination`|`uint32`|The remote domain of the chain to make calls on|
|`_to`|`address`|The address of the contract to call|
|`_value`|`uint256`|The value to include in the call|
|`_data`|`bytes`|The calldata|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes32`|The Hyperlane message ID|


### callRemote

Dispatches a sequence of remote calls to be made by an owner's
interchain account on the destination domain

*Uses the default router and ISM addresses for the destination
domain, reverting if none have been configured*

*Recommend using CallLib.build to format the interchain calls.*


```solidity
function callRemote(uint32 _destination, CallLib.Call[] calldata _calls) external returns (bytes32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_destination`|`uint32`|The remote domain of the chain to make calls on|
|`_calls`|`CallLib.Call[]`|The sequence of calls to make|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes32`|The Hyperlane message ID|


### handle

Handles dispatched messages by relaying calls to the interchain account

*Does not need to be onlyRemoteRouter, as this application is designed
to receive messages from untrusted remote contracts.*


```solidity
function handle(uint32 _origin, bytes32 _sender, bytes calldata _message) external onlyMailbox;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_origin`|`uint32`|The origin domain of the interchain account|
|`_sender`|`bytes32`|The sender of the interchain message|
|`_message`|`bytes`|The InterchainAccountMessage containing the account owner, ISM, and sequence of calls to be relayed|


### getLocalInterchainAccount

Returns the local address of an interchain account

*This interchain account is not guaranteed to have been deployed*


```solidity
function getLocalInterchainAccount(uint32 _origin, address _owner, address _router, address _ism)
    external
    view
    returns (OwnableMulticall);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_origin`|`uint32`|The remote origin domain of the interchain account|
|`_owner`|`address`|The remote owner of the interchain account|
|`_router`|`address`|The remote origin InterchainAccountRouter|
|`_ism`|`address`|The local address of the ISM|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`OwnableMulticall`|The local address of the interchain account|


### getRemoteInterchainAccount

Returns the remote address of a locally owned interchain account

*This interchain account is not guaranteed to have been deployed*

*This function will only work if the destination domain is
EVM compatible*


```solidity
function getRemoteInterchainAccount(uint32 _destination, address _owner) external view returns (address);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_destination`|`uint32`|The remote destination domain of the interchain account|
|`_owner`|`address`|The local owner of the interchain account|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The remote address of the interchain account|


### domains


```solidity
function domains() external view returns (uint32[] memory);
```

### enrollRemoteRouter

Registers the address of a remote InterchainAccountRouter
contract to use as a default when making interchain calls


```solidity
function enrollRemoteRouter(uint32 _destination, bytes32 _router) public onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_destination`|`uint32`|The remote domain|
|`_router`|`bytes32`|The address of the remote InterchainAccountRouter|


### enrollRemoteRouterAndIsm

Registers the address of remote InterchainAccountRouter
and ISM contracts to use as a default when making interchain calls


```solidity
function enrollRemoteRouterAndIsm(uint32 _destination, bytes32 _router, bytes32 _ism) public onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_destination`|`uint32`|The remote domain|
|`_router`|`bytes32`|The address of the remote InterchainAccountRouter|
|`_ism`|`bytes32`|The address of the remote ISM|


### callRemoteWithOverrides

Dispatches a sequence of remote calls to be made by an owner's
interchain account on the destination domain

*Recommend using CallLib.build to format the interchain calls*


```solidity
function callRemoteWithOverrides(uint32 _destination, bytes32 _router, bytes32 _ism, CallLib.Call[] calldata _calls)
    public
    returns (bytes32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_destination`|`uint32`|The remote domain of the chain to make calls on|
|`_router`|`bytes32`|The remote router address|
|`_ism`|`bytes32`|The remote ISM address|
|`_calls`|`CallLib.Call[]`|The sequence of calls to make|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes32`|The Hyperlane message ID|


### getDeployedInterchainAccount

Returns and deploys (if not already) an interchain account


```solidity
function getDeployedInterchainAccount(uint32 _origin, address _owner, address _router, address _ism)
    public
    returns (OwnableMulticall);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_origin`|`uint32`|The remote origin domain of the interchain account|
|`_owner`|`address`|The remote owner of the interchain account|
|`_router`|`address`|The remote origin InterchainAccountRouter|
|`_ism`|`address`|The local address of the ISM|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`OwnableMulticall`|The address of the interchain account|


### getDeployedInterchainAccount

Returns and deploys (if not already) an interchain account


```solidity
function getDeployedInterchainAccount(uint32 _origin, bytes32 _owner, bytes32 _router, address _ism)
    public
    returns (OwnableMulticall);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_origin`|`uint32`|The remote origin domain of the interchain account|
|`_owner`|`bytes32`|The remote owner of the interchain account|
|`_router`|`bytes32`|The remote origin InterchainAccountRouter|
|`_ism`|`address`|The local address of the ISM|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`OwnableMulticall`|The address of the interchain account|


### getLocalInterchainAccount

Returns the local address of a remotely owned interchain account

*This interchain account is not guaranteed to have been deployed*


```solidity
function getLocalInterchainAccount(uint32 _origin, bytes32 _owner, bytes32 _router, address _ism)
    public
    view
    returns (OwnableMulticall);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_origin`|`uint32`|The remote origin domain of the interchain account|
|`_owner`|`bytes32`|The remote owner of the interchain account|
|`_router`|`bytes32`|The remote InterchainAccountRouter|
|`_ism`|`address`|The local address of the ISM|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`OwnableMulticall`|The local address of the interchain account|


### getRemoteInterchainAccount

Returns the remote address of a locally owned interchain account

*This interchain account is not guaranteed to have been deployed*

*This function will only work if the destination domain is
EVM compatible*


```solidity
function getRemoteInterchainAccount(address _owner, address _router, address _ism) public view returns (address);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_owner`|`address`|The local owner of the interchain account|
|`_router`|`address`|The remote InterchainAccountRouter|
|`_ism`|`address`|The remote address of the ISM|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The remote address of the interchain account|


### _enrollRemoteRouterAndIsm

Registers the address of remote InterchainAccountRouter
and ISM contracts to use as a default when making interchain calls


```solidity
function _enrollRemoteRouterAndIsm(uint32 _destination, bytes32 _router, bytes32 _ism) private;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_destination`|`uint32`|The remote domain|
|`_router`|`bytes32`|The address of the remote InterchainAccountRouter|
|`_ism`|`bytes32`|The address of the remote ISM|


### _dispatchMessage

Dispatches an InterchainAccountMessage to the remote router


```solidity
function _dispatchMessage(uint32 _destination, bytes32 _router, bytes32 _ism, bytes memory _body)
    private
    returns (bytes32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_destination`|`uint32`|The remote domain|
|`_router`|`bytes32`|The address of the remote InterchainAccountRouter|
|`_ism`|`bytes32`|The address of the remote ISM|
|`_body`|`bytes`|The InterchainAccountMessage body|


### _getSalt

Returns the salt used to deploy an interchain account


```solidity
function _getSalt(uint32 _origin, bytes32 _owner, bytes32 _router, bytes32 _ism) private pure returns (bytes32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_origin`|`uint32`|The remote origin domain of the interchain account|
|`_owner`|`bytes32`|The remote owner of the interchain account|
|`_router`|`bytes32`|The remote origin InterchainAccountRouter|
|`_ism`|`bytes32`|The local address of the ISM|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes32`|The CREATE2 salt used for deploying the interchain account|


### _getLocalInterchainAccount

Returns the address of the interchain account on the local chain


```solidity
function _getLocalInterchainAccount(bytes32 _salt) private view returns (address payable);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_salt`|`bytes32`|The CREATE2 salt used for deploying the interchain account|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address payable`|The address of the interchain account|


## Events
### RemoteRouterEnrolled
Emitted when a default router is set for a remote domain


```solidity
event RemoteRouterEnrolled(uint32 indexed domain, bytes32 router);
```

### RemoteIsmEnrolled
Emitted when a default ISM is set for a remote domain


```solidity
event RemoteIsmEnrolled(uint32 indexed domain, bytes32 ism);
```

### RemoteCallDispatched
Emitted when an interchain call is dispatched to a remote domain


```solidity
event RemoteCallDispatched(uint32 indexed destination, address indexed owner, bytes32 router, bytes32 ism);
```

### InterchainAccountCreated
Emitted when an interchain account contract is deployed


```solidity
event InterchainAccountCreated(uint32 indexed origin, bytes32 indexed owner, address ism, address account);
```

