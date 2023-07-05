# TestRouter
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/test/TestRouter.sol)

**Inherits:**
[Router](/contracts/Router.sol/abstract.Router.md)


## Functions
### initialize


```solidity
function initialize(address _mailbox, address _interchainGasPaymaster) external initializer;
```

### _handle


```solidity
function _handle(uint32, bytes32, bytes calldata) internal pure override;
```

### isRemoteRouter


```solidity
function isRemoteRouter(uint32 _domain, bytes32 _potentialRemoteRouter) external view returns (bool);
```

### mustHaveRemoteRouter


```solidity
function mustHaveRemoteRouter(uint32 _domain) external view returns (bytes32);
```

### dispatch


```solidity
function dispatch(uint32 _destination, bytes memory _msg) external;
```

### dispatchWithGas


```solidity
function dispatchWithGas(
    uint32 _destinationDomain,
    bytes memory _messageBody,
    uint256 _gasAmount,
    uint256 _gasPayment,
    address _gasPaymentRefundAddress
) external payable;
```

## Events
### InitializeOverload

```solidity
event InitializeOverload();
```

