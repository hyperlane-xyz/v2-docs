# MinimalProxy
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/libs/MinimalProxy.sol)


## State Variables
### PREFIX

```solidity
bytes20 private constant PREFIX = hex"3d602d80600a3d3981f3363d3d373d3d3d363d73";
```


### SUFFIX

```solidity
bytes15 private constant SUFFIX = hex"5af43d82803e903d91602b57fd5bf3";
```


## Functions
### create


```solidity
function create(address implementation) internal returns (address proxy);
```

### bytecode


```solidity
function bytecode(address implementation) internal pure returns (bytes memory);
```

