---
description: The off-chain actors that power the Abacus protocol
---

# Agents

The Abacus protocol is operated by a set of off-chain agents.

For convenience, Abacus implements these agents as set of Rust binaries.

1. [Validators](validators.md) sign`Outbox` merkle roots and and make their signatures available to relayers.
2. [Relayers](relayers.md) aggregate validator signatures and submit merkle proofs to `Inboxes`, delivering interchain messages to their recipients.
3. Watchtowers observe the network for validator fraud. If detected, watchtowers submit evidence to the source chain, slashing the fraudulent validator(s).
