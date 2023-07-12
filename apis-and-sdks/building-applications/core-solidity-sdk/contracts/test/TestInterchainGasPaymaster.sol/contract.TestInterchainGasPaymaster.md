# TestInterchainGasPaymaster
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/test/TestInterchainGasPaymaster.sol)

**Inherits:**
[InterchainGasPaymaster](/contracts/igps/InterchainGasPaymaster.sol/contract.InterchainGasPaymaster.md)


## State Variables
### gasPrice

```solidity
uint256 public constant gasPrice = 10;
```


## Functions
### constructor


```solidity
constructor(address _beneficiary);
```

### quoteGasPayment


```solidity
function quoteGasPayment(uint32, uint256 gasAmount) public pure override returns (uint256);
```

