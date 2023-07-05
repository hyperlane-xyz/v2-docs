# ILiquidityLayerRouter
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/interfaces/ILiquidityLayerRouter.sol)


## Functions
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

