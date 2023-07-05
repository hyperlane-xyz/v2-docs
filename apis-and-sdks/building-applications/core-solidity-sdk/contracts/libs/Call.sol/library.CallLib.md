# CallLib
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/libs/Call.sol)


## Functions
### call


```solidity
function call(Call memory _call) internal returns (bytes memory returnData);
```

### staticcall


```solidity
function staticcall(StaticCall memory _call) private view returns (bytes memory);
```

### staticcall


```solidity
function staticcall(StaticCallWithCallback memory _call) internal view returns (bytes memory callback);
```

### multicall


```solidity
function multicall(Call[] memory calls) internal;
```

### multistaticcall


```solidity
function multistaticcall(StaticCallWithCallback[] memory _calls) internal view returns (bytes[] memory);
```

### multicallto


```solidity
function multicallto(address to, bytes[] memory calls) internal;
```

### build


```solidity
function build(bytes32 to, bytes memory data) internal pure returns (StaticCall memory);
```

### build


```solidity
function build(address to, bytes memory data) internal pure returns (StaticCall memory);
```

### build


```solidity
function build(bytes32 to, uint256 value, bytes memory data) internal pure returns (Call memory);
```

### build


```solidity
function build(address to, uint256 value, bytes memory data) internal pure returns (Call memory);
```

### build


```solidity
function build(bytes32 to, bytes memory data, bytes memory callback)
    internal
    pure
    returns (StaticCallWithCallback memory);
```

### build


```solidity
function build(address to, bytes memory data, bytes memory callback)
    internal
    pure
    returns (StaticCallWithCallback memory);
```

## Structs
### StaticCall

```solidity
struct StaticCall {
    bytes32 to;
    bytes data;
}
```

### Call

```solidity
struct Call {
    bytes32 to;
    uint256 value;
    bytes data;
}
```

### StaticCallWithCallback

```solidity
struct StaticCallWithCallback {
    StaticCall _call;
    bytes callback;
}
```

