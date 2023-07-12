# HypERC721URIStorage
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/extensions/HypERC721URIStorage.sol)

**Inherits:**
[HypERC721](/contracts/HypERC721.sol/contract.HypERC721.md), ERC721URIStorageUpgradeable

**Author:**
Abacus Works


## Functions
### _transferFromSender

*Asserts `msg.sender` is owner and burns `_tokenId`.*


```solidity
function _transferFromSender(uint256 _tokenId) internal override returns (bytes memory _tokenURI);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_tokenURI`|`bytes`|The URI of `_tokenId`.|


### _transferTo

*Sets the URI for `_tokenId` to `_tokenURI`.*


```solidity
function _transferTo(address _recipient, uint256 _tokenId, bytes calldata _tokenURI) internal override;
```

### tokenURI


```solidity
function tokenURI(uint256 tokenId)
    public
    view
    override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
    returns (string memory);
```

### _beforeTokenTransfer


```solidity
function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
    internal
    override(ERC721EnumerableUpgradeable, ERC721Upgradeable);
```

### supportsInterface


```solidity
function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC721EnumerableUpgradeable, ERC721Upgradeable)
    returns (bool);
```

### _burn


```solidity
function _burn(uint256 tokenId) internal override(ERC721URIStorageUpgradeable, ERC721Upgradeable);
```

