# LiquidityLayerRouter
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/middleware/liquidity-layer/LiquidityLayerRouter.sol)

**Inherits:**
[Router](/contracts/Router.sol/abstract.Router.md), [ILiquidityLayerRouter](/contracts/interfaces/ILiquidityLayerRouter.sol/interface.ILiquidityLayerRouter.md)


## State Variables
### liquidityLayerAdapters

```solidity
mapping(string => address) public liquidityLayerAdapters;
```


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


### dispatchWithTokens


```solidity
function dispatchWithTokens(
    uint32 _destinationDomain,
    bytes32 _recipientAddress,
    address _token,
    uint256 _amount,
    string calldata _bridge,
    bytes calldata _messageBody
) external returns (bytes32);
```

### _handle


```solidity
function _handle(uint32 _origin, bytes32, bytes calldata _message) internal override;
```

### setLiquidityLayerAdapter


```solidity
function setLiquidityLayerAdapter(string calldata _bridge, address _adapter) external onlyOwner;
```

### _getAdapter


```solidity
function _getAdapter(string memory _bridge) internal view returns (ILiquidityLayerAdapter _adapter);
```

## Events
### LiquidityLayerAdapterSet

```solidity
event LiquidityLayerAdapterSet(string indexed bridge, address adapter);
```

