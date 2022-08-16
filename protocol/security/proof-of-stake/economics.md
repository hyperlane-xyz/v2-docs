---
description: A partial specification of proof-of-stake tokenomics
---

# Economics

{% hint style="info" %}
Note: The Abacus protocol is still under development. This documentation reflects the latest Abacus protocol design.

For the latest on what's been implemented and deployed to testnet(s) and mainnet(s), please take a look at the [roadmap](../../../resources/roadmap.md).
{% endhint %}

The Abacus protocol provides economic incentives that reward users for delegating their `ABC` and punish delegators for validator misbehavior.

#### Rewards

Validators and delegators are rewarded for their role in securing the network in the form of newly-minted `ABC` tokens.

The protocol specifies a governable `rewardsRate`, the number of `ABC` tokens that should be minted every epoch for each validator in the validator set.

Rewards are split between validators and their delegators. Validators receive a percentage of the rewards as a commission \[[1](economics.md#footnotes)], and the rest is transferred to their `StakingPool`, which effectively distributes rewards proportionally to delegators \[[2](economics.md#footnotes)].

The `RewardsManager` contract manages the `rewardsRate` and is responsible for distributing staking rewards to validators and their delegators. Anyone can distribute staking rewards by specifying a validator and calling `RewardsManager.reward()`.

{% hint style="warning" %}
`StakingRewards` does not have a view into the history of validator sets for previous epochs, and thus can only distribute rewards for the current epoch. `StakingRewards.reward()` should be called once every epoch for each validator in order to ensure all rewards are properly distributed.
{% endhint %}

```solidity
/**
  * @notice Mints `rewardsRate` ABC tokens and divides them proportionally between
  * _validator and its staking pool according to its commission.
  * @param _validator The validator public key.
  * @return True upon success.
  */
function reward(bytes32 _validator) external returns(bool);
```

#### Slashing

If a validator signs anything other than a valid [`Outbox`](../../messaging/outbox.md) merkle root, the stake delegated to that validator can be slashed.

Anyone can present evidence of fraud by calling `SlashingManager.slash()`.

If the evidence is accepted, the `SlashingManager` withdraws and burns half of the `ABC` held by the `StakingPool` and `WithdrawalPool`, which effectively slashes each delegator proportionally \[[3](economics.md#footnotes)].

```solidity
/**
  * @notice Checks that the validator signed an invalid checkpoint and burns ABC
  * held in its Staking and Withdrawal pools.
  * @param _validator The validator public key.
  * @param _checkpoint The signed merkle root and index.
  * @param _signature The validator's signature on the checkpoint.
  * @param _fraudulentProof A merkle proof against the fraudulent checkpoint.
  * @param _canonicalProof A merkle proof against a canonical checkpoint.
  * @return True upon success.
  */
function slash(
  bytes32 _validator,
  Checkpoint calldata _checkpoint,
  Signature calldata _signature,
  MerkleProof calldata _fraudulentProof,
  MerkleProof calldata _canonicalProof
) external returns(bool);
```

The `SlashingManager` contract exposes a governable function to modify the percentage of stake that can be slashed.

#### Footnotes

* \[1] As specified during registration
* \[2] Because the `StakingTokens` tokens held by delegators represent a proportional claim on the `ABC` held by the `StakingPool`
* \[3] Because the`StakingTokens` and `WithdrawalTokens` held by delegators represent proportional claims on the `ABC` held by the respective pools.
