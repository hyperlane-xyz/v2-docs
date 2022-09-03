---
description: Global economic security provided by the Abacus validator set
---

# Proof of stake

The Abacus delegated proof-of-stake protocol secures the global Abacus validator set and ensures that there is an economic cost to censorship or falsification of messages.

This protocol is implemented entirely in smart contracts. An instance of these smart contracts is deployed on every Abacus-supported chain.

{% hint style="info" %}
Each Abacus-supported chain has its own validator set, and runs its own instance of proof-of-stake. For clarity and simplicity, the documentation describes a single instance of the protocol.
{% endhint %}

Users determine and secure the validator set by staking their `ABC` tokens and delegating them to one or more validators. Users can request to withdraw staked `ABC`, after which they must wait a 21 day _unbonding period_ before receiving their tokens.

The validators that have received the most delegated stake make up the _validator set_. The validator set is adjusted every _epoch_ during the _transition window,_ during which any user can propose a change to the validator set. At the end of the transition window, the highest scoring change is accepted and broadcast to each of the remote chains.

Abacus validators are responsible for observing the `Outbox` contract on their chain and continuously signing its merkle root as new messages are sent to it.

Users that stake `ABC` are rewarded with newly minted `ABC`. Abacus mints a quantity of `ABC` tokens per epoch to be paid out as _staking rewards_. The quantity is adjustable through governance. These rewards are split proportionally between users that delegated to the elected validator set. Validators may charge a commission on the rewards paid to their delegators.

Delegated stake can be slashed if a validator attempts to falsify or censor messages.

