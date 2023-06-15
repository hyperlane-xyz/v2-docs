---
description: Answering the most frequently asked questions about all things Hyperlane
---

# FAQ

<details>

<summary>What is Hyperlane?</summary>

Hyperlane is the first universal and permissionless interoperability framework built for the modular blockchain stack.&#x20;

Anyone can [deploy-hyperlane.md](../deploy/deploy-hyperlane.md "mention") to any blockchain environment, whether it is a layer 1, rollup, or app-chain, allowing that chain to communicate seamlessly with any other chain on which Hyperlane has been deployed.

</details>

<details>

<summary>What are the benefits of using Hyperlane for blockchain developers?</summary>

Hyperlane offers benefits for both blockchain and dapp developers.

For blockchain developers, a Hyperlane deployment expands accessibility to users, assets, and valuable state from other connected blockchains on which Hyperlane has been deployed.

For dapp developers, Hyperlane provides seamless connectivity across multiple blockchains, allowing developers to create interchain network effects and liquidity and users to interact with applications from their preferred chain.

</details>

<details>

<summary>How is Hyperlane secured?</summary>

Hyperlane is secured by its modular security stack featuring [sovereign-consensus](../protocol/sovereign-consensus/ "mention") (ISMs). Developers can configure various pre-built ISMs, compose them with each other, or even create custom ISMs based on their application's needs.

A modular approach to security ensures that Hyperlane will continue to stay up to the latest industry advances in security models.

</details>

<details>

<summary>Who are the Hyperlane validators?</summary>

Hyperlane is secured with a modular security stack featuring [sovereign-consensus](../protocol/sovereign-consensus/ "mention") (ISMs).

There is no protocol-enshrined security model, let alone validator set.\
\
That said, most Hyperlane deployments are configured with a [#default-ism](glossary.md#default-ism "mention"), which specifies the security model to use if the message recipient has not specified an ISM override.\
\
See [security.md](security.md "mention") for more information

</details>

<details>

<summary>What can I build with Hyperlane?</summary>

Hyperlane's [messaging-api](../apis/messaging-api/ "mention") allows dapp developers to send arbitrary bytes between smart contracts on different chains. This can be used to create interchain applications, dapps which span multiple chains.

For inspiration, take a look at some of the pre-built applications built on top of Hyperlane, including:

* The [warp-api.md](../apis-and-sdks/warp-api.md "mention"), which lets users move tokens from one chain to another
* The [accounts.md](../apis-and-sdks/accounts.md "mention"), which lets users make interchain function calls
* The [query.md](../apis/query.md "mention"), which lets users make interchain view calls
* Other [examples.md](../build-with-hyperlane/examples.md "mention") built on top of Hyperlane

</details>

<details>

<summary>Where is Hyperlane deployed?</summary>

A list of known deployments can be found at [domains.md](domains.md "mention")

</details>

<details>

<summary>What happens when I send a message on Hyperlane?</summary>

See the [send.md](../apis/messaging-api/send.md "mention") and [receive.md](../apis/messaging-api/receive.md "mention") pages for more details

Summary:

1. An application calls the `dispatch()` function on the origin chain, inserting the message into the [messaging.md](../protocol/messaging.md "mention")'s Merkle tree.
2. Hyperlane [relayer.md](../protocol/agents/relayer.md "mention") observe the dispatched messages and assemble metadata for the recipient's Interchain Security Module (ISM)
3. A relayer delivers the message to the recipient by calling `Mailbox.process()`. The [messaging.md](../protocol/messaging.md "mention") verifies the message with the recipient’s ISM, and calls `recipient.handle()` to deliver the message.

</details>

<details>

<summary>How can I see the status of a message I have sent?</summary>

Paste an address or transaction hash into the search bar of the Hyperlane Message [explorer](../build-with-hyperlane/explorer/ "mention") to view details about a message’s status and history.

If the message has failed to send for some reason, there will be error messages indicating what may have gone wrong.\
\
See [troubleshooting.md](../build-with-hyperlane/troubleshooting.md "mention") for more information on how to debug an undelivered message

</details>

<details>

<summary>I can send interchain messages with Hyperlane — does that mean live chat/text?</summary>

Hyperlane is a protocol designed to allow smart contracts on different chains to interact with each other.

When we refer to message-passing, it’s the sending of arbitrary bytes between smart contracts rather than peer-to-peer or text messaging. There are several web3 projects that are suited to the chat use case; consider [XMTP](https://xmtp.org/) or [Push](https://push.org/) for this type of messaging.

</details>

<details>

<summary>Is Hyperlane a token bridge?</summary>

Not exactly. Hyperlane is a protocol that allows communication between blockchains.&#x20;

Token bridges are just one of many types of applications that can be built on top of Hyperlane!\
\
For more ideas what can be built on Hyperlane check out [#what-can-i-build-with-hyperlane](faq.md#what-can-i-build-with-hyperlane "mention")\


</details>

<details>

<summary>I’m a developer. How can my team build with Hyperlane?</summary>

If you’re reading this FAQ, you’ve found the docs — this is a great place to start! That said, we know that questions arise during implementation, and we’re happy to help you on your way.

The Hyperlane community is regularly active in the [Discord](http://discord.gg/hyperlane). Feedback from developers directly influences the product roadmap.

</details>

<details>

<summary>What is Abacus Works?</summary>

Abacus Works is the name of a legal identity working on Hyperlane.

You may encounter some references to Abacus in older posts and repositories. Hyperlane rebranded from Abacus to Hyperlane in Fall 2022.

</details>

<details>

<summary>How can I join the Hyperlane community?</summary>

You join the [Discord](http://discord.gg/hyperlane) or follow Hyperlane [Twitter](http://twitter.com/hyperlane\_xyz) where you can find a growing community of developers and enthusiasts to chat about the interchain future.

</details>

<details>

<summary>I'm interested in working on Hyperlane, where can I see job openings?</summary>

Share the excitement for all things interchain. Check out Abacus Works [job openings](https://jobs.lever.co/Hyperlane)!

</details>

<details>

<summary>How can I contribute to improve this documentation?</summary>

You can make a PR to edit this documentation directly via the [docs repo](https://github.com/hyperlane-xyz/docs)

</details>
