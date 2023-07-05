# IInterchainSecurityModule
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/interfaces/IInterchainSecurityModule.sol)


## Functions
### moduleType

Returns an enum that represents the type of security model
encoded by this ISM.

*Relayers infer how to fetch and format metadata.*


```solidity
function moduleType() external view returns (uint8);
```

### verify

Defines a security model responsible for verifying interchain
messages based on the provided metadata.


```solidity
function verify(bytes calldata _metadata, bytes calldata _message) external returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_metadata`|`bytes`|Off-chain metadata provided by a relayer, specific to the security model encoded by the module (e.g. validator signatures)|
|`_message`|`bytes`|Hyperlane encoded interchain message|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|True if the message was verified|


## Enums
### Types

```solidity
enum Types {
    NULL,
    ROUTING,
    AGGREGATION,
    LEGACY_MULTISIG,
    MERKLE_ROOT_MULTISIG,
    MESSAGE_ID_MULTISIG,
    OPTIMISM
}
```

