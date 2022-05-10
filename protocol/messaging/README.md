---
description: A high level description of the Abacus messaging protocol
---

# Messaging

The primary purpose of the Abacus protocol is to facilitate the passing of messages from an address on one chain to an address on another chain.

Applications send and receive cross-chain messages using the Outbox and Inbox mailbox smart contracts.&#x20;

These mailboxes store checkpoints, a commitment to the contents of the mailbox in the form of a merkle root, allowing messages to be relayed efficiently from an Outbox on one chain to an Inbox on another.

## Mailboxes

The [Outbox](outbox.md) and [Inbox](inbox.md) mailboxes are smart contracts that allow application developers to send and receive cross-chain messages.

Applications can send messages to remote chains via the Outbox, and receive messages from remote chains via an Inbox. There is one Outbox and several Inboxes (one for each remote chain), on each Abacus-supported chain.

When an application sends a message to an Outbox, that message is stored in a [merkle tree](https://en.wikipedia.org/wiki/Merkle\_tree) along with every other message that has ever been sent to the Outbox.

The [Abacus validator set](../agents/validators.md) is responsible for ensuring that Outbox merkle roots get replicated to their corresponding Inbox(es). The contents of each message can then be verified against that root, and subsequently forwarded to their intended recipient.&#x20;

## Checkpoints

Merkle roots are passed between Outboxes and Inboxes via checkpoints. Checkpoints, which are simply `(merkle root, message count)` tuples, represent a commitment to the entire contents of an Outbox at a particular point in time.

To pass messages from an Outbox to an Inbox, [someone](../agents/checkpointer.md) must call `Outbox.checkpoint()`. The Outbox smart contract creates a checkpoint and writes it to storage.

The [validator set](../agents/validators.md) is responsible for observing the Outbox smart contract and signing new checkpoints as they are created. Signed checkpoints are written to a publicly viewable, highly available channel, such as [S3](https://en.wikipedia.org/wiki/Amazon\_S3) or the underlying blockchain.

Once published, these signed checkpoints can be [relayed](../agents/relayer.md) to an Inbox contract, which accepts the checkpoint if and only if it was signed by a quorum of validators.

After a checkpoint has been accepted by an Inbox, messages can be verified against the checkpoint root and forwarded to their intended recipients.

## Lifecycle

Sending and receiving a cross-chain message consists of four steps.

1. First, the message must be submitted to the Outbox on the source chain via a call to [`Outbox.dispatch()`](outbox.md#dispatch).
2. That message must then be included in a checkpoint via a call to [`Outbox.checkpoint()`](outbox.md#checkpoint).
3. That checkpoint is then signed by the validators, and the signed checkpoint is relayed to the destination chain via a call to [`Inbox.checkpoint()`](inbox.md#checkpoint).
4. Finally, the message can be sent to the recipient via a call to [`Inbox.process()`](inbox.md#process).

{% hint style="info" %}
Checkpoints commit to a history of all previous messages. Therefore, creating and relaying a checkpoint for every message is not strictly necessary. Applications looking for the lowest latency should consider checkpointing after each message, while applications that can tolerate more latency can consider amortizing the gas costs of checkpointing across multiple messages. If a single transaction dispatches multiple messages, only one checkpoint after the messages have been dispatched is necessary.
{% endhint %}

![](<../../.gitbook/assets/Untitled Diagram.drawio (1).svg>)
