# TestQuery
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/test/TestQuery.sol)


## State Variables
### router

```solidity
InterchainQueryRouter public router;
```


## Functions
### constructor


```solidity
constructor(address _router);
```

### queryRouterOwner

*Fetches owner of InterchainQueryRouter on provided domain and passes along with provided secret to `this.receiveRouterOwner`*


```solidity
function queryRouterOwner(uint32 domain, uint256 secret) external;
```

### receiveRouterOwner

*`msg.sender` must be restricted to `this.router` to prevent any local account from spoofing query data.*


```solidity
function receiveRouterOwner(uint256 secret, address owner) external;
```

## Events
### Owner

```solidity
event Owner(uint256, address);
```

