# OwnableMulticall
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/OwnableMulticall.sol)


## State Variables
### owner

```solidity
address public immutable owner;
```


## Functions
### constructor


```solidity
constructor(address _owner);
```

### onlyOwner


```solidity
modifier onlyOwner();
```

### multicall


```solidity
function multicall(CallLib.Call[] calldata calls) external onlyOwner;
```

### receive


```solidity
receive() external payable;
```

