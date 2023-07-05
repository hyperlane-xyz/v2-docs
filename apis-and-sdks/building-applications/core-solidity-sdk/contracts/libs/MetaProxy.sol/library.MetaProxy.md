# MetaProxy
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/libs/MetaProxy.sol)

*Adapted from https://eips.ethereum.org/EIPS/eip-3448*


## State Variables
### PREFIX

```solidity
bytes32 private constant PREFIX = hex"600b380380600b3d393df3363d3d373d3d3d3d60368038038091363936013d73";
```


### SUFFIX

```solidity
bytes13 private constant SUFFIX = hex"5af43d3d93803e603457fd5bf3";
```


## Functions
### bytecode


```solidity
function bytecode(address _implementation, bytes memory _metadata) internal pure returns (bytes memory);
```

### metadata


```solidity
function metadata() internal pure returns (bytes memory);
```

