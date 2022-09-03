---
description: A secure interchain messaging protocol
---

# Overview

{% hint style="info" %}
Note: The Abacus protocol is still under development. This documentation reflects the latest Abacus protocol design.

For the latest on what's been implemented and deployed to testnet(s) and mainnet(s), please take a look at the [roadmap](../resources/roadmap.md).
{% endhint %}

Abacus is a generalized interchain messaging protocol that empowers developers to send data from one blockchain to another.

Abacus provides an on-chain [API](messaging/) to send and receive interchain messages. This API is secured by a delegated [proof-of-stake](security/proof-of-stake.md) protocol combined with an application-specific approach to security called [sovereign consensus](security/sovereign-consensus.md).&#x20;

### Messaging API

The Abacus messaging API is implemented by two smart contracts, [`Outbox`](messaging/outbox.md) and  [`Inbox`](messaging/inbox.md). Developers can integrate with these contracts and use them to send and receive interchain messages.

**To send interchain messages, developers call `Outbox.dispatch()`.**

This function takes as parameters the message contents, the destination chain ID, and the recipient address.

**To receive interchain messages, developers implement `handle()`.**

The `Inbox` contract will call the `handle()` function on a message's recipient, providing as parameters the message contents, the origin chain ID, and the sender address.

### Security

The messaging API is secured by two complementary protocols.

**Proof-of-stake provides global economic security for Abacus messages.**

This protocol secures the Abacus validator set and ensures that there is an economic cost to censorship or falsification of messages.

**Sovereign consensus is an optional application-specific security protocol that complements proof-of-stake.**

This protocol **** gives application developers the option to specify an additional validator set, specific to their application. With sovereign consensus, signatures from both the global Abacus validator set and the application-specific validator set are required before messages can be delivered.&#x20;

