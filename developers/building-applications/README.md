---
description: Create interchain applications with the Abacus Application SDK
---

# App framework

Abacus provides a framework that helps developers create and manage applications built on top of interchain smart contracts. It is designed primarily for applications which leverage the shared state model and symmetric communication patterns such as the [Router](writing-contracts/router.md) pattern.&#x20;

### Solidity SDK&#x20;

The classes in the [`@abacus-network/app`](https://www.npmjs.com/package/@abacus-network/app) package help you write interchain contracts intended to be deployed on multiple networks.&#x20;

### NodeJS SDK

The classes in the [`@abacus-network/sdk`](https://www.npmjs.com/package/@abacus-network/sdk) package help you manage and interact with Abacus applications on multiple networks. The building experience is familiar to smart contract developers, but a [test](nodejs-sdk/testing-contracts.md) and [deployment](nodejs-sdk/deploying-contracts.md) framework is provided to accelerate the development lifecycle. Furthermore, the [app abstraction](nodejs-sdk/contract-interaction.md) helps developers productionize their apps into a seamless browser experience.&#x20;
