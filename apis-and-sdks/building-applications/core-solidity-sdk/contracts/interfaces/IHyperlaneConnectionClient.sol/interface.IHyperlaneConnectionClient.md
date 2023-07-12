# IHyperlaneConnectionClient
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/interfaces/IHyperlaneConnectionClient.sol)

**Inherits:**
[ISpecifiesInterchainSecurityModule](/contracts/interfaces/IInterchainSecurityModule.sol/interface.ISpecifiesInterchainSecurityModule.md)


## Functions
### mailbox


```solidity
function mailbox() external view returns (IMailbox);
```

### interchainGasPaymaster


```solidity
function interchainGasPaymaster() external view returns (IInterchainGasPaymaster);
```

### setMailbox


```solidity
function setMailbox(address) external;
```

### setInterchainGasPaymaster


```solidity
function setInterchainGasPaymaster(address) external;
```

### setInterchainSecurityModule


```solidity
function setInterchainSecurityModule(address) external;
```

