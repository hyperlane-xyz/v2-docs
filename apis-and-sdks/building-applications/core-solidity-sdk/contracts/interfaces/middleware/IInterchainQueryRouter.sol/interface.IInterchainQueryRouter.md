# IInterchainQueryRouter
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/interfaces/middleware/IInterchainQueryRouter.sol)


## Functions
### query


```solidity
function query(uint32 _destination, address _to, bytes memory _data, bytes memory _callback)
    external
    returns (bytes32);
```

### query


```solidity
function query(uint32 _destination, CallLib.StaticCallWithCallback[] calldata calls) external returns (bytes32);
```

