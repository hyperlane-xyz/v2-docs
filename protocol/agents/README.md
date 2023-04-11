---
description: The off-chain actors that power the Hyperlane protocol
---

# Agents

Like most intricate protocols, the Hyperlane protocol is operated by a set of off-chain agents. These agents are critical for the overall function of the network. In its quest for maximal decentralization, Hyperlane seeks to keep these roles permissionless, so that anyone willing and able can take an active role in operating the protocol.

For convenience, Hyperlane implements these agents as a set of Rust binaries.

1. [validators.md](validators.md "mention") sign [messaging.md](../messaging.md "mention")merkle roots, and make their signatures available to relayers.
2. [relayer.md](relayer.md "mention") aggregate off-chain metadata for [interchain-security-modules.md](../sovereign-consensus/interchain-security-modules.md "mention") and deliver messages to their recipients
3. [processor.md](processor.md "mention") observe the network for fraud by [validators.md](validators.md "mention"). If detected, watchtowers submit evidence to the origin chain, slashing the fraudulent validator(s).
