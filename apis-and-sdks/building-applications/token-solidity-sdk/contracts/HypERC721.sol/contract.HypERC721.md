# HypERC721
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/HypERC721.sol)

**Inherits:**
ERC721EnumerableUpgradeable, [TokenRouter](/contracts/libs/TokenRouter.sol/abstract.TokenRouter.md)

**Author:**
Abacus Works


## Functions
### initialize

Initializes the Hyperlane router, ERC721 metadata, and mints initial supply to deployer.


```solidity
function initialize(
    address _mailbox,
    address _interchainGasPaymaster,
    uint256 _mintAmount,
    string memory _name,
    string memory _symbol
) external initializer;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_mailbox`|`address`|The address of the mailbox contract.|
|`_interchainGasPaymaster`|`address`|The address of the interchain gas paymaster contract.|
|`_mintAmount`|`uint256`|The amount of NFTs to mint to `msg.sender`.|
|`_name`|`string`|The name of the token.|
|`_symbol`|`string`|The symbol of the token.|


### _transferFromSender

*Asserts `msg.sender` is owner and burns `_tokenId`.*


```solidity
function _transferFromSender(uint256 _tokenId) internal virtual override returns (bytes memory);
```

### _transferTo

*Mints `_tokenId` to `_recipient`.*


```solidity
function _transferTo(address _recipient, uint256 _tokenId, bytes calldata) internal virtual override;
```

