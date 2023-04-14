---
description: Answering the most Frequently Asked Questions about all things Hyperlane
---

# FAQ

## **What is Hyperlane?**

Hyperlane is Permissionless Interoperability layer, with a modular security architecture that enables developers to bring interoperability to any chain or app completely permissionlessly. Beyond that, it is first to introduce modular and context based security, allowing devs to choose from a menu of [sovereign-consensus](../protocol/sovereign-consensus/ "mention") and mix and match based on user actions.

Hyperlane is the interoperability layer of choice for the world of many blockchains and rollups. By allowing anyone to [deploy-hyperlane](../deploy/deploy-hyperlane/ "mention"), Hyperlane creates the first ‘network of networks’, to connect the rapidly expanding universe of chains.

Learn more: [so-what-is-hyperlane.md](../introduction/why-hyperlane/so-what-is-hyperlane.md "mention")

## **How is Hyperlane Secured?**

Hyperlane is secured through its modular security stack, Hyperlane’s major innovation in interchain security — instead of a monolithic security model forced upon all applications and chains using Hyperlane, the protocol features [sovereign-consensus](../protocol/sovereign-consensus/ "mention") (ISMs), allowing integrating developers to choose from an array security models which can be customized based on needs and preferences. They can be used dynamically based on context, such that certain user actions go through a different set of ISMs, and they can even be stacked together for additional effect — full control is in your hands.

Developers can select from a catalogue of ready-made modules, or write their own. ISMs can range from as simple as introducing designated signers required for messages to be processed to as nuanced as [Optimistic security](../protocol/sovereign-consensus/optimistic-ism.md), forcing a 12+ hour challenge period where a transaction can be blocked. Additionally, as the industry continues to make advances in security, we’ll be keeping pace and making compatible ISMs.

We no longer use the term “Sovereign Consensus”. Instead we refer to Hyperlane’s Modular Security Stack.

Learn more about Hyperlane's Security: [interchain-security-modules.md](../protocol/sovereign-consensus/interchain-security-modules.md "mention")[multisig-ism.md](../protocol/sovereign-consensus/multisig-ism.md "mention")[aggregation-ism.md](../protocol/sovereign-consensus/aggregation-ism.md "mention")[optimistic-ism.md](../protocol/sovereign-consensus/optimistic-ism.md "mention")[wormhole-ism.md](../protocol/sovereign-consensus/wormhole-ism.md "mention")

## What can I build with Hyperlane?

First and foremost you should know that you can use Hyperlane to connect your rollup or chain to other chains. Once you’ve done that, you can use [Warp Routes](../deploy/deploy-warp-route/) to bring assets over into your chain.

With respect to apps, we encourage developers to be creative with how they use Hyperlane, but some practical use cases that we think the protocol is well-suited to include:

* Minting and using natively-interchain assets
* Interchain stablecoins / CDPs
* Interchain lending
* Interchain derivatives
* Interchain governance
* Blockchain smart routing
* Blockspace auctions

## **Where is Hyperlane deployed?**

A list of known deployments can be found at [domains.md](domains.md "mention")

## **What happens when I send a message on Hyperlane?**

Full tutorial for [send.md](../apis/messaging-api/send.md "mention") and [receive.md](../apis/messaging-api/receive.md "mention") messages using Hyperlane.

Summary:

1. An application calls the `dispatch()` function on the origin chain, inserting the message into the Mailbox’s Merkle tree.
2. Hyperlane [relayer.md](../protocol/agents/relayer.md "mention") observe the dispatched messages and assemble metadata for the recipients Interchain Security Module
3. A relayer delivers the message to the recipient by calling `Mailbox.process()`. The [messaging.md](../protocol/messaging.md "mention") verifies the message with the recipient’s ISM, and calls `recipient.handle()` to deliver the message.

## **How can I see the status of a message I have sent?**

Paste an address or transaction hash into the search bar of the Hyperlane Message [explorer](../build-with-hyperlane/explorer/ "mention") to view details about a message’s status and history, from sent to finalized to validated to relayed. If the message has failed to send for some reason, there will be error messages indicating what may have gone wrong.

## **I can send interchain messages with Hyperlane — does that mean live chat/text?**

We don’t recommend using Hyperlane in this manner — it would be very expensive. When we refer to message-passing, it’s the sending of arbitrary bytes between smart contracts rather than peer-to-peer or text messaging. There are several web3 projects that are suited to your use case; consider [XMTP](https://xmtp.org/) or [Push](https://push.org/) for this type of messaging.

## **Are you a token bridge?**

Well, not exactly… Hyperlane is a [Broken link](broken-reference "mention") Protocol that allows communication between blockchains. Token bridges are just one of many types of applications that can be built on top of Hyperlane! For more ideas what can be built on Hyperlane check out the question above.

Start building on Hyperlane [getting-started.md](../introduction/getting-started.md "mention")[quickstarts](../build-with-hyperlane/quickstarts/ "mention")[examples.md](../build-with-hyperlane/examples.md "mention")

## **I’m a developer. How can my team build with Hyperlane?**

If you’re reading this FAQ, you’ve found our docs — this is a great place to start! That said, we know that questions arise during implementation, and we’re happy to help you on your way.

Our Founders and Engineering team are regularly active in the [Discord](http://discord.gg/hyperlane). Feedback from developers directly influences our product roadmap.

## **What’s Abacus Works?**

Abacus Works is the name of our legal identity. You may encounter some references to Abacus in our older posts and repositories. We made rebranding from Abacus to Hyperlane in Fall 2022. We made an effort to update our repository and docs to reflect the new Hyperlane name — but if you encounter references to Abacus, it’s the same project!

## **How can I join Hyperlane community and connect with builders and community members ?**

You can find us on [Discord](http://discord.gg/hyperlane) or [Twitter](http://twitter.com/hyperlane\_xyz) — not only are we happy to help you troubleshoot and problem-solve as you build, but we have a growing community of developers and enthusiasts who join us daily to chat about the interchain future.

For more extensive Troubleshooting check out or docs page [troubleshooting.md](../build-with-hyperlane/troubleshooting.md "mention")

## **I’m interested in joining the Hyperlane crew! How can I find out about careers?**

Share our excitement for all things Interchain and [Broken link](broken-reference "mention"). Check out Abacus Works [job openings](https://jobs.lever.co/Hyperlane)!

## How can I contribute to improve this documentation?

You can make PR to edit this documentation directly by using [following link](https://app.gitbook.com/invite/Pl1c4GYUuMTxkQTcVCdO/8Sz5qySf7rfyzypHYyuZ)!
