# MockHyperlaneEnvironment
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/mock/MockHyperlaneEnvironment.sol)


## State Variables
### originDomain

```solidity
uint32 originDomain;
```


### destinationDomain

```solidity
uint32 destinationDomain;
```


### mailboxes

```solidity
mapping(uint32 => MockMailbox) public mailboxes;
```


### igps

```solidity
mapping(uint32 => TestInterchainGasPaymaster) public igps;
```


### isms

```solidity
mapping(uint32 => IInterchainSecurityModule) public isms;
```


### queryRouters

```solidity
mapping(uint32 => InterchainQueryRouter) public queryRouters;
```


## Functions
### constructor


```solidity
constructor(uint32 _originDomain, uint32 _destinationDomain);
```

### processNextPendingMessage


```solidity
function processNextPendingMessage() public;
```

### processNextPendingMessageFromDestination


```solidity
function processNextPendingMessageFromDestination() public;
```

