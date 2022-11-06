---
description: Create interchain applications with the Hyperlane Application SDK
---

# App framework

Hyperlane provides a framework that helps developers create and manage applications built on top of interchain smart contracts. It is designed primarily for applications which leverage the shared state model and symmetric communication patterns such as the [Router](writing-contracts/router.md) pattern.&#x20;

### Solidity SDK&#x20;

The classes in the [`@hyperlane-xyz/sdk`](https://www.npmjs.com/package/@hyperlane-xyz/sdk) package help you write interchain contracts intended to be deployed on multiple networks.&#x20;

### NodeJS SDK

The classes in the [`@hyperlane-xyz/sdk`](https://www.npmjs.com/package/@hyperlane-xyz/sdk) package help you manage and interact with Hyperlane applications on multiple networks. The building experience is familiar to smart contract developers, but a [test](nodejs-sdk/testing-contracts.md) and [deployment](nodejs-sdk/deploying-contracts.md) framework is provided to accelerate the development lifecycle. Furthermore, the [app abstraction](nodejs-sdk/contract-interaction/) helps developers productionize their apps into a seamless browser experience.&#x20;

_Note: Abacus is the former name of the Hyperlane protocol. The repo and SDK will soon be renamed._
