# MockPortalBridge
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/mock/MockPortalBridge.sol)

**Inherits:**
[IPortalTokenBridge](/contracts/middleware/liquidity-layer/interfaces/portal/IPortalTokenBridge.sol/interface.IPortalTokenBridge.md)


## State Variables
### nextNonce

```solidity
uint256 nextNonce = 0;
```


### token

```solidity
MockToken token;
```


## Functions
### constructor


```solidity
constructor(MockToken _token);
```

### transferTokensWithPayload


```solidity
function transferTokensWithPayload(address, uint256 amount, uint16, bytes32, uint32, bytes memory)
    external
    payable
    returns (uint64 sequence);
```

### wrappedAsset


```solidity
function wrappedAsset(uint16, bytes32) external view returns (address);
```

### isWrappedAsset


```solidity
function isWrappedAsset(address) external pure returns (bool);
```

### completeTransferWithPayload


```solidity
function completeTransferWithPayload(bytes memory encodedVm) external returns (bytes memory);
```

### parseTransferWithPayload


```solidity
function parseTransferWithPayload(bytes memory encoded) external pure returns (TransferWithPayload memory transfer);
```

### adapterData


```solidity
function adapterData(uint32 _originDomain, uint224 _nonce, address _token) public pure returns (bytes memory);
```

### mockPortalVaa


```solidity
function mockPortalVaa(uint32 _originDomain, uint224 _nonce, uint256 _amount) public pure returns (bytes memory);
```

