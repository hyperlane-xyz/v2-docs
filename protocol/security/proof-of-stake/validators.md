---
description: A partial specification of how Hyperlane validator sets are determined
---

# Validators

{% hint style="info" %}
Note: The Hyperlane protocol is still under development. This documentation reflects the latest Hyperlane protocol design.

For the latest on what's been implemented and deployed to testnet(s) and mainnet(s), please take a look at the [roadmap](../../../resources/roadmap.md).
{% endhint %}

The Hyperlane validator set composition is determined by the stake held in each `StakingPool`. Every epoch, Hyperlane broadcasts an interchain message to every remote chain to ensure that all `Inboxes` have an up-to-date view of the latest validator set.

#### Local

The current validator set is managed locally by the `LocalValidatorsManager` contract. This contract stores an [`EnumerableSet`](https://docs.openzeppelin.com/contracts/3.x/api/utils#EnumerableSet) of public keys representing the validator set for the current epoch, as well as the `threshold`, the number of validators required to reach a quorum.

During the `TransitionWindow`, a 24 hour period at the end of each epoch, anyone may propose a validator set for the upcoming epoch by calling `LocalValidatorsManager.proposeDiff()`. This proposal must contain a `ValidatorsDiff`, which specifies validators to add and remove from the current set.

Proposals are scored by calculating the minimum stake that would be required in order to achieve a quorum.&#x20;

```solidity
/**
  * @notice Proposes a diff to be applied to the validator set for the upcoming
  * epoch.
  * @dev If accepted, stores the proposal as `pendingDiff`.
  * @param _additions The public keys to be added to the validator set.
  * @param _deletions The public keys to be removed from the validator set.
  * @return True upon acceptance.
  */
function proposeDiff(
  bytes32[] calldata _additions,
  bytes32[] calldata _deletions
) external returns(uint256);
```

After the `TransitionWindow` is over, anyone may apply the change to the validator set by calling `applyDiff()`. The `LocalValidatorsManager` broadcasts an interchain message to all remote Inboxes containing the `ValidatorsDiff`, and clears the `pendingDiff`\[[1](validators.md#footnotes)].

```solidity
/**
  * @notice Applies `pendingDiff` to the current validator set, broadcasts it to
  * all `RemoteValidatorsManagers`, and clears it.
  * @return True upon success.
  */
function applyDiff() external returns(bool);
```

The `LocalValidatorsManager` contract exposes functions to modify the size of the `threshold` and the maximum validator set size, adjustable through governance.

#### Remote

The validator set for a remote chain is managed by a `RemoteValidatorsManager` contract. This contract stores an [`EnumerableSet`](https://docs.openzeppelin.com/contracts/3.x/api/utils#EnumerableSet) of public keys representing the latest validator set for which it is aware, as well as the `threshold`, the number of validators required to reach a quorum.

When the `RemoteValidatorsManager` contract receives an interchain message from its corresponding `LocalValidatorsManager`, it updates its view of the validator set accordingly.

The `RemoteValidatorsManager` contract exposes a number of view functions that can be used by an `Inbox` to check that a checkpoint was signed by a quorum of validators.

```solidity
/**
  * @notice Checks whether or not a checkpoint was signed by a quorum of validators.
  * @param _validators The public keys of the validators that signed the checkpoint.
  * @param _root The merkle root of the signed checkpoint.
  * @param _index The index of the signed checkpoint.
  * @param _signatures The validator signatures on the checkpoint.
  * @return True upon acceptance.
  */
function isQuorum(
  bytes32[] _validators,
  bytes32 _root,
  uint256 _index,
  bytes memory signatures
) public view returns (bool);

/**
  * @notice Checks whether or not a checkpoint was signed by `_publicKey`.
  * @param _publicKey The public key to verify the signature against.
  * @param _root The merkle root of the signed checkpoint.
  * @param _index The index of the signed checkpoint.
  * @param _signature A signature on the checkpoint.
  * @return Whether or not signature verification succeeded.
  */
function verifySignature(
  bytes32 _publicKey,
  bytes32 _root,
  uint256 _index,
  bytes memory _signature
) public view returns (bool);

/**
  * @notice Returns whether or not `_publicKey` is in the known validator set.
  * @param _publicKey The public key to check.
  * @return Whether or not `_publicKey` is in the known validator set.
  */
function isValidator(bytes32 _publicKey) public view returns (bool);
```



#### Footnotes

* \[1] Note that because message processing is not guaranteed to happen in order, these messages also contain an epoch number, to ensure that the `RemoteValidatorsManager` applies the change against the correct validator set. As a fallback, the `LocalValidatorsManager` exposes a function to send the entire validator set to a `RemoteValidatorsManager.`
