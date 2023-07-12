# TestGasRouter
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/test/TestGasRouter.sol)

**Inherits:**
[TestRouter](/contracts/test/TestRouter.sol/contract.TestRouter.md), [GasRouter](/contracts/GasRouter.sol/abstract.GasRouter.md)


## Functions
### dispatchWithGas


```solidity
function dispatchWithGas(
    uint32 _destinationDomain,
    bytes memory _messageBody,
    uint256 _gasPayment,
    address _gasPaymentRefundAddress
) external payable;
```

### dispatchWithGas


```solidity
function dispatchWithGas(uint32 _destinationDomain, bytes memory _messageBody) external payable;
```

