# IRoutingIsm
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/interfaces/isms/IRoutingIsm.sol)

**Inherits:**
[IInterchainSecurityModule](/contracts/interfaces/IInterchainSecurityModule.sol/interface.IInterchainSecurityModule.md)


## Functions
### route

Returns the ISM responsible for verifying _message

*Can change based on the content of _message*


```solidity
function route(bytes calldata _message) external view returns (IInterchainSecurityModule);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_message`|`bytes`|Formatted Hyperlane message (see Message.sol).|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`IInterchainSecurityModule`|module The ISM to use to verify _message|


