# ITokenMessenger
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/middleware/liquidity-layer/interfaces/circle/ITokenMessenger.sol)


## Functions
### depositForBurn

Deposits and burns tokens from sender to be minted on destination domain.
Emits a `DepositForBurn` event.

*reverts if:
- given burnToken is not supported
- given destinationDomain has no TokenMessenger registered
- transferFrom() reverts. For example, if sender's burnToken balance or approved allowance
to this contract is less than `amount`.
- burn() reverts. For example, if `amount` is 0.
- MessageTransmitter returns false or reverts.*


```solidity
function depositForBurn(uint256 _amount, uint32 _destinationDomain, bytes32 _mintRecipient, address _burnToken)
    external
    returns (uint64 _nonce);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_amount`|`uint256`|amount of tokens to burn|
|`_destinationDomain`|`uint32`|destination domain (ETH = 0, AVAX = 1)|
|`_mintRecipient`|`bytes32`|address of mint recipient on destination domain|
|`_burnToken`|`address`|address of contract to burn deposited tokens, on local domain|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_nonce`|`uint64`|unique nonce reserved by message|


### depositForBurnWithCaller

Deposits and burns tokens from sender to be minted on destination domain. The mint
on the destination domain must be called by `_destinationCaller`.
WARNING: if the `_destinationCaller` does not represent a valid address as bytes32, then it will not be possible
to broadcast the message on the destination domain. This is an advanced feature, and the standard
depositForBurn() should be preferred for use cases where a specific destination caller is not required.
Emits a `DepositForBurn` event.

*reverts if:
- given destinationCaller is zero address
- given burnToken is not supported
- given destinationDomain has no TokenMessenger registered
- transferFrom() reverts. For example, if sender's burnToken balance or approved allowance
to this contract is less than `amount`.
- burn() reverts. For example, if `amount` is 0.
- MessageTransmitter returns false or reverts.*


```solidity
function depositForBurnWithCaller(
    uint256 _amount,
    uint32 _destinationDomain,
    bytes32 _mintRecipient,
    address _burnToken,
    bytes32 _destinationCaller
) external returns (uint64 _nonce);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_amount`|`uint256`|amount of tokens to burn|
|`_destinationDomain`|`uint32`|destination domain|
|`_mintRecipient`|`bytes32`|address of mint recipient on destination domain|
|`_burnToken`|`address`|address of contract to burn deposited tokens, on local domain|
|`_destinationCaller`|`bytes32`|caller on the destination domain, as bytes32|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_nonce`|`uint64`|unique nonce reserved by message|


## Events
### MessageSent

```solidity
event MessageSent(bytes message);
```

