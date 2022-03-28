---
description: A high level description of important roles played in the Abacus protocol
---

# Agents

The Abacus protocol is powered by a set of four off-chain agents.

With the exception of the validators, the roles these agents play are simple, permission-less, and can be filled by anyone. For convenience, Abacus implements these agents as set of rust binaries.

1. [Checkpointers](checkpointer.md) periodically call `Outbox.checkpoint()`, which creates a new merkle root [checkpoint](../messaging/#checkpoints), allowing messages to be passed to one or more Inboxes.
2. [Validators](validators.md) sign checkpoints and make their signatures available to relayers.
3. [Relayers](relayer.md) aggregate signatures on a given checkpoint and relay it to one or more Inboxes.
4. [Processors](processor.md)  prove messages against an Inbox's accepted checkpoints and forward it to the recipient where the message is processed.
