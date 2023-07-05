# MerkleLib
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/libs/Merkle.sol)

**Author:**
Celo Labs Inc.

An incremental merkle tree modeled on the eth2 deposit contract.


## State Variables
### TREE_DEPTH

```solidity
uint256 internal constant TREE_DEPTH = 32;
```


### MAX_LEAVES

```solidity
uint256 internal constant MAX_LEAVES = 2 ** TREE_DEPTH - 1;
```


### Z_0

```solidity
bytes32 internal constant Z_0 = hex"0000000000000000000000000000000000000000000000000000000000000000";
```


### Z_1

```solidity
bytes32 internal constant Z_1 = hex"ad3228b676f7d3cd4284a5443f17f1962b36e491b30a40b2405849e597ba5fb5";
```


### Z_2

```solidity
bytes32 internal constant Z_2 = hex"b4c11951957c6f8f642c4af61cd6b24640fec6dc7fc607ee8206a99e92410d30";
```


### Z_3

```solidity
bytes32 internal constant Z_3 = hex"21ddb9a356815c3fac1026b6dec5df3124afbadb485c9ba5a3e3398a04b7ba85";
```


### Z_4

```solidity
bytes32 internal constant Z_4 = hex"e58769b32a1beaf1ea27375a44095a0d1fb664ce2dd358e7fcbfb78c26a19344";
```


### Z_5

```solidity
bytes32 internal constant Z_5 = hex"0eb01ebfc9ed27500cd4dfc979272d1f0913cc9f66540d7e8005811109e1cf2d";
```


### Z_6

```solidity
bytes32 internal constant Z_6 = hex"887c22bd8750d34016ac3c66b5ff102dacdd73f6b014e710b51e8022af9a1968";
```


### Z_7

```solidity
bytes32 internal constant Z_7 = hex"ffd70157e48063fc33c97a050f7f640233bf646cc98d9524c6b92bcf3ab56f83";
```


### Z_8

```solidity
bytes32 internal constant Z_8 = hex"9867cc5f7f196b93bae1e27e6320742445d290f2263827498b54fec539f756af";
```


### Z_9

```solidity
bytes32 internal constant Z_9 = hex"cefad4e508c098b9a7e1d8feb19955fb02ba9675585078710969d3440f5054e0";
```


### Z_10

```solidity
bytes32 internal constant Z_10 = hex"f9dc3e7fe016e050eff260334f18a5d4fe391d82092319f5964f2e2eb7c1c3a5";
```


### Z_11

```solidity
bytes32 internal constant Z_11 = hex"f8b13a49e282f609c317a833fb8d976d11517c571d1221a265d25af778ecf892";
```


### Z_12

```solidity
bytes32 internal constant Z_12 = hex"3490c6ceeb450aecdc82e28293031d10c7d73bf85e57bf041a97360aa2c5d99c";
```


### Z_13

```solidity
bytes32 internal constant Z_13 = hex"c1df82d9c4b87413eae2ef048f94b4d3554cea73d92b0f7af96e0271c691e2bb";
```


### Z_14

```solidity
bytes32 internal constant Z_14 = hex"5c67add7c6caf302256adedf7ab114da0acfe870d449a3a489f781d659e8becc";
```


### Z_15

```solidity
bytes32 internal constant Z_15 = hex"da7bce9f4e8618b6bd2f4132ce798cdc7a60e7e1460a7299e3c6342a579626d2";
```


### Z_16

```solidity
bytes32 internal constant Z_16 = hex"2733e50f526ec2fa19a22b31e8ed50f23cd1fdf94c9154ed3a7609a2f1ff981f";
```


### Z_17

```solidity
bytes32 internal constant Z_17 = hex"e1d3b5c807b281e4683cc6d6315cf95b9ade8641defcb32372f1c126e398ef7a";
```


### Z_18

```solidity
bytes32 internal constant Z_18 = hex"5a2dce0a8a7f68bb74560f8f71837c2c2ebbcbf7fffb42ae1896f13f7c7479a0";
```


### Z_19

```solidity
bytes32 internal constant Z_19 = hex"b46a28b6f55540f89444f63de0378e3d121be09e06cc9ded1c20e65876d36aa0";
```


