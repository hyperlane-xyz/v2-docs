# IMailbox
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/interfaces/IMailbox.sol)


## Functions
### localDomain


```solidity
function localDomain() external view returns (uint32);
```

### delivered


```solidity
function delivered(bytes32 messageId) external view returns (bool);
```

### defaultIsm


```solidity
function defaultIsm() external view returns (IInterchainSecurityModule);
```

### dispatch


```solidity
function dispatch(uint32 _destinationDomain, bytes32 _recipientAddress, bytes calldata _messageBody)
    external
    returns (bytes32);
```

### process


```solidity
function process(bytes calldata _metadata, bytes calldata _message) external;
```

### count


```solidity
function count() external view returns (uint32);
```

### root


```solidity
function root() external view returns (bytes32);
```

### latestCheckpoint


```solidity
function latestCheckpoint() external view returns (bytes32, uint32);
```

### recipientIsm


```solidity
function recipientIsm(address _recipient) external view returns (IInterchainSecurityModule);
```

## Events
### Dispatch
Emitted when a new message is dispatched via Hyperlane


```solidity
event Dispatch(address indexed sender, uint32 indexed destination, bytes32 indexed recipient, bytes message);
```

### DispatchId
Emitted when a new message is dispatched via Hyperlane


```solidity
event DispatchId(bytes32 indexed messageId);
```

### ProcessId
Emitted when a Hyperlane message is processed


```solidity
event ProcessId(bytes32 indexed messageId);
```

### Process
Emitted when a Hyperlane message is delivered


```solidity
event Process(uint32 indexed origin, bytes32 indexed sender, address indexed recipient);
```

