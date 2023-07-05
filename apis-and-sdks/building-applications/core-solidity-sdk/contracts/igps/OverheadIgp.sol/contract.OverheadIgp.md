# OverheadIgp
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/igps/OverheadIgp.sol)

**Inherits:**
[IInterchainGasPaymaster](/contracts/interfaces/IInterchainGasPaymaster.sol/interface.IInterchainGasPaymaster.md), Ownable

An IGP that adds configured gas overheads to gas amounts and forwards
calls to an "inner" IGP.

*The intended use of this contract is to store overhead gas amounts for destination
domains, e.g. Mailbox and/or ISM gas usage, such that users of this IGP are only required
to specify the gas amount used by their own applications.*


## State Variables
### innerIgp
The IGP that is called when paying for or quoting gas
after applying overhead gas amounts.


```solidity
IInterchainGasPaymaster public immutable innerIgp;
```


### destinationGasOverhead
Destination domain => overhead gas amount on that domain.


```solidity
mapping(uint32 => uint256) public destinationGasOverhead;
```


## Functions
### constructor


```solidity
constructor(address _innerIgp);
```

### payForGas

Adds the stored destinationGasOverhead to the _gasAmount and forwards the
call to the innerIgp's `payForGas` function.


```solidity
function payForGas(bytes32 _messageId, uint32 _destinationDomain, uint256 _gasAmount, address _refundAddress)
    external
    payable;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_messageId`|`bytes32`|The ID of the message to pay for.|
|`_destinationDomain`|`uint32`|The domain of the message's destination chain.|
|`_gasAmount`|`uint256`|The amount of destination gas to pay for. This should not consider any gas that is accounted for in the stored destinationGasOverhead.|
|`_refundAddress`|`address`|The address to refund any overpayment to.|


### setDestinationGasOverheads

Sets destination gas overheads for multiple domains.

*Only callable by the owner.*


```solidity
function setDestinationGasOverheads(DomainConfig[] calldata configs) external onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`configs`|`DomainConfig[]`|A list of destination domains and gas overheads.|


### quoteGasPayment

Adds the stored destinationGasOverhead to the _gasAmount and forwards the
call to the innerIgp's `quoteGasPayment` function.


```solidity
function quoteGasPayment(uint32 _destinationDomain, uint256 _gasAmount) public view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_destinationDomain`|`uint32`|The domain of the message's destination chain.|
|`_gasAmount`|`uint256`|The amount of destination gas to pay for. This should not consider any gas that is accounted for in the stored destinationGasOverhead.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The amount of native tokens required to pay for interchain gas.|


### destinationGasAmount

Returns the stored destinationGasOverhead added to the _gasAmount.

*If there is no stored destinationGasOverhead, 0 is used.*


```solidity
function destinationGasAmount(uint32 _destinationDomain, uint256 _gasAmount) public view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_destinationDomain`|`uint32`|The domain of the message's destination chain.|
|`_gasAmount`|`uint256`|The amount of destination gas to pay for. This should not consider any gas that is accounted for in the stored destinationGasOverhead.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The stored destinationGasOverhead added to the _gasAmount.|


### _setDestinationGasOverhead

Sets the destination gas overhead for a single domain.


```solidity
function _setDestinationGasOverhead(DomainConfig calldata config) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`config`|`DomainConfig`|The destination domain and gas overhead.|


## Events
### DestinationGasOverheadSet
Emitted when an entry in the destinationGasOverhead mapping is set.


```solidity
event DestinationGasOverheadSet(uint32 indexed domain, uint256 gasOverhead);
```

## Structs
### DomainConfig

```solidity
struct DomainConfig {
    uint32 domain;
    uint256 gasOverhead;
}
```

