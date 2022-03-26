---
description: A high level description of the Abacus messaging protocol
---

# Messaging

The primary purpose of the Abacus protocol is to facilitate the passing of messages from an address on one chain to an address on another chain.

Applications send and receive cross-chain messages using the Outbox and Inbox mailbox smart contracts.&#x20;

These mailboxes store checkpoints, a commitment to the contents of the mailbox, allowing messages to be relayed efficiently from an Outbox on one chain to an Inbox on another.

## Mailboxes

The [Outbox](outbox.md) and [Inbox](inbox.md) mailboxes are smart contracts that allow application developers to send and receive cross-chain messages.

Applications can send messages to remote chains via the Outbox, and receive messages from remote chains via an Inbox. There is one Outbox and several Inboxes (one for each remote chain), on each Abacus-supported chain.

When an application sends a message to an Outbox, that message is stored in a [merkle tree](https://en.wikipedia.org/wiki/Merkle\_tree) along with every other message that has ever been sent to the Outbox.

The [Abacus validator set](../agents/validator.md) is responsible for ensuring that Outbox merkle roots get replicated to their corresponding Inbox(es). The contents of each message can then be proven against that root, and forwarded to their intended recipient.&#x20;

## Checkpoints

Merkle roots are passed between Outboxes and Inboxes via checkpoints. Checkpoints, which are simply `(merkle root, message count)` tuples, represent a commitment to the entire contents of an Outbox at a particular point in time.

To pass messages from an Outbox to an Inbox, [someone](../agents/checkpointer.md) must call `Outbox.checkpoint()`. The Outbox smart contract creates a checkpoint and writes it to storage.

The [validator set](../agents/validator.md) is responsible for observing the Outbox smart contract and signing new checkpoints as they're created. The signed checkpoints then get written to a publicly viewable channel, such as [IPFS](https://ipfs.io) or [S3](https://en.wikipedia.org/wiki/Amazon\_S3).

The signed checkpoint can then be [relayed](../agents/relayer.md) to an Inbox contract, which accepts the checkpoint if and only if it was signed by a quorum of validators.

After a checkpoint has been accepted by an Inbox, messages can be proved against the checkpoint root and forwarded to their intended recipients.
