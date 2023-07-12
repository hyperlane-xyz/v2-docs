# PortalAdapter
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/middleware/liquidity-layer/adapters/PortalAdapter.sol)

**Inherits:**
[ILiquidityLayerAdapter](/contracts/middleware/liquidity-layer/interfaces/ILiquidityLayerAdapter.sol/interface.ILiquidityLayerAdapter.md), [Router](/contracts/Router.sol/abstract.Router.md)


## State Variables
### portalTokenBridge
The Portal TokenBridge contract.


```solidity
IPortalTokenBridge public portalTokenBridge;
```


### liquidityLayerRouter
The LiquidityLayerRouter contract.


```solidity
address public liquidityLayerRouter;
```


### hyperlaneDomainToWormholeDomain
Hyperlane domain => Wormhole domain.


```solidity
mapping(uint32 => uint16) public hyperlaneDomainToWormholeDomain;
```


### portalTransfersProcessed
transferId => token address


```solidity
mapping(bytes32 => address) public portalTransfersProcessed;
```


### localDomain

```solidity
uint32 public localDomain;
```


### nonce

```solidity
uint224 public nonce = 0;
```


## Functions
### onlyLiquidityLayerRouter


```solidity
modifier onlyLiquidityLayerRouter();
```

### initialize


```solidity
function initialize(uint32 _localDomain, address _owner, address _portalTokenBridge, address _liquidityLayerRouter)
    public
    initializer;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_localDomain`|`uint32`|The local hyperlane domain|
|`_owner`|`address`|The new owner.|
|`_portalTokenBridge`|`address`|The Portal TokenBridge contract.|
|`_liquidityLayerRouter`|`address`|The LiquidityLayerRouter contract.|


### sendTokens

Sends tokens as requested by the router


```solidity
function sendTokens(uint32 _destinationDomain, bytes32, address _token, uint256 _amount)
    external
    onlyLiquidityLayerRouter
    returns (bytes memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_destinationDomain`|`uint32`|The hyperlane domain of the destination|
|`<none>`|`bytes32`||
|`_token`|`address`|The token address|
|`_amount`|`uint256`|The amount of tokens to send|


### receiveTokens

Sends the tokens to the recipient as requested by the router


```solidity
function receiveTokens(uint32 _originDomain, address _recipient, uint256 _amount, bytes calldata _adapterData)
    external
    onlyLiquidityLayerRouter
    returns (address, uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_originDomain`|`uint32`|The hyperlane domain of the origin|
|`_recipient`|`address`|The address of the recipient|
|`_amount`|`uint256`|The amount of tokens to send|
|`_adapterData`|`bytes`|The adapter data from the origin chain, containing the nonce|


### completeTransfer

Completes the Portal transfer which sends the funds to this adapter.
The router can call receiveTokens to move those funds to the ultimate recipient.


```solidity
function completeTransfer(bytes memory encodedVm) public;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`encodedVm`|`bytes`|The VAA from the Wormhole Guardians|


### _handle


```solidity
function _handle(uint32, bytes32, bytes calldata) internal pure override;
```

### addDomain


```solidity
function addDomain(uint32 _hyperlaneDomain, uint16 _wormholeDomain) external onlyOwner;
```

### transferId

The key that is used to track fulfilled Portal transfers


```solidity
function transferId(uint32 _hyperlaneDomain, uint224 _nonce) public pure returns (bytes32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_hyperlaneDomain`|`uint32`|The hyperlane of the origin|
|`_nonce`|`uint224`|The nonce of the adapter on the origin|


## Events
### BridgedToken
Emits the nonce of the Portal message when a token is bridged.


```solidity
event BridgedToken(uint256 nonce, uint64 portalSequence, uint32 destination);
```

### DomainAdded
Emitted when the Hyperlane domain to Wormhole domain mapping is updated.


```solidity
event DomainAdded(uint32 indexed hyperlaneDomain, uint32 wormholeDomain);
```

