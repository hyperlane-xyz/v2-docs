# IPortalTokenBridge
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/middleware/liquidity-layer/interfaces/portal/IPortalTokenBridge.sol)


## Functions
### transferTokensWithPayload


```solidity
function transferTokensWithPayload(
    address token,
    uint256 amount,
    uint16 recipientChain,
    bytes32 recipient,
    uint32 nonce,
    bytes memory payload
) external payable returns (uint64 sequence);
```

### completeTransferWithPayload


```solidity
function completeTransferWithPayload(bytes memory encodedVm) external returns (bytes memory);
```

### parseTransferWithPayload


```solidity
function parseTransferWithPayload(bytes memory encoded) external pure returns (TransferWithPayload memory transfer);
```

### wrappedAsset


```solidity
function wrappedAsset(uint16 tokenChainId, bytes32 tokenAddress) external view returns (address);
```

### isWrappedAsset


```solidity
function isWrappedAsset(address token) external view returns (bool);
```

## Events
### ContractUpgraded

```solidity
event ContractUpgraded(address indexed oldContract, address indexed newContract);
```

## Structs
### Transfer

```solidity
struct Transfer {
    uint8 payloadID;
    uint256 amount;
    bytes32 tokenAddress;
    uint16 tokenChain;
    bytes32 to;
    uint16 toChain;
    uint256 fee;
}
```

### TransferWithPayload

```solidity
struct TransferWithPayload {
    uint8 payloadID;
    uint256 amount;
    bytes32 tokenAddress;
    uint16 tokenChain;
    bytes32 to;
    uint16 toChain;
    bytes32 fromAddress;
    bytes payload;
}
```

### AssetMeta

```solidity
struct AssetMeta {
    uint8 payloadID;
    bytes32 tokenAddress;
    uint16 tokenChain;
    uint8 decimals;
    bytes32 symbol;
    bytes32 name;
}
```

### RegisterChain

```solidity
struct RegisterChain {
    bytes32 module;
    uint8 action;
    uint16 chainId;
    uint16 emitterChainID;
    bytes32 emitterAddress;
}
```

### UpgradeContract

```solidity
struct UpgradeContract {
    bytes32 module;
    uint8 action;
    uint16 chainId;
    bytes32 newContract;
}
```

### RecoverChainId

```solidity
struct RecoverChainId {
    bytes32 module;
    uint8 action;
    uint256 evmChainId;
    uint16 newChainId;
}
```

