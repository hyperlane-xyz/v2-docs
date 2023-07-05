# TestMerkle
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/test/TestMerkle.sol)


## State Variables
### tree

```solidity
MerkleLib.Tree public tree;
```


## Functions
### constructor


```solidity
constructor();
```

### insert


```solidity
function insert(bytes32 _node) external;
```

### branchRoot


```solidity
function branchRoot(bytes32 _leaf, bytes32[32] calldata _proof, uint256 _index) external pure returns (bytes32 _node);
```

### count

Returns the number of inserted leaves in the tree


```solidity
function count() public view returns (uint256);
```

### root


```solidity
function root() public view returns (bytes32);
```

