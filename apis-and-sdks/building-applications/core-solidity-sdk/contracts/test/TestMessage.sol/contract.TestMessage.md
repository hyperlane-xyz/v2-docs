# TestMessage
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/test/TestMessage.sol)


## Functions
### version


```solidity
function version(bytes calldata _message) external pure returns (uint32 _version);
```

### nonce


```solidity
function nonce(bytes calldata _message) external pure returns (uint256 _nonce);
```

### body


```solidity
function body(bytes calldata _message) external pure returns (bytes calldata _body);
```

### origin


```solidity
function origin(bytes calldata _message) external pure returns (uint32 _origin);
```

### sender


```solidity
function sender(bytes calldata _message) external pure returns (bytes32 _sender);
```

### destination


```solidity
function destination(bytes calldata _message) external pure returns (uint32 _destination);
```

### recipient


```solidity
function recipient(bytes calldata _message) external pure returns (bytes32 _recipient);
```

### recipientAddress


```solidity
function recipientAddress(bytes calldata _message) external pure returns (address _recipient);
```

### id


```solidity
function id(bytes calldata _message) external pure returns (bytes32);
```

