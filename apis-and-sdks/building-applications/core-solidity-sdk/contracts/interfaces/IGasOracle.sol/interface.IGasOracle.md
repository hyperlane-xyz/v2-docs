# IGasOracle
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/interfaces/IGasOracle.sol)


## Functions
### getExchangeRateAndGasPrice


```solidity
function getExchangeRateAndGasPrice(uint32 _destinationDomain)
    external
    view
    returns (uint128 tokenExchangeRate, uint128 gasPrice);
```

## Structs
### RemoteGasData

```solidity
struct RemoteGasData {
    uint128 tokenExchangeRate;
    uint128 gasPrice;
}
```