### Z_20

```solidity
bytes32 internal constant Z_20 = hex"c65e9645644786b620e2dd2ad648ddfcbf4a7e5b1a3a4ecfe7f64667a3f0b7e2";
```


### Z_21

```solidity
bytes32 internal constant Z_21 = hex"f4418588ed35a2458cffeb39b93d26f18d2ab13bdce6aee58e7b99359ec2dfd9";
```


### Z_22

```solidity
bytes32 internal constant Z_22 = hex"5a9c16dc00d6ef18b7933a6f8dc65ccb55667138776f7dea101070dc8796e377";
```


### Z_23

```solidity
bytes32 internal constant Z_23 = hex"4df84f40ae0c8229d0d6069e5c8f39a7c299677a09d367fc7b05e3bc380ee652";
```


### Z_24

```solidity
bytes32 internal constant Z_24 = hex"cdc72595f74c7b1043d0e1ffbab734648c838dfb0527d971b602bc216c9619ef";
```


### Z_25

```solidity
bytes32 internal constant Z_25 = hex"0abf5ac974a1ed57f4050aa510dd9c74f508277b39d7973bb2dfccc5eeb0618d";
```


### Z_26

```solidity
bytes32 internal constant Z_26 = hex"b8cd74046ff337f0a7bf2c8e03e10f642c1886798d71806ab1e888d9e5ee87d0";
```


### Z_27

```solidity
bytes32 internal constant Z_27 = hex"838c5655cb21c6cb83313b5a631175dff4963772cce9108188b34ac87c81c41e";
```


### Z_28

```solidity
bytes32 internal constant Z_28 = hex"662ee4dd2dd7b2bc707961b1e646c4047669dcb6584f0d8d770daf5d7e7deb2e";
```


### Z_29

```solidity
bytes32 internal constant Z_29 = hex"388ab20e2573d171a88108e79d820e98f26c0b84aa8b2f4aa4968dbb818ea322";
```


### Z_30

```solidity
bytes32 internal constant Z_30 = hex"93237c50ba75ee485f4c22adf2f741400bdf8d6a9cc7df7ecae576221665d735";
```


### Z_31

```solidity
bytes32 internal constant Z_31 = hex"8448818bb4ae4562849e949e17ac16e0be16688e156b5cf15e098c627c0056a9";
```


## Functions
### insert

Inserts `_node` into merkle tree

*Reverts if tree is full*


```solidity
function insert(Tree storage _tree, bytes32 _node) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tree`|`Tree`||
|`_node`|`bytes32`|Element to insert into tree|


### rootWithCtx

Calculates and returns`_tree`'s current root given array of zero
hashes


```solidity
function rootWithCtx(Tree storage _tree, bytes32[TREE_DEPTH] memory _zeroes) internal view returns (bytes32 _current);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tree`|`Tree`||
|`_zeroes`|`bytes32[TREE_DEPTH]`|Array of zero hashes|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_current`|`bytes32`|Calculated root of `_tree`|


### root

Calculates and returns`_tree`'s current root


```solidity
function root(Tree storage _tree) internal view returns (bytes32);
```

### zeroHashes

Returns array of TREE_DEPTH zero hashes


```solidity
function zeroHashes() internal pure returns (bytes32[TREE_DEPTH] memory _zeroes);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_zeroes`|`bytes32[TREE_DEPTH]`|Array of TREE_DEPTH zero hashes|


### branchRoot

Calculates and returns the merkle root for the given leaf
`_item`, a merkle branch, and the index of `_item` in the tree.


```solidity
function branchRoot(bytes32 _item, bytes32[TREE_DEPTH] memory _branch, uint256 _index)
    internal
    pure
    returns (bytes32 _current);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_item`|`bytes32`|Merkle leaf|
|`_branch`|`bytes32[TREE_DEPTH]`|Merkle proof|
|`_index`|`uint256`|Index of `_item` in tree|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_current`|`bytes32`|Calculated merkle root|


## Structs
### Tree
Struct representing incremental merkle tree. Contains current
branch and the number of inserted leaves in the tree.


```solidity
struct Tree {
    bytes32[TREE_DEPTH] branch;
    uint256 count;
}
```

