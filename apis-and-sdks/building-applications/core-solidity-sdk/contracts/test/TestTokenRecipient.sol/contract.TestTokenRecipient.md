# TestTokenRecipient
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/test/TestTokenRecipient.sol)

**Inherits:**
[ILiquidityLayerMessageRecipient](/contracts/interfaces/ILiquidityLayerMessageRecipient.sol/interface.ILiquidityLayerMessageRecipient.md)


## State Variables
### lastSender

```solidity
bytes32 public lastSender;
```


### lastData

```solidity
bytes public lastData;
```


### lastToken

```solidity
address public lastToken;
```


### lastAmount

```solidity
uint256 public lastAmount;
```


### lastCaller

```solidity
address public lastCaller;
```


### lastCallMessage

```solidity
string public lastCallMessage;
```


## Functions
### handleWithTokens


```solidity
function handleWithTokens(uint32 _origin, bytes32 _sender, bytes calldata _data, address _token, uint256 _amount)
    external
    override;
```

### fooBar


```solidity
function fooBar(uint256 amount, string calldata message) external;
```

## Events
### ReceivedMessage

```solidity
event ReceivedMessage(uint32 indexed origin, bytes32 indexed sender, string message, address token, uint256 amount);
```

### ReceivedCall

```solidity
event ReceivedCall(address indexed caller, uint256 amount, string message);
```

