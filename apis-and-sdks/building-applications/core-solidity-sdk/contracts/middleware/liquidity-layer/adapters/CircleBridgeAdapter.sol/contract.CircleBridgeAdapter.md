# CircleBridgeAdapter
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/middleware/liquidity-layer/adapters/CircleBridgeAdapter.sol)

**Inherits:**
[ILiquidityLayerAdapter](/contracts/middleware/liquidity-layer/interfaces/ILiquidityLayerAdapter.sol/interface.ILiquidityLayerAdapter.md), [Router](/contracts/Router.sol/abstract.Router.md)


## State Variables
### tokenMessenger
The TokenMessenger contract.


```solidity
ITokenMessenger public tokenMessenger;
```


### circleMessageTransmitter
The Circle MessageTransmitter contract.


```solidity
ICircleMessageTransmitter public circleMessageTransmitter;
```


### liquidityLayerRouter
The LiquidityLayerRouter contract.


```solidity
address public liquidityLayerRouter;
```


### hyperlaneDomainToCircleDomain
Hyperlane domain => Circle domain.
ATM, known Circle domains are Ethereum = 0 and Avalanche = 1.
Note this could result in ambiguity between the Circle domain being
Ethereum or unknown.


```solidity
mapping(uint32 => uint32) public hyperlaneDomainToCircleDomain;
```


### tokenSymbolToAddress
Token symbol => address of token on local chain.


```solidity
mapping(string => IERC20) public tokenSymbolToAddress;
```


### tokenAddressToSymbol
Local chain token address => token symbol.


```solidity
mapping(address => string) public tokenAddressToSymbol;
```


## Functions
### onlyLiquidityLayerRouter


```solidity
modifier onlyLiquidityLayerRouter();
```

### initialize


```solidity
function initialize(
    address _owner,
    address _tokenMessenger,
    address _circleMessageTransmitter,
    address _liquidityLayerRouter
) external initializer;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_owner`|`address`|The new owner.|
|`_tokenMessenger`|`address`|The TokenMessenger contract.|
|`_circleMessageTransmitter`|`address`|The Circle MessageTransmitter contract.|
|`_liquidityLayerRouter`|`address`|The LiquidityLayerRouter contract.|


### sendTokens


```solidity
function sendTokens(uint32 _destinationDomain, bytes32, address _token, uint256 _amount)
    external
    onlyLiquidityLayerRouter
    returns (bytes memory);
```

### receiveTokens


```solidity
function receiveTokens(uint32 _originDomain, address _recipient, uint256 _amount, bytes calldata _adapterData)
    external
    onlyLiquidityLayerRouter
    returns (address, uint256);
```

### _handle


```solidity
function _handle(uint32, bytes32, bytes calldata) internal pure override;
```

### addDomain


```solidity
function addDomain(uint32 _hyperlaneDomain, uint32 _circleDomain) external onlyOwner;
```

### addToken


```solidity
function addToken(address _token, string calldata _tokenSymbol) external onlyOwner;
```

### removeToken


```solidity
function removeToken(address _token, string calldata _tokenSymbol) external onlyOwner;
```

### _circleNonceId

Gets the Circle nonce ID by hashing _originCircleDomain and _nonce.


```solidity
function _circleNonceId(uint32 _originCircleDomain, uint64 _nonce) internal pure returns (bytes32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_originCircleDomain`|`uint32`|Domain of chain where the transfer originated|
|`_nonce`|`uint64`|The unique identifier for the message from source to destination|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes32`|hash of source and nonce|


## Events
### BridgedToken
Emits the nonce of the Circle message when a token is bridged.


```solidity
event BridgedToken(uint64 nonce);
```

### DomainAdded
Emitted when the Hyperlane domain to Circle domain mapping is updated.


```solidity
event DomainAdded(uint32 indexed hyperlaneDomain, uint32 circleDomain);
```

### TokenAdded
Emitted when a local token and its token symbol have been added.


```solidity
event TokenAdded(address indexed token, string indexed symbol);
```

### TokenRemoved
Emitted when a local token and its token symbol have been removed.


```solidity
event TokenRemoved(address indexed token, string indexed symbol);
```

