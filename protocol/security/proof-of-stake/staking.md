---
description: A partial specification of the staking contracts
---

# Staking

{% hint style="info" %}
Note: The Hyperlane protocol is still under development. This documentation reflects the latest Hyperlane protocol design.

For the latest on what's been implemented and deployed to testnet(s) and mainnet(s), please take a look at the [roadmap](../../../resources/roadmap.md).
{% endhint %}

#### Registration

To be eligible to receive token delegations, validators must first register their public key on the `StakingRegistry`. To register, validators provide a proof-of-possession of their private key \[[1](staking.md#footnotes)] and specify a commission as a percentage of staking rewards.

Each registered validator has a corresponding `StakingPool` contract, responsible for managing `ABC` tokens delegated to that validator.

```solidity
/**
  * @notice Registers the validator's public key and deploys staking and withdrawal
  * pools.
  * @param _publicKey The validator's public key.
  * @param _pop A proof-of-possession of the validator's private key.
  * @param _commission The validator's staking reward commission.
  * @return Returns true upon success.
  */
function register(
  G1Point calldata _publicKey,
  Signature calldata _pop,
  uint256 _commission
) external returns (bool);
```

#### Delegation

Users can delegate to a validator by calling `StakingPool.delegate()`, which transfers `ABC` tokens from the user to the pool. In return, the user receives `ERC20`-compatible `StakingTokens`, representing their proportional share of the `ABC` held by the pool \[[2](staking.md#undefined)].

These `StakingTokens` represent a proportional claim on the `ABC` held by the `StakingPool`.

```solidity
/**
  * @notice Delegates `amount` ABC to the pool's validator.
  * @param _amount The amount of ABC to delegate.
  * @return Returns the number of StakingTokens minted to msg.sender.
  */
function delegate(uint256 _amount) external returns (uint256);
```

#### Withdrawals

Users can withdraw their stake from a pool by calling `StakingPool.withdraw()`, which burns the user's `StakingTokens` and transfers the corresponding share of the pool's `ABC`  to the validator's `WithdrawalPool`.

The `WithdrawalPool` mints an `ERC721`-compatible `WithdrawalToken` to the user, representing the user's proportional share of `ABC` in the `WithdrawalPool` and the timestamp when that share can be withdrawn \[[3](staking.md#footnotes)].

```solidity
/**
  * @notice Withdraws ABC from the StakingPool and deposits it in the
  * WithdrawalPool.
  * @param _amount The amount of StakingTokens to burn.
  * @return The amount of ABC transferred to the staking pool.
  * @return The ID of the WithdrawalToken minted to msg.sender
  */
function withdraw(uint256 _amount) external returns (uint256, uint256);
```

Users can withdraw their `ABC` by calling `WithdrawalPool.withdraw()`, which checks the timestamp on their `WithdrawalToken`, burns it, and transfers the corresponding share of the pool's `ABC` to the user.

```solidity
/**
  * @notice Withdraws ABC from the WithdrawalPool.
  * @param _id The ID of the WithdrawalToken.
  * @return The amount of ABC transferred to msg.sender.
  */
function withdraw(uint256 _id) external returns (uint256);
```

#### Footnotes

* \[1] To protect against [rogue key attacks](https://rist.tech.cornell.edu/papers/pkreg.html)
* \[2] In other words, the user's share of the total supply of `StakingTokens` is equal to the share of `ABC` they contributed to the pool at the time of delegation.
* \[3] 21 days later
