---
description: Attaching a cost to fraud
---

# Proof of stake

The Hyperlane delegated proof-of-stake protocol is designed to provide economic security to the [messaging API](../messaging/).

Unlike many other messaging protocols, Hyperlane has [verifiable fraud proofs](proof-of-stake.md#undefined), which can be used to slash validators if they attempt to censor or falsify messages. By participating in proof-of-stake, validators attach an economic cost to these actions.&#x20;

This protocol is implemented entirely in smart contracts. An instance of these smart contracts is deployed on every Hyperlane-supported chain.

{% hint style="info" %}
Hyperlane validators validate for a single chain. Each Hyperlane-supported chain has a separate instance of proof-of-stake, which validators can participate in to provide economic security.&#x20;
{% endhint %}

Users can provide economic security by staking `ABC` tokens and delegating to one or more validators. Users can request to withdraw staked `ABC`, after which they must wait a 21 day _unbonding period_ before receiving their tokens.

Hyperlane validators are responsible for watching the `Outbox` contract on their chain and continuously signing its merkle root as new messages are sent to it.

Stakers are rewarded with newly minted `ABC`. Hyperlane mints a quantity of `ABC` tokens per epoch to be paid out as _staking rewards_. The quantity is adjustable through governance. These rewards are split proportionally to delegated stake. Validators may charge a commission on the rewards paid to their delegators.

Stake can be slashed if a validator attempts to falsify or censor messages.

### Verifiable Fraud Proofs

A key feature of the Hyperlane protocol is that unlike other externally validated protocols, a validator that engages in fraud a verifiable fraud proof can be submitted by a [Watchtower](../agents/processor.md), leading to their stake being slashed. In other protocols it is common for a validator's stake to live on a separate blockchain from the origin chain they are validating messages for. What this means is that in order for a fraudulent validator to have their stake slashed, the same message passing protocol must relay a message to the chain where the stake lives. You can see the problem with this right? The same validator set where fraud occurred is the mechanism by which evidence of that fraud is delivered, what could go wrong?

Hyperlane doesn't want to allow for that possibility, thus in Hyperlane validators must keep their bonded stake on the origin chain for which they are validating. This means fraud proofs are verifiable. The record of fraud that is examined for slashing exists in the same environment as the stake to be slashed, leaving no room for error with the process of fraud proofs.&#x20;

_Note: the ticker for the Hyperlane protocol token will likely change, ABC is used as a placeholder._

