# MockCircleTokenMessenger
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/mock/MockCircleTokenMessenger.sol)

**Inherits:**
[ITokenMessenger](/contracts/middleware/liquidity-layer/interfaces/circle/ITokenMessenger.sol/interface.ITokenMessenger.md)


## State Variables
### nextNonce

```solidity
uint64 public nextNonce = 0;
```


### token

```solidity
MockToken token;
```


## Functions
### constructor


```solidity
constructor(MockToken _token);
```

### depositForBurn


```solidity
function depositForBurn(uint256 _amount, uint32, bytes32, address _burnToken) external returns (uint64 _nonce);
```

### depositForBurnWithCaller


```solidity
function depositForBurnWithCaller(uint256, uint32, bytes32, address, bytes32) external returns (uint64 _nonce);
```

