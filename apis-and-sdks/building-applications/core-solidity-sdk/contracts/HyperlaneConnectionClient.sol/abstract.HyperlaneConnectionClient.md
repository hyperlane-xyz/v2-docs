# HyperlaneConnectionClient
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/HyperlaneConnectionClient.sol)

**Inherits:**
OwnableUpgradeable, [IHyperlaneConnectionClient](/contracts/interfaces/IHyperlaneConnectionClient.sol/interface.IHyperlaneConnectionClient.md)


## State Variables
### mailbox

```solidity
IMailbox public mailbox;
```


### interchainGasPaymaster

```solidity
IInterchainGasPaymaster public interchainGasPaymaster;
```


### interchainSecurityModule

```solidity
IInterchainSecurityModule public interchainSecurityModule;
```


### __GAP

```solidity
uint256[48] private __GAP;
```


## Functions
### onlyMailbox

Only accept messages from an Hyperlane Mailbox contract


```solidity
modifier onlyMailbox();
```

### onlyContract

Only accept addresses that at least have contract code


```solidity
modifier onlyContract(address _contract);
```

### __HyperlaneConnectionClient_initialize


```solidity
function __HyperlaneConnectionClient_initialize(address _mailbox) internal onlyInitializing;
```

### __HyperlaneConnectionClient_initialize


```solidity
function __HyperlaneConnectionClient_initialize(address _mailbox, address _interchainGasPaymaster)
    internal
    onlyInitializing;
```

### __HyperlaneConnectionClient_initialize


```solidity
function __HyperlaneConnectionClient_initialize(
    address _mailbox,
    address _interchainGasPaymaster,
    address _interchainSecurityModule
) internal onlyInitializing;
```

### __HyperlaneConnectionClient_initialize


```solidity
function __HyperlaneConnectionClient_initialize(
    address _mailbox,
    address _interchainGasPaymaster,
    address _interchainSecurityModule,
    address _owner
) internal onlyInitializing;
```

### setMailbox

Sets the address of the application's Mailbox.


```solidity
function setMailbox(address _mailbox) external virtual onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_mailbox`|`address`|The address of the Mailbox contract.|


### setInterchainGasPaymaster

Sets the address of the application's InterchainGasPaymaster.


```solidity
function setInterchainGasPaymaster(address _interchainGasPaymaster) external virtual onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_interchainGasPaymaster`|`address`|The address of the InterchainGasPaymaster contract.|


### setInterchainSecurityModule


```solidity
function setInterchainSecurityModule(address _module) external virtual onlyOwner;
```

### _setInterchainGasPaymaster

Sets the address of the application's InterchainGasPaymaster.


```solidity
function _setInterchainGasPaymaster(address _interchainGasPaymaster) internal onlyContract(_interchainGasPaymaster);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_interchainGasPaymaster`|`address`|The address of the InterchainGasPaymaster contract.|


### _setMailbox

Modify the contract the Application uses to validate Mailbox contracts


```solidity
function _setMailbox(address _mailbox) internal onlyContract(_mailbox);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_mailbox`|`address`|The address of the mailbox contract|


### _setInterchainSecurityModule


```solidity
function _setInterchainSecurityModule(address _module) internal;
```

## Events
### MailboxSet
Emitted when a new mailbox is set.


```solidity
event MailboxSet(address indexed mailbox);
```

### InterchainGasPaymasterSet
Emitted when a new Interchain Gas Paymaster is set.


```solidity
event InterchainGasPaymasterSet(address indexed interchainGasPaymaster);
```

### InterchainSecurityModuleSet

```solidity
event InterchainSecurityModuleSet(address indexed module);
```

