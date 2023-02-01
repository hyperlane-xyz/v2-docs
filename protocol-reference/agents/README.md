---
description: The off-chain actors that power the Hyperlane protocol
---

# Agents

Like most intricate protocols, the Hyperlane protocol is operated by a set of off-chain agents. These agents are critical for the overall function of the network. In its quest for maximal decentralization, Hyperlane seeks to keep these roles permissionless, so that anyone willing and able can take an active role in operating the protocol.

For convenience, Hyperlane implements these agents as a set of Rust binaries.

1. [Validators](validators.md) sign`Mailbox` merkle roots and and make their signatures available to relayers.
2. [Relayers](relayer.md) aggregate the off-chain metadata needed to deliver messages (e.g. validator signatures and merkle proofs) and submit them to `Mailboxes`, delivering interchain messages to their recipients.
3. [Watchtowers](processor.md) observe the network for validator fraud. If detected, watchtowers submit evidence to the source chain, slashing the fraudulent validator(s).
