# IInterchainAccountRouter
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/interfaces/middleware/IInterchainAccountRouter.sol)


## Functions
### callRemote


```solidity
function callRemote(uint32 _destination, address _to, uint256 _value, bytes calldata _data)
    external
    returns (bytes32);
```

### callRemote


```solidity
function callRemote(uint32 _destination, CallLib.Call[] calldata calls) external returns (bytes32);
```

### callRemoteWithOverrides


```solidity
function callRemoteWithOverrides(uint32 _destination, bytes32 _router, bytes32 _ism, CallLib.Call[] calldata calls)
    external
    returns (bytes32);
```

### getLocalInterchainAccount


```solidity
function getLocalInterchainAccount(uint32 _origin, bytes32 _router, bytes32 _owner, address _ism)
    external
    view
    returns (OwnableMulticall);
```

### getLocalInterchainAccount


```solidity
function getLocalInterchainAccount(uint32 _origin, address _router, address _owner, address _ism)
    external
    view
    returns (OwnableMulticall);
```

### getRemoteInterchainAccount


```solidity
function getRemoteInterchainAccount(address _router, address _owner, address _ism) external view returns (address);
```

### getRemoteInterchainAccount


```solidity
function getRemoteInterchainAccount(uint32 _destination, address _owner) external view returns (address);
```

