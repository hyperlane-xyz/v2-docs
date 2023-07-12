# TestQuerySender
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/test/TestQuerySender.sol)


## State Variables
### queryRouter

```solidity
IInterchainQueryRouter queryRouter;
```


### interchainGasPaymaster

```solidity
IInterchainGasPaymaster interchainGasPaymaster;
```


### lastAddressResult

```solidity
address public lastAddressResult;
```


### lastUint256Result

```solidity
uint256 public lastUint256Result;
```


### lastBytes32Result

```solidity
bytes32 public lastBytes32Result;
```


## Functions
### initialize


```solidity
function initialize(address _queryRouterAddress, address _interchainGasPaymaster) external;
```

### queryAddress


```solidity
function queryAddress(uint32 _destinationDomain, address _target, bytes calldata _targetData, uint256 _gasAmount)
    external
    payable;
```

### handleQueryAddressResult


```solidity
function handleQueryAddressResult(address _result) external;
```

### queryUint256


```solidity
function queryUint256(uint32 _destinationDomain, address _target, bytes calldata _targetData, uint256 _gasAmount)
    external
    payable;
```

### handleQueryUint256Result


```solidity
function handleQueryUint256Result(uint256 _result) external;
```

### queryBytes32


```solidity
function queryBytes32(uint32 _destinationDomain, address _target, bytes calldata _targetData, uint256 _gasAmount)
    external
    payable;
```

### handleQueryBytes32Result


```solidity
function handleQueryBytes32Result(bytes32 _result) external;
```

### queryAndPayFor


```solidity
function queryAndPayFor(
    uint32 _destinationDomain,
    address _target,
    bytes calldata _targetData,
    bytes4 _callbackSelector,
    uint256 _gasAmount
) internal;
```

## Events
### ReceivedAddressResult

```solidity
event ReceivedAddressResult(address result);
```

### ReceivedUint256Result

```solidity
event ReceivedUint256Result(uint256 result);
```

### ReceivedBytes32Result

```solidity
event ReceivedBytes32Result(bytes32 result);
```

