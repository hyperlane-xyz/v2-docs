# HypERC20
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/HypERC20.sol)

**Inherits:**
ERC20Upgradeable, [TokenRouter](/contracts/libs/TokenRouter.sol/abstract.TokenRouter.md)

**Author:**
Abacus Works

*Supply on each chain is not constant but the aggregate supply across all chains is.*


## State Variables
### _decimals

```solidity
uint8 private immutable _decimals;
```


## Functions
### constructor


```solidity
constructor(uint8 __decimals);
```

### initialize

Initializes the Hyperlane router, ERC20 metadata, and mints initial supply to deployer.


```solidity
function initialize(
    address _mailbox,
    address _interchainGasPaymaster,
    uint256 _totalSupply,
    string memory _name,
    string memory _symbol
) external initializer;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_mailbox`|`address`|The address of the mailbox contract.|
|`_interchainGasPaymaster`|`address`|The address of the interchain gas paymaster contract.|
|`_totalSupply`|`uint256`|The initial supply of the token.|
|`_name`|`string`|The name of the token.|
|`_symbol`|`string`|The symbol of the token.|


### decimals


```solidity
function decimals() public view override returns (uint8);
```

### _transferFromSender

*Burns `_amount` of token from `msg.sender` balance.*


```solidity
function _transferFromSender(uint256 _amount) internal override returns (bytes memory);
```

### _transferTo

*Mints `_amount` of token to `_recipient` balance.*


```solidity
function _transferTo(address _recipient, uint256 _amount, bytes calldata) internal override;
```

