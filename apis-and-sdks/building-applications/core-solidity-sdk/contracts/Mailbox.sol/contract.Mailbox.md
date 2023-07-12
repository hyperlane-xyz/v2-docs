# Mailbox
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/Mailbox.sol)

**Inherits:**
[IMailbox](/contracts/interfaces/IMailbox.sol/interface.IMailbox.md), OwnableUpgradeable, [PausableReentrancyGuardUpgradeable](/contracts/PausableReentrancyGuard.sol/abstract.PausableReentrancyGuardUpgradeable.md), [Versioned](/contracts/upgrade/Versioned.sol/contract.Versioned.md)


## State Variables
### MAX_MESSAGE_BODY_BYTES

```solidity
uint256 public constant MAX_MESSAGE_BODY_BYTES = 2 * 2 ** 10;
```


### localDomain

```solidity
uint32 public immutable localDomain;
```


### defaultIsm

```solidity
IInterchainSecurityModule public defaultIsm;
```


### tree

```solidity
MerkleLib.Tree public tree;
```


### delivered

```solidity
mapping(bytes32 => bool) public delivered;
```


### __GAP

```solidity
uint256[47] private __GAP;
```


## Functions
### constructor


```solidity
constructor(uint32 _localDomain);
```

### initialize


```solidity
function initialize(address _owner, address _defaultIsm) external initializer;
```

### setDefaultIsm

Sets the default ISM for the Mailbox.


```solidity
function setDefaultIsm(address _module) external onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_module`|`address`|The new default ISM. Must be a contract.|


### dispatch

Dispatches a message to the destination domain & recipient.


```solidity
function dispatch(uint32 _destinationDomain, bytes32 _recipientAddress, bytes calldata _messageBody)
    external
    override
    notPaused
    returns (bytes32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_destinationDomain`|`uint32`|Domain of destination chain|
|`_recipientAddress`|`bytes32`|Address of recipient on destination chain as bytes32|
|`_messageBody`|`bytes`|Raw bytes content of message body|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes32`|The message ID inserted into the Mailbox's merkle tree|


### process

Attempts to deliver `_message` to its recipient. Verifies
`_message` via the recipient's ISM using the provided `_metadata`.


```solidity
function process(bytes calldata _metadata, bytes calldata _message) external override nonReentrantAndNotPaused;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_metadata`|`bytes`|Metadata used by the ISM to verify `_message`.|
|`_message`|`bytes`|Formatted Hyperlane message (refer to Message.sol).|


### root

Calculates and returns tree's current root


```solidity
function root() public view returns (bytes32);
```

### count

Returns the number of inserted leaves in the tree


```solidity
function count() public view returns (uint32);
```

### latestCheckpoint

Returns a checkpoint representing the current merkle tree.


```solidity
function latestCheckpoint() external view returns (bytes32, uint32);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes32`|root The root of the Mailbox's merkle tree.|
|`<none>`|`uint32`|index The index of the last element in the tree.|


### pause

Pauses mailbox and prevents further dispatch/process calls

*Only `owner` can pause the mailbox.*


```solidity
function pause() external onlyOwner;
```

### unpause

Unpauses mailbox and allows for message processing.

*Only `owner` can unpause the mailbox.*


```solidity
function unpause() external onlyOwner;
```

### isPaused

Returns whether mailbox is paused.


```solidity
function isPaused() external view returns (bool);
```

### recipientIsm

Returns the ISM to use for the recipient, defaulting to the
default ISM if none is specified.


```solidity
function recipientIsm(address _recipient) public view returns (IInterchainSecurityModule);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_recipient`|`address`|The message recipient whose ISM should be returned.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`IInterchainSecurityModule`|The ISM to use for `_recipient`.|


### _setDefaultIsm

Sets the default ISM for the Mailbox.


```solidity
function _setDefaultIsm(address _module) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_module`|`address`|The new default ISM. Must be a contract.|


## Events
### DefaultIsmSet
Emitted when the default ISM is updated


```solidity
event DefaultIsmSet(address indexed module);
```

### Paused
Emitted when Mailbox is paused


```solidity
event Paused();
```

### Unpaused
Emitted when Mailbox is unpaused


```solidity
event Unpaused();
```

