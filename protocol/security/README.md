---
description: The protocols that secure the messaging API
---

# Security

The Abacus messaging API is secured by two [complementary](https://en.wikipedia.org/wiki/Swiss\_cheese\_model) protocols.

A [proof-of-stake](proof-of-stake.md) protocol determines and secures the global Abacus validator set. Proof-of-stake provides _economic security_, ensuring that there is an economic cost to censorship or falsification of messages.

[Sovereign consensus](sovereign-consensus.md) gives applications the _option_ to run their own validator sets in parallel to the global set. This insulates applications from dependence on the proof-of-stake protocol for security and gives applications the power to customize parameters on app-level interchain transactions.

## Proof of stake

The Abacus delegated proof-of-stake protocol secures the global Abacus validator set and ensures that there is an economic cost to censorship or falsification of messages.

The validator set is responsible for observing and signing an `Outbox's` merkle root, which allows its contents to be delivered to `Inboxes` on remote chains.

Users are incentivized to delegate their `ABC` tokens to validators to earn staking rewards. Delegated stake may be slashed if a validator signs a fraudulent root.

[Read more](proof-of-stake.md) about proof-of-stake.&#x20;

## Sovereign consensus

Sovereign consensus gives applications the _option_ to specify their own validator sets that operate in parallel with the global set.

Applications can use sovereign consensus for _reputational security_ by specifying a validator set comprised of known and incentive-aligned actors.

In order for a message to be delivered to an application, a quorum of both the global and sovereign validator sets must sign a merkle root that contains that message.

Individual messages can only be censored or falsified if a quorum of **both** the proof-of-stake and sovereign consensus validator sets are compromised.

[Read more](sovereign-consensus.md) about sovereign consensus.

