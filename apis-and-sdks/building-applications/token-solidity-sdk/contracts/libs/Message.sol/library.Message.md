# Message
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/libs/Message.sol)


## Functions
### format


```solidity
function format(bytes32 _recipient, uint256 _amount, bytes memory _metadata) internal pure returns (bytes memory);
```

### recipient


```solidity
function recipient(bytes calldata message) internal pure returns (bytes32);
```

### amount


```solidity
function amount(bytes calldata message) internal pure returns (uint256);
```

### tokenId


```solidity
function tokenId(bytes calldata message) internal pure returns (uint256);
```

### metadata


```solidity
function metadata(bytes calldata message) internal pure returns (bytes calldata);
```

