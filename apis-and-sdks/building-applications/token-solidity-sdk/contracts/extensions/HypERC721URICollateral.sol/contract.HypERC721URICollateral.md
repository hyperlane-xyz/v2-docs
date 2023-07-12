# HypERC721URICollateral
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/extensions/HypERC721URICollateral.sol)

**Inherits:**
[HypERC721Collateral](/contracts/HypERC721Collateral.sol/contract.HypERC721Collateral.md)

**Author:**
Abacus Works


## Functions
### constructor


```solidity
constructor(address erc721) HypERC721Collateral(erc721);
```

### _transferFromSender

*Transfers `_tokenId` of `wrappedToken` from `msg.sender` to this contract.*


```solidity
function _transferFromSender(uint256 _tokenId) internal override returns (bytes memory);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes`|The URI of `_tokenId` on `wrappedToken`.|


