---
description: A list of common terms in the Hyperlane protocol
---

# Glossary

<details>

<summary>Agent</summary>

Hyperlane [agents](../protocol/agents/ "mention") are off-chain actors that read and write Hyperlane smart contract state.

Example agents include [validators](../operators/validators/ "mention") and [relayer.md](../protocol/agents/relayer.md "mention").

</details>

<details>

<summary>Aggregation ISM</summary>

The [aggregation-ism.md](../protocol/sovereign-consensus/aggregation-ism.md "mention") is a type of interchain security module that aggregates security from many [sovereign-consensus](../protocol/sovereign-consensus/ "mention") (ISMs) by requiring that `m` of `n` ISMs verify a particular interchain message.

</details>

<details>

<summary>Checkpoint</summary>

A checkpoint is a (merkle root, index) tuple, corresponding to the state of the [#mailbox](glossary.md#mailbox "mention")incremental merkle tree at a particular point in time.

Checkpoints signatures by [#validator](glossary.md#validator "mention")s are used in [#multisig-ism](glossary.md#multisig-ism "mention")s.

</details>

<details>

<summary>Default ISM</summary>

The [#interchain-security-module](glossary.md#interchain-security-module "mention") that will be used to verify inbound messages if the message recipient has not specified their own ISM.\
\
See [security.md](security.md "mention") to see the current configurations.

</details>

<details>

<summary>Domain</summary>

A unique identifier for a particular chain, used by the Hyperlane protocol to determine message origin and destination.\
\
May be the same as the EVM chain ID, but isn't always. See [domains.md](domains.md "mention") for a list of known Hyperlane domain IDs.

</details>

<details>

<summary>Interchain accounts (ICA)</summary>

A [#middleware](glossary.md#middleware "mention") smart contract that allows users to make interchain smart contract calls.\
\
For example, DAOs can use interchain accounts to own contracts on remote chains.\
\
See [accounts](../apis/accounts/ "mention") for more information.

</details>

<details>

<summary>Interchain gas paymaster</summary>

A smart contract deployed by a [#relayer](glossary.md#relayer "mention") that accepts payments on an origin chain for message delivery on destination chains.\
\
See [interchain-gas-paymasters.md](../build-with-hyperlane/guides/paying-for-interchain-gas/interchain-gas-paymasters.md "mention") for more information

</details>

<details>

<summary>Interchain queries (IQS)</summary>

A [#middleware](glossary.md#middleware "mention") smart contract that allows users to make interchain view calls.\
\
For example, smart contracts can use interchain queries to look up oracle exchange rates or token balances from a remote chain.\
\
See [query.md](../apis/query.md "mention") for more information.

</details>

<details>

<summary>Interchain security module</summary>

[sovereign-consensus](../protocol/sovereign-consensus/ "mention") (ISMs) are smart contracts that provide security to Hyperlane's interchain [messaging-api](../apis/messaging-api/ "mention").\
\
ISMs are responsible for verifying that interchain messages being delivered on the destination chain were _actually sent_ on the origin chain.

</details>

<details>

<summary>Mailbox</summary>

Arguably the most important Hyperlane smart contract, the [messaging.md](../protocol/messaging.md "mention") exposes an API that developers can use to [send.md](../apis/messaging-api/send.md "mention") and [receive.md](../apis/messaging-api/receive.md "mention") interchain messages.

</details>

<details>

<summary>Middleware</summary>

A smart contract that sends and receives messages, and exposes a developer facing API. Developers are expected use this API instead of interacting directly with the [#mailbox](glossary.md#mailbox "mention"). \
\
Example middlewares include [#interchain-accounts-ica](glossary.md#interchain-accounts-ica "mention") and [#interchain-queries-iqs](glossary.md#interchain-queries-iqs "mention")

</details>

<details>

<summary>Multisig ISM</summary>

The [multisig-ism.md](../protocol/sovereign-consensus/multisig-ism.md "mention") is a type of [#interchain-security-module](glossary.md#interchain-security-module "mention") that uses `m` of `n` [#validator](glossary.md#validator "mention") signatures in order to verify a particular interchain message.

</details>

<details>

<summary>Relayer</summary>

[relayer.md](../protocol/agents/relayer.md "mention") are Hyperlane [#agent](glossary.md#agent "mention")s responsible for delivering messages to their destination chains.\
\
Relayers are untrusted, and anyone can operate a relayer.

</details>

<details>

<summary>Routing ISM</summary>

The Routing ISM is a type of [#interchain-security-module](glossary.md#interchain-security-module "mention") that defers to a different ISM depending on the message being delivered.\
\
For example, a Routing ISM could use a different ISM depending on the origin chain from which the message was sent.

</details>

<details>

<summary>Validator</summary>

[validators.md](../protocol/agents/validators.md "mention") are Hyperlane [#agent](glossary.md#agent "mention")s responsible for attesting to messages sent from an origin chain.\
\
[#multisig-ism](glossary.md#multisig-ism "mention")s use validator signatures to provide security for inbound messages.

</details>

<details>

<summary>Warp route</summary>

[deploy-warp-route](../deploy/deploy-warp-route/ "mention") are Hyperlane's take on the concept of token bridging, allowing you to permissionlessly transfer any ERC20-like asset to any chain via Hyperlane.

</details>
