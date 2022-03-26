---
description: A description of the Abacus proof-of-stake protocol
---

# Proof of stake

The Abacus proof-of-stake protocol is responsible for determining and securing the validator set responsible for passing messages from the [Outbox](../messaging/outbox.md) on a source chain to an [Inbox](../messaging/inbox.md) on a destination chain.

This protocol is implemented entirely in smart contracts. An instance of these smart contracts is deployed on every Abacus-supported chain.

{% hint style="info" %}
Each Abacus-supported chain has its own validator set, and runs its own instance of proof-of-stake. For clarity and simplicity, the following documentation describes a single instance of the protocol.
{% endhint %}

## Staking

#### Registration

To be eligible to receive delegations, validators must first register their public key on the `StakingRegistry.` To register, validators provide a proof-of-possession of their private key \[footnote: To protect against [rogue key attacks](https://rist.tech.cornell.edu/papers/pkreg.html)] and specify a commission as a percentage of staking rewards.

Each registered validator has a corresponding `StakingPool` contract, responsible for managing ABC tokens delegated to that validator.

#### Delegation

Users can delegate to a validator by calling `StakingPool.delegate()`, which transfers `ABC` tokens from the user to the pool. In return, the user receives `ERC20`-compatible `StakingTokens`, representing their proportional share of the `ABC` held by the pool. \[footnote: In other words, the users share of the total supply of `PoolTokens` is equal to the share of `ABC` they contributed to the pool at the time of delegation.]

These `StakingTokens` represent a pro-rata claim on the `ABC` held by the `StakingPool`.

#### Withdrawals

Users can withdraw their stake from a pool by calling `StakingPool.withdraw()`, which burns the user's `StakingTokens` and transfers the corresponding share of the pool's `ABC`  to the validator's `WithdrawalPool`.

The `WithdrawalPool` mints an `ERC721`-compatible `WithdrawalToken` to the user, representing the user's proportional share of `ABC` in the `WithdrawalPool` and the timestamp at which that share can be withdrawn \[footnote: 21 days later].

Users can withdraw their `ABC` by calling `WithdrawalPool.withdraw()`, which checks the timestamp on their `WithdrawalToken`, burns it, and transfers the corresponding share of the pool's `ABC` to the user.

## Epochs

Abacus partitions time up into `Epochs`, a period of time during which the validator set remains fixed. Epochs are numbered, and the length of an epoch is a [governable](../governance/) parameter of the protocol.

Epochs are tracked by the `EpochManager` contract, which exposes functions to modify the length of an epoch, and to query a particular epoch's start and end timestamps.

## Economics

The Abacus protocol provides economic incentives that reward users for delegating their `ABC` and that punish delegators for validator misbehavior.

#### Rewards

Validators and delegators are rewarded for their role in securing the network in the form of newly-minted `ABC` tokens.

The protocol specifies a governable `rewardsRate`, the number of `ABC` tokens that should be minted every epoch for each validator in the validator set.

Rewards are split between validators and their delegators. Validators receive a percentage of the rewards as a commission \[footnote: as specified during registration], and the rest is transferred to their `StakingPool`, which effectively distributes rewards pro-rata to delegators \[footnote: Because the `StakingTokens` tokens held by delegators represent a pro-rata claim on the `ABC` held by the `StakingPool`].

The `RewardsManager` contract manages the `rewardsRate` and is responsible for distributing staking rewards to validators and their delegators. Anyone can distribute staking rewards by specifying a validator and calling `RewardsManager.reward()`.&#x20;

{% hint style="warning" %}
`StakingRewards` does not have a view into the history of validator sets for previous epochs, and thus can only distribute rewards for the current epoch. `StakingRewards.reward()` should be called once for each validator, every epoch, in order to ensure all rewards are properly distributed.&#x20;
{% endhint %}

#### Slashing

If a validator signs anything other than a valid [Outbox](../messaging/outbox.md) [checkpoint](../messaging/#checkpoints), the stake delegated to that validator can be slashed.

Anyone can present evidence in the form of a signed checkpoint by calling `SlashingManager.slash()`. The contract verifies the signature, checks that the checkpoint is not present in the Outbox, and that this evidence has not already been presented to the `SlashingManager`.

If the evidence is accepted, the `SlashingManager` withdraws and burns half of the `ABC` held by the `StakingPool` and `WithdrawalPool`, which effectively slashes each delegator pro-rata.\[footnote: Because the`StakingTokens` and `WithdrawalTokens` held by delegators represent pro-rata claims on the `ABC` held by the respective pools.]

The `SlashingManager` contract exposes a governable function to modify the percentage of stake that can be slashed.

## Validators

The composition of the Abacus validator set is determined by the stake held in each `StakingPool`. Every epoch, Abacus broadcasts a cross-chain message to remote chains to ensure that all Inboxes have an up-to-date view of the latest validator set.

#### Local

The current validator set is managed locally by the `LocalValidatorsManager` contract. This contract stores an [`EnumerableSet`](https://docs.openzeppelin.com/contracts/3.x/api/utils#EnumerableSet) of public keys representing the validator set for the current epoch, as well as the `threshold`, the number of validators required to reach a quorum.

During the `TransitionWindow`, a 24 hour period at the end of each epoch, anyone may propose a validator set for the upcoming epoch by calling `LocalValidatorsManager.proposeDiff()`. This proposal must contain a `ValidatorsDiff`, which specifies validators to add and remove from the current set.

Proposals are scored by calculating the minimum stake that would be required in order to achieve a quorum. At any given time, the proposal that has scored highest for the next epoch is stored as  `LocalValidatorsManager.pendingDiff`.

After the `TransitionWindow` is over, anyone may call `LocalValidatorsManager.applyDiff()`. The `LocalValidatorsManager` broadcasts a cross-chain message to all remote Inboxes containing the `ValidatorsDiff`, and clears the `pendingDiff`. \[footnote: Note that because message processing is not guaranteed to happen in order, these messages also contain an epoch number, to ensure that the `RemoteValidatorsManager` applies the diff against the correct validator set. As a fallback, the `LocalValidatorsManager` exposes a function to send the entire validator set to a `RemoteValidatorsManager`.`]`&#x20;

The `LocalValidatorsManager` contract exposes governable functions to modify the size of the `threshold` and the maximum validator set size.

#### Remote

The validator set for a remote chain is managed by a `RemoteValidatorsManager` contract. This contract stores an [`EnumerableSet`](https://docs.openzeppelin.com/contracts/3.x/api/utils#EnumerableSet) of public keys representing the latest validator set for which it is aware, as well as the `threshold`, the number of validators required to reach a quorum.

When the `RemoteValidatorsManager` contract receives a cross-chain message from its corresponding `LocalValidatorsManager`, it updates its view of the validator set accordingly.

The `RemoteValidatorsManager` contract exposes `isValidator()`, `isSignature()`, and `isQuorum()` view functions. These can be used by an Inbox to check that a checkpoint was signed by a quorum of validators.&#x20;
