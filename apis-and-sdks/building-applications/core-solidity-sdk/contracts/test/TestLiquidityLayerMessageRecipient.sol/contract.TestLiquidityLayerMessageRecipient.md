# TestLiquidityLayerMessageRecipient
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/test/TestLiquidityLayerMessageRecipient.sol)

**Inherits:**
[ILiquidityLayerMessageRecipient](/contracts/interfaces/ILiquidityLayerMessageRecipient.sol/interface.ILiquidityLayerMessageRecipient.md)


## Functions
### handleWithTokens


```solidity
function handleWithTokens(uint32 _origin, bytes32 _sender, bytes calldata _message, address _token, uint256 _amount)
    external;
```

## Events
### HandledWithTokens

```solidity
event HandledWithTokens(uint32 origin, bytes32 sender, bytes message, address token, uint256 amount);
```

