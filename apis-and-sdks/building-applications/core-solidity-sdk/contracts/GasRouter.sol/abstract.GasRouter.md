# GasRouter
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/GasRouter.sol)

**Inherits:**
[Router](/contracts/Router.sol/abstract.Router.md)


## State Variables
### destinationGas

```solidity
mapping(uint32 => uint256) public destinationGas;
```


## Functions
### setDestinationGas

Sets the gas amount dispatched for each configured domain.


```solidity
function setDestinationGas(GasRouterConfig[] calldata gasConfigs) external onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`gasConfigs`|`GasRouterConfig[]`|The array of GasRouterConfig structs|


### quoteGasPayment

Returns the gas payment required to dispatch a message to the given domain's router.


```solidity
function quoteGasPayment(uint32 _destinationDomain) external view returns (uint256 _gasPayment);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_destinationDomain`|`uint32`|The domain of the router.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_gasPayment`|`uint256`|Payment computed by the registered InterchainGasPaymaster.|


### _setDestinationGas


```solidity
function _setDestinationGas(uint32 domain, uint256 gas) internal;
```

### _dispatchWithGas

Dispatches a message to an enrolled router via the local router's Mailbox
and pays for it to be relayed to the destination.

*Uses the destinationGas mapping to populate the gas amount for the message.*

*Reverts if there is no enrolled router for _destinationDomain.*


```solidity
function _dispatchWithGas(
    uint32 _destinationDomain,
    bytes memory _messageBody,
    uint256 _gasPayment,
    address _gasPaymentRefundAddress
) internal returns (bytes32 _messageId);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_destinationDomain`|`uint32`|The domain of the chain to which to send the message.|
|`_messageBody`|`bytes`|Raw bytes content of message.|
|`_gasPayment`|`uint256`|The amount of native tokens to pay for the message to be relayed.|
|`_gasPaymentRefundAddress`|`address`|The address to refund any gas overpayment to.|


### _dispatchWithGas

*Passes `msg.value` as gas payment and `msg.sender` as gas payment refund address.*

*Uses the destinationGas mapping to populate the gas amount for the message.*


```solidity
function _dispatchWithGas(uint32 _destinationDomain, bytes memory _messageBody) internal returns (bytes32 _messageId);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_destinationDomain`|`uint32`|The domain of the chain to send the message.|
|`_messageBody`|`bytes`|Raw bytes content of message.|


## Events
### DestinationGasSet
Emitted when a domain's destination gas is set.


```solidity
event DestinationGasSet(uint32 indexed domain, uint256 gas);
```

## Structs
### GasRouterConfig

```solidity
struct GasRouterConfig {
    uint32 domain;
    uint256 gas;
}
```

