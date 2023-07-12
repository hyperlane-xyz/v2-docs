# TestMailbox
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/test/TestMailbox.sol)

**Inherits:**
[Mailbox](/contracts/Mailbox.sol/contract.Mailbox.md)


## Functions
### constructor


```solidity
constructor(uint32 _localDomain) Mailbox(_localDomain);
```

### proof


```solidity
function proof() external view returns (bytes32[32] memory);
```

### testHandle


```solidity
function testHandle(uint32 _origin, bytes32 _sender, bytes32 _recipient, bytes calldata _body) external;
```

