# TestMultisigIsm
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/test/TestMultisigIsm.sol)

**Inherits:**
[IMultisigIsm](/contracts/interfaces/isms/IMultisigIsm.sol/interface.IMultisigIsm.md)


## State Variables
### moduleType

```solidity
uint8 public constant moduleType = uint8(IInterchainSecurityModule.Types.MERKLE_ROOT_MULTISIG);
```


### accept

```solidity
bool public accept;
```


## Functions
### constructor


```solidity
constructor();
```

### validatorsAndThreshold


```solidity
function validatorsAndThreshold(bytes calldata) external pure returns (address[] memory, uint8);
```

### setAccept


```solidity
function setAccept(bool _val) external;
```

### verify


```solidity
function verify(bytes calldata, bytes calldata) external view returns (bool);
```

