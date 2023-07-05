# AbstractRoutingIsm
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/isms/routing/AbstractRoutingIsm.sol)

**Inherits:**
[IRoutingIsm](/contracts/interfaces/isms/IRoutingIsm.sol/interface.IRoutingIsm.md)


## State Variables
### moduleType

```solidity
uint8 public constant moduleType = uint8(IInterchainSecurityModule.Types.ROUTING);
```


## Functions
### route

Returns the ISM responsible for verifying _message

*Can change based on the content of _message*


```solidity
function route(bytes calldata _message) public view virtual returns (IInterchainSecurityModule);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_message`|`bytes`|Formatted Hyperlane message (see Message.sol).|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`IInterchainSecurityModule`|module The ISM to use to verify _message|


### verify

Routes _metadata and _message to the correct ISM


```solidity
function verify(bytes calldata _metadata, bytes calldata _message) public returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_metadata`|`bytes`|ABI encoded module metadata|
|`_message`|`bytes`|Formatted Hyperlane message (see Message.sol).|


