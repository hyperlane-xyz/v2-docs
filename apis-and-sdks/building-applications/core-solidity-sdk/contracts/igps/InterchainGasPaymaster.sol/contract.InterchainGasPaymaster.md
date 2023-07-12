# InterchainGasPaymaster
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/igps/InterchainGasPaymaster.sol)

**Inherits:**
[IInterchainGasPaymaster](/contracts/interfaces/IInterchainGasPaymaster.sol/interface.IInterchainGasPaymaster.md), [IGasOracle](/contracts/interfaces/IGasOracle.sol/interface.IGasOracle.md), OwnableUpgradeable

Manages payments on a source chain to cover gas costs of relaying
messages to destination chains.


## State Variables
### TOKEN_EXCHANGE_RATE_SCALE
The scale of gas oracle token exchange rates.


```solidity
uint256 internal constant TOKEN_EXCHANGE_RATE_SCALE = 1e10;
```


### gasOracles
Keyed by remote domain, the gas oracle to use for the domain.


```solidity
mapping(uint32 => IGasOracle) public gasOracles;
```


### beneficiary
The benficiary that can receive native tokens paid into this contract.


```solidity
address public beneficiary;
```


## Functions
### initialize


```solidity
function initialize(address _owner, address _beneficiary) public initializer;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_owner`|`address`|The owner of the contract.|
|`_beneficiary`|`address`|The beneficiary.|


### payForGas

Deposits msg.value as a payment for the relaying of a message
to its destination chain.

*Overpayment will result in a refund of native tokens to the _refundAddress.
Callers should be aware that this may present reentrancy issues.*


```solidity
function payForGas(bytes32 _messageId, uint32 _destinationDomain, uint256 _gasAmount, address _refundAddress)
    external
    payable
    override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_messageId`|`bytes32`|The ID of the message to pay for.|
|`_destinationDomain`|`uint32`|The domain of the message's destination chain.|
|`_gasAmount`|`uint256`|The amount of destination gas to pay for.|
|`_refundAddress`|`address`|The address to refund any overpayment to.|


### claim

Transfers the entire native token balance to the beneficiary.

*The beneficiary must be able to receive native tokens.*


```solidity
function claim() external;
```

### setGasOracles

Sets the gas oracles for remote domains specified in the config array.


```solidity
function setGasOracles(GasOracleConfig[] calldata _configs) external onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_configs`|`GasOracleConfig[]`|An array of configs including the remote domain and gas oracles to set.|


### setBeneficiary

Sets the beneficiary.


```solidity
function setBeneficiary(address _beneficiary) external onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_beneficiary`|`address`|The new beneficiary.|


### quoteGasPayment

Quotes the amount of native tokens to pay for interchain gas.


```solidity
function quoteGasPayment(uint32 _destinationDomain, uint256 _gasAmount)
    public
    view
    virtual
    override
    returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_destinationDomain`|`uint32`|The domain of the message's destination chain.|
|`_gasAmount`|`uint256`|The amount of destination gas to pay for.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The amount of native tokens required to pay for interchain gas.|


### getExchangeRateAndGasPrice

Gets the token exchange rate and gas price from the configured gas oracle
for a given destination domain.


```solidity
function getExchangeRateAndGasPrice(uint32 _destinationDomain)
    public
    view
    override
    returns (uint128 tokenExchangeRate, uint128 gasPrice);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_destinationDomain`|`uint32`|The destination domain.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`tokenExchangeRate`|`uint128`|The exchange rate of the remote native token quoted in the local native token.|
|`gasPrice`|`uint128`|The gas price on the remote chain.|


### _setBeneficiary

Sets the beneficiary.


```solidity
function _setBeneficiary(address _beneficiary) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_beneficiary`|`address`|The new beneficiary.|


### _setGasOracle

Sets the gas oracle for a remote domain.


```solidity
function _setGasOracle(uint32 _remoteDomain, address _gasOracle) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_remoteDomain`|`uint32`|The remote domain.|
|`_gasOracle`|`address`|The gas oracle.|


## Events
### GasOracleSet
Emitted when the gas oracle for a remote domain is set.


```solidity
event GasOracleSet(uint32 indexed remoteDomain, address gasOracle);
```

### BeneficiarySet
Emitted when the beneficiary is set.


```solidity
event BeneficiarySet(address beneficiary);
```

## Structs
### GasOracleConfig

```solidity
struct GasOracleConfig {
    uint32 remoteDomain;
    address gasOracle;
}
```

