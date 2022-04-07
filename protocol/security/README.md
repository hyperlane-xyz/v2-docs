---
description: A high level description of how Abacus messaging is secured
---

# Security

Abacus cross-chain messages are secured by two [complementary](https://en.wikipedia.org/wiki/Swiss\_cheese\_model) modules.

First, the Abacus validator set is secured by a [proof-of-stake](proof-of-stake.md) protocol, which incentivizes validators to transfer the contents of an [Outbox](../messaging/outbox.md) to an [Inbox](../messaging/inbox.md) by signing [checkpoints](../messaging/#checkpoints).

Second, applications can optionally specify [sovereign consensus](sovereign-consensus.md) rules, which determine whether or not they accept a message from an Inbox. This ensures applications remain [safe](https://en.wikipedia.org/wiki/Safety\_property) even in the event of a compromised validator set.

## Proof of stake

Abacus implements a delegated proof-of-stake protocol entirely in smart contracts. An instance of these smart contracts is deployed on every Abacus-supported chain.

This protocol determines the validator set responsible for signing [checkpoints](../messaging/#checkpoints), allowing the contents of an [Outbox](../messaging/outbox.md) to be sent to an [Inbox](../messaging/inbox.md) on a remote chain.

Much as in other delegated proof-of-stake protocols, users are incentivized to delegate their tokens to validators to earn staking rewards. Delegated stake may be slashed if a validator signs anything other than a valid checkpoint.

[Read more](proof-of-stake.md) about proof-of-stake.&#x20;

## Sovereign consensus

Sovereign consensus allows applications to optionally specify rules under which they accept messages from an Inbox. This allows applications to provision additional security _beyond_ what the Abacus proof-of-stake protocol already provides. Furthermore, it allows for failures to be isolated within "zones of sovereignty", preventing a single failure from cascading throughout the protocol.

To leverage sovereign consensus, applications designate a sovereign smart contract that can define arbitrary logic for determining whether a given cross-chain message should be accepted.

A simple example implementation of sovereign consensus is to require additional signatures on checkpoints beyond the Abacus validator set. An application's DAO can appoint a set of reputable and incentive aligned guardians, and require a quorum of guardians to sign a checkpoint in their sovereign contract before processing the corresponding messages.

More complex implementations may consider the contents of messages or the current application state.

[Read more](sovereign-consensus.md) about sovereign consensus.
