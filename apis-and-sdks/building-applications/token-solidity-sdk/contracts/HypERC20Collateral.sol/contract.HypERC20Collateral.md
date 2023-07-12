# HypERC20Collateral
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/HypERC20Collateral.sol)

**Inherits:**
[TokenRouter](/contracts/libs/TokenRouter.sol/abstract.TokenRouter.md)

**Author:**
Abacus Works


## State Variables
### wrappedToken

```solidity
IERC20 public immutable wrappedToken;
```


## Functions
### constructor

Constructor


```solidity
constructor(address erc20);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`erc20`|`address`|Address of the token to keep as collateral|


### initialize

Initializes the Hyperlane router.


```solidity
function initialize(address _mailbox, address _interchainGasPaymaster) external initializer;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_mailbox`|`address`|The address of the mailbox contract.|
|`_interchainGasPaymaster`|`address`|The address of the interchain gas paymaster contract.|


### balanceOf


```solidity
function balanceOf(address _account) external view returns (uint256);
```

### _transferFromSender

*Transfers `_amount` of `wrappedToken` from `msg.sender` to this contract.*


```solidity
function _transferFromSender(uint256 _amount) internal override returns (bytes memory);
```

### _transferTo

*Transfers `_amount` of `wrappedToken` from this contract to `_recipient`.*


```solidity
function _transferTo(address _recipient, uint256 _amount, bytes calldata) internal override;
```

