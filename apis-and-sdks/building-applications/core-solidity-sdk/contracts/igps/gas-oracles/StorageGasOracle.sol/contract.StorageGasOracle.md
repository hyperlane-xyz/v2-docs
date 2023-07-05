# StorageGasOracle
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/igps/gas-oracles/StorageGasOracle.sol)

**Inherits:**
[IGasOracle](/contracts/interfaces/IGasOracle.sol/interface.IGasOracle.md), Ownable

A gas oracle that uses data stored within the contract.

*This contract is intended to be owned by an address that will
update the stored remote gas data.*


## State Variables
### remoteGasData
Keyed by remote domain, gas data on that remote domain.


```solidity
mapping(uint32 => IGasOracle.RemoteGasData) public remoteGasData;
```


## Functions
### getExchangeRateAndGasPrice

Returns the stored `remoteGasData` for the `_destinationDomain`.


```solidity
function getExchangeRateAndGasPrice(uint32 _destinationDomain)
    external
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


### setRemoteGasDataConfigs

Sets the remote gas data for many remotes at a time.


```solidity
function setRemoteGasDataConfigs(RemoteGasDataConfig[] calldata _configs) external onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_configs`|`RemoteGasDataConfig[]`|The configs to use when setting the remote gas data.|


### setRemoteGasData

Sets the remote gas data using the values in `_config`.


```solidity
function setRemoteGasData(RemoteGasDataConfig calldata _config) external onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_config`|`RemoteGasDataConfig`|The config to use when setting the remote gas data.|


### _setRemoteGasData

Sets the remote gas data using the values in `_config`.


```solidity
function _setRemoteGasData(RemoteGasDataConfig calldata _config) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_config`|`RemoteGasDataConfig`|The config to use when setting the remote gas data.|


## Events
### RemoteGasDataSet
Emitted when an entry in `remoteGasData` is set.


```solidity
event RemoteGasDataSet(uint32 indexed remoteDomain, uint128 tokenExchangeRate, uint128 gasPrice);
```

## Structs
### RemoteGasDataConfig

```solidity
struct RemoteGasDataConfig {
    uint32 remoteDomain;
    uint128 tokenExchangeRate;
    uint128 gasPrice;
}
```

