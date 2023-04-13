---
description: Create interchain applications with the Hyperlane Application SDK
---

# Hyperlane App Framework

Hyperlane provides an optional framework that helps developers create and manage applications built on top of interchain smart contracts. It is designed primarily for applications which leverage the shared state model and symmetric communication patterns such as the [Router](../../sdks/building-applications/writing-contracts/router.md) pattern. Note that this is a more fully feature abstraction that requires a learning curve. If you are just looking to try out Hyperlane, we recommend for you to look at the [getting-started.md](../../introduction/getting-started.md "mention") page with the [quickstarts](../../build-with-hyperlane/quickstarts/ "mention") first.

### Solidity SDK

The classes in the [`@hyperlane-xyz/core`](https://www.npmjs.com/package/@hyperlane-xyz/core) package help you write interchain contracts intended to be deployed on multiple networks.

### NodeJS SDK

The classes in the [`@hyperlane-xyz/sdk`](https://www.npmjs.com/package/@hyperlane-xyz/sdk) package help you manage and interact with Hyperlane applications on multiple networks. The building experience is familiar to smart contract developers, but a [test](../../sdks/building-applications/nodejs-sdk/testing-contracts.md) and [deployment](../../sdks/building-applications/nodejs-sdk/deploying-contracts.md) framework is provided to accelerate the development lifecycle. Furthermore, the [app abstraction](../../sdks/building-applications/nodejs-sdk/contract-interaction.md) helps developers productionize their apps into a seamless browser experience.
