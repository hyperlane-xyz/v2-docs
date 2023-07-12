# EnumerableMapExtended
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/libs/EnumerableMapExtended.sol)


## Functions
### keys


```solidity
function keys(UintToBytes32Map storage map) internal view returns (bytes32[] storage);
```

### set


```solidity
function set(UintToBytes32Map storage map, uint256 key, bytes32 value) internal;
```

### get


```solidity
function get(UintToBytes32Map storage map, uint256 key) internal view returns (bytes32);
```

### remove


```solidity
function remove(UintToBytes32Map storage map, uint256 key) internal returns (bool);
```

### contains


```solidity
function contains(UintToBytes32Map storage map, uint256 key) internal view returns (bool);
```

### length


```solidity
function length(UintToBytes32Map storage map) internal view returns (uint256);
```

### at


```solidity
function at(UintToBytes32Map storage map, uint256 index) internal view returns (uint256, bytes32);
```

## Structs
### UintToBytes32Map

```solidity
struct UintToBytes32Map {
    EnumerableMap.Bytes32ToBytes32Map _inner;
}
```

