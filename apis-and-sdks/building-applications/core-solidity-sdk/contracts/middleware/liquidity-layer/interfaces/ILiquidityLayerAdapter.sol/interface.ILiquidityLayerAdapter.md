# ILiquidityLayerAdapter
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/middleware/liquidity-layer/interfaces/ILiquidityLayerAdapter.sol)


## Functions
### sendTokens


```solidity
function sendTokens(uint32 _destinationDomain, bytes32 _recipientAddress, address _token, uint256 _amount)
    external
    returns (bytes memory _adapterData);
```

### receiveTokens


```solidity
function receiveTokens(uint32 _originDomain, address _recipientAddress, uint256 _amount, bytes calldata _adapterData)
    external
    returns (address, uint256);
```

