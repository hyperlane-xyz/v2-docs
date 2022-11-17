---
description: A secure interchain messaging protocol
---

# Overview

{% hint style="info" %}
Note: The Hyperlane protocol is still under development. This documentation reflects the latest Hyperlane protocol design, and may not reflect what is deployed on-chain.



For the latest on what's been implemented and deployed to testnet(s) and mainnet(s), please take a look at the [roadmap](../resources/roadmap.md).
{% endhint %}

Hyperlane is a generalized interchain messaging protocol that empowers developers to send messages from one blockchain to another. Messages can contain any arbitrary bytes, and are not limited to text. They can be used to transfer any information between blockchains. They can allow you to move around value, execute function calls, and many other things that allow for the creation of interchain applications, apps that can be accessed by users on any blockchain.

Hyperlane provides an on-chain [API](messaging/) to send and receive interchain messages.

This API is secured by Hyperlane validators, who can be punished for attempting to censor or falsify messages via a delegated proof-of-stake protocol.

[Sovereign consensus](security/sovereign-consensus.md) puts control of the security model in the hands of applications.

### Messaging API

The Hyperlane messaging API is implemented by two smart contracts, [`Outbox`](messaging/outbox.md) and  [`Inbox`](messaging/inbox.md). Developers can integrate with these contracts and use them to send and receive interchain messages.

**To send interchain messages, developers call `Outbox.dispatch()`.**

This function takes as parameters the message contents, the destination chain ID, and the recipient address.

**To receive interchain messages, developers implement `handle()`.**

The `Inbox` contract will call the `handle()` function on a message's recipient, providing as parameters the message contents, the origin domain ID, and the sender address.

### Security

The messaging API is secured by two complementary protocols.

**Proof-of-stake ensures validators behave themselves**

Unlike other generalized messaging protocols, Hyperlane validators can be slashed if they attempt to censor or falsify messages.

**Sovereign consensus offers customizable security**

Hyperlane lets applications tailor security models to their needs. Use the default [Interchain Security Module](security/sovereign-consensus.md#interchain-security-modules), choose from a menu of options, or deploy and configure your own!
