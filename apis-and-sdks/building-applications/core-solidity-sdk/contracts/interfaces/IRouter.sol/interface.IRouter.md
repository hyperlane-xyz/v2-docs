# IRouter
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/interfaces/IRouter.sol)


## Functions
### domains


```solidity
function domains() external view returns (uint32[] memory);
```

### routers


```solidity
function routers(uint32 _domain) external view returns (bytes32);
```

### enrollRemoteRouter


```solidity
function enrollRemoteRouter(uint32 _domain, bytes32 _router) external;
```

### enrollRemoteRouters


```solidity
function enrollRemoteRouters(uint32[] calldata _domains, bytes32[] calldata _routers) external;
```

