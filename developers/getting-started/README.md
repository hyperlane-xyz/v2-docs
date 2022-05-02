---
description: Everything you need to build your first interchain application
---

# Getting started

Abacus makes interchain communication simple and straightforward.

_**Looking for a tutorial?**_** ** Keep reading for a step-by-step walkthrough of how to build your first interchain application using Abacus

_**Ready to dive in?**_ Use the [template repo](https://github.com/abacus-network/abacus-app-template) to quickly get started with everything you need&#x20;

_**Not sure what to build?**_ Take a look at some [example applications](../examples/) to see what you can do

_**Have questions?**_ We'd love to answer them! Ask us on [discord](https://discord.com/invite/KBD3aD78Bb), reach out on [twitter](https://twitter.com/Abacus\_Network), or ping us on Telegram

## Building with Abacus

Abacus aims to be the simplest platform for building interchain applications, i.e. applications that send and receive messages to and from multiple blockchains.

Abacus provides a simple API for interchain communication that application developers can integrate. In the end, building an interchain application is as simple as writing a smart contract that sends messages to an Abacus [`Outbox`](../../protocol/messaging/outbox.md) and receives messages from an Abacus [`Inbox`](../../protocol/messaging/inbox.md).

In addition to this API, Abacus provides a suite of developer tools, including:

* A [template repo](https://github.com/abacus-network/abacus-app-template) with everything you need to get started
* A [mix-in smart contract](../advanced/abacusconnectionclient.sol.md) that your application can inherit from
* A [hardhat plugin](https://www.npmjs.com/package/@abacus-network/hardhat) for unit testing interchain applications
* [An SDK](build-your-sdk.md) for interacting with multiple blockchains
* Multi-chain [deployment tooling](deploy-your-app.md)
* A number of [example applications](../examples/)
