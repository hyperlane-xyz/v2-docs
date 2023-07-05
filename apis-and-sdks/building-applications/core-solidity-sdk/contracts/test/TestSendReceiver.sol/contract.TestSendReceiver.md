# TestSendReceiver
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/test/TestSendReceiver.sol)

**Inherits:**
[IMessageRecipient](/contracts/interfaces/IMessageRecipient.sol/interface.IMessageRecipient.md)


## State Variables
### HANDLE_GAS_AMOUNT

```solidity
uint256 public constant HANDLE_GAS_AMOUNT = 50_000;
```


## Functions
### dispatchToSelf


```solidity
function dispatchToSelf(
    IMailbox _mailbox,
    IInterchainGasPaymaster _paymaster,
    uint32 _destinationDomain,
    bytes calldata _messageBody
) external payable;
```

### handle


```solidity
function handle(uint32, bytes32, bytes calldata) external override;
```

### previousBlockHash


```solidity
function previousBlockHash() internal view returns (bytes32);
```

## Events
### Handled

```solidity
event Handled(bytes32 blockHash);
```

