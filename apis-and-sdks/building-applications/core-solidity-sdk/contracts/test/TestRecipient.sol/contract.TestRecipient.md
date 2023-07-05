# TestRecipient
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/test/TestRecipient.sol)

**Inherits:**
Ownable, [IMessageRecipient](/contracts/interfaces/IMessageRecipient.sol/interface.IMessageRecipient.md), [ISpecifiesInterchainSecurityModule](/contracts/interfaces/IInterchainSecurityModule.sol/interface.ISpecifiesInterchainSecurityModule.md)


## State Variables
### interchainSecurityModule

```solidity
IInterchainSecurityModule public interchainSecurityModule;
```


### lastSender

```solidity
bytes32 public lastSender;
```


### lastData

```solidity
bytes public lastData;
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
### handle


```solidity
function handle(uint32 _origin, bytes32 _sender, bytes calldata _data) external virtual override;
```

### fooBar


```solidity
function fooBar(uint256 amount, string calldata message) external;
```

### setInterchainSecurityModule


```solidity
function setInterchainSecurityModule(address _ism) external onlyOwner;
```

## Events
### ReceivedMessage

```solidity
event ReceivedMessage(uint32 indexed origin, bytes32 indexed sender, string message);
```

### ReceivedCall

```solidity
event ReceivedCall(address indexed caller, uint256 amount, string message);
```

