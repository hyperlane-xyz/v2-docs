# HypNative
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/HypNative.sol)

**Inherits:**
[TokenRouter](/contracts/libs/TokenRouter.sol/abstract.TokenRouter.md)

**Author:**
Abacus Works

*Supply on each chain is not constant but the aggregate supply across all chains is.*


## Functions
### initialize

Initializes the Hyperlane router, ERC20 metadata, and mints initial supply to deployer.


```solidity
function initialize(address _mailbox, address _interchainGasPaymaster) external initializer;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_mailbox`|`address`|The address of the mailbox contract.|
|`_interchainGasPaymaster`|`address`|The address of the interchain gas paymaster contract.|


### transferRemote

Transfers `_amountOrId` token to `_recipient` on `_destination` domain.

*uses (`msg.value` - `_amount`) as interchain gas payment and `msg.sender` as refund address.*


```solidity
function transferRemote(uint32 _destination, bytes32 _recipient, uint256 _amount)
    public
    payable
    override
    returns (bytes32 messageId);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_destination`|`uint32`|The identifier of the destination chain.|
|`_recipient`|`bytes32`|The address of the recipient on the destination chain.|
|`_amount`|`uint256`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`messageId`|`bytes32`|The identifier of the dispatched message.|


### balanceOf


```solidity
function balanceOf(address _account) external view returns (uint256);
```

### _transferFromSender

*No-op because native amount is transferred in `msg.value`*

*Compiler will not include this in the bytecode.*


```solidity
function _transferFromSender(uint256) internal pure override returns (bytes memory);
```

### _transferTo

*Sends `_amount` of native token to `_recipient` balance.*


```solidity
function _transferTo(address _recipient, uint256 _amount, bytes calldata) internal override;
```

