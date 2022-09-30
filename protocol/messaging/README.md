---
description: Send and receive interchain messages
---

# Message passing

The main purpose of Hyperlane is to empower developers to build applications that are connected across different blockchains, to build natively interchain applications that can serve users anywhere regardless of the blockchain they're on. To do so, we must have a way to pass information between blockchains in a secure manner. Message passing capabilities are critical to achieving this purpose.

So how does Hyperlane do it? Applications send and receive interchain messages using the [`Outbox`](outbox.md) and [`Inbox`](inbox.md) smart contracts. These mailbox contracts are deployed on every chain Hyperlane supports.

The network of mailboxes facilitates the connective tissue between blockchains that developers leverage to create interchain applications, and add interchain functionality to their existing applications. If you'd like to learn more about them, read on!&#x20;

## Mailboxes

The [`Outbox`](outbox.md) and [`Inbox`](inbox.md) contracts allow application developers to send and receive interchain messages.

There is one `Outbox` on every Hyperlane-supported chain. Applications send messages to other chains by calling `Outbox.dispatch()`. These messages are inserted into the `Outbox's` [merkle tree](https://en.wikipedia.org/wiki/Merkle\_tree).

There are `n-1` `Inboxes` on every Hyperlane-supported chain, one for every other chain. Applications receive messages via `handle()`, a function that gets called by `Inbox` contracts whenever interchain messages are being delivered.

[Validators](../agents/validators.md) are responsible for signing the latest `Outbox` merkle root on that chain. Messages can be delivered to remote `Inboxes` by providing merkle proofs against this signed root.

## Lifecycle

Sending and receiving a interchain message takes three steps:

1. An application calls [`Outbox.dispatch()`](outbox.md#dispatch)on the origin chain, inserting the message into the `Outbox's` merkle tree.
2. Validators for the origin chain sign the new merkle root.
3. A relayer delivers the message to the recipient by providing a merkle proof of the message against the signed root from step 2. The `Inbox` __ contract on the destination chain verifies the merkle proof and calls `handle()` on the message recipient.
