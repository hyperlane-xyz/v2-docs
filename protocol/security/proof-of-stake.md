---
description: Attaching a cost to fraud
---

# Proof of stake

The Hyperlane delegated proof-of-stake protocol is designed to provide economic security to the [messaging API](../messaging/).

Unlike many other messaging protocols, Hyperlane has verifiable fraud proofs, which can be used to slash validators if they attempt to censor or falsify messages. By participating in proof-of-stake, validators attach an economic cost to these actions.&#x20;

This protocol is implemented entirely in smart contracts. An instance of these smart contracts is deployed on every Hyperlane-supported chain.

{% hint style="info" %}
Hyperlane validators validate for a single chain. Each Hyperlane-supported chain has a separate instance of proof-of-stake, which validators can participate in to provide economic security.&#x20;
{% endhint %}

Users can provide economic security by staking `ABC` tokens and delegating to one or more validators. Users can request to withdraw staked `ABC`, after which they must wait a 21 day _unbonding period_ before receiving their tokens.

Hyperlane validators are responsible for observing the `Outbox` contract on their chain and continuously signing its merkle root as new messages are sent to it.

Stakers are rewarded with newly minted `ABC`. Hyperlane mints a quantity of `ABC` tokens per epoch to be paid out as _staking rewards_. The quantity is adjustable through governance. These rewards are split proportionally to delegated stake. Validators may charge a commission on the rewards paid to their delegators.

Stake can be slashed if a validator attempts to falsify or censor messages.

