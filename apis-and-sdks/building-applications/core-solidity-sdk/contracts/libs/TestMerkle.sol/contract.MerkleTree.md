# MerkleTree
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/libs/TestMerkle.sol)


## Functions
### constructor


```solidity
constructor();
```

### hashLeafPairs


```solidity
function hashLeafPairs(bytes32 left, bytes32 right) public pure returns (bytes32 _hash);
```

### getRoot

PROOF GENERATION *


```solidity
function getRoot(bytes32[] memory data) public pure returns (bytes32);
```

### getProof


```solidity
function getProof(bytes32[] memory data, uint256 node) public pure returns (bytes32[] memory);
```

### hashLevel

*function is private to prevent unsafe data from being passed*


```solidity
function hashLevel(bytes32[] memory data) private pure returns (bytes32[] memory);
```

### log2ceil

MATH "LIBRARY" *

*Note that x is assumed > 0*


```solidity
function log2ceil(uint256 x) public pure returns (uint256);
```

### log2ceilBitMagic

Original bitmagic adapted from https://github.com/paulrberg/prb-math/blob/main/contracts/PRBMath.sol

*Note that x assumed > 1*


```solidity
function log2ceilBitMagic(uint256 x) public pure returns (uint256);
```

