# IInterchainGasPaymaster
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/interfaces/IInterchainGasPaymaster.sol)

Manages payments on a source chain to cover gas costs of relaying
messages to destination chains.


## Functions
### payForGas


```solidity
function payForGas(bytes32 _messageId, uint32 _destinationDomain, uint256 _gasAmount, address _refundAddress)
    external
    payable;
```

### quoteGasPayment


```solidity
function quoteGasPayment(uint32 _destinationDomain, uint256 _gasAmount) external view returns (uint256);
```

## Events
### GasPayment
Emitted when a payment is made for a message's gas costs.


```solidity
event GasPayment(bytes32 indexed messageId, uint256 gasAmount, uint256 payment);
```

