# MockMailbox
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/mock/MockMailbox.sol)

**Inherits:**
[Versioned](/contracts/upgrade/Versioned.sol/contract.Versioned.md)


## State Variables
### localDomain

```solidity
uint32 public immutable localDomain;
```


### MAX_MESSAGE_BODY_BYTES

```solidity
uint256 public constant MAX_MESSAGE_BODY_BYTES = 2 * 2 ** 10;
```


### outboundNonce

```solidity
uint32 public outboundNonce = 0;
```


### inboundUnprocessedNonce

```solidity
uint32 public inboundUnprocessedNonce = 0;
```


### inboundProcessedNonce

```solidity
uint32 public inboundProcessedNonce = 0;
```


### defaultIsm

```solidity
IInterchainSecurityModule public defaultIsm;
```


### remoteMailboxes

```solidity
mapping(uint32 => MockMailbox) public remoteMailboxes;
```


### inboundMessages

```solidity
mapping(uint256 => MockMessage) public inboundMessages;
```


## Functions
### constructor


```solidity
constructor(uint32 _domain);
```

### setDefaultIsm


```solidity
function setDefaultIsm(IInterchainSecurityModule _module) external;
```

### addRemoteMailbox


```solidity
function addRemoteMailbox(uint32 _domain, MockMailbox _mailbox) external;
```

### dispatch


```solidity
function dispatch(uint32 _destinationDomain, bytes32 _recipientAddress, bytes calldata _messageBody)
    external
    returns (bytes32);
```

### addInboundMessage


```solidity
function addInboundMessage(uint32 _nonce, uint32 _origin, address _sender, address _recipient, bytes calldata _body)
    external;
```

### processNextInboundMessage


```solidity
function processNextInboundMessage() public;
```

### _encode


```solidity
function _encode(MockMessage memory _message) private view returns (bytes memory);
```

### _recipientIsm


```solidity
function _recipientIsm(address _recipient) private view returns (IInterchainSecurityModule);
```

## Structs
### MockMessage

```solidity
struct MockMessage {
    uint32 nonce;
    uint32 origin;
    address sender;
    address recipient;
    bytes body;
}
```

