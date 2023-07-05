# MockCircleMessageTransmitter
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/mock/MockCircleMessageTransmitter.sol)

**Inherits:**
[ICircleMessageTransmitter](/contracts/middleware/liquidity-layer/interfaces/circle/ICircleMessageTransmitter.sol/interface.ICircleMessageTransmitter.md)


## State Variables
### processedNonces

```solidity
mapping(bytes32 => bool) processedNonces;
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

### receiveMessage


```solidity
function receiveMessage(bytes memory, bytes calldata) external pure returns (bool success);
```

### hashSourceAndNonce


```solidity
function hashSourceAndNonce(uint32 _source, uint64 _nonce) public pure returns (bytes32);
```

### process


```solidity
function process(bytes32 _nonceId, address _recipient, uint256 _amount) public;
```

### usedNonces


```solidity
function usedNonces(bytes32 _nonceId) external view returns (bool);
```

