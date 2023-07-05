# InterchainAccountIsm
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/isms/routing/InterchainAccountIsm.sol)

**Inherits:**
[AbstractRoutingIsm](/contracts/isms/routing/AbstractRoutingIsm.sol/abstract.AbstractRoutingIsm.md)


## State Variables
### mailbox

```solidity
IMailbox private immutable mailbox;
```


## Functions
### constructor


```solidity
constructor(address _mailbox);
```

### route

Returns the ISM responsible for verifying _message


```solidity
function route(bytes calldata _message) public view virtual override returns (IInterchainSecurityModule);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_message`|`bytes`|Formatted Hyperlane message (see Message.sol).|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`IInterchainSecurityModule`|module The ISM to use to verify _message|


