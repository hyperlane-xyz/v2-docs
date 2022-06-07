---
description: Build smart contracts that communicate across chains
---

# Contract SDK

The contract SDK contains everything you need to write and test your interchain contracts, including:

* An [API](../contract-sdk/messaging-api.md) for sending and receiving interchain messages.
* An [`AbacusConnectionClient`](../advanced/connection-client.md) mix-in that your contract can inherit from when integrating with Abacus.
* An [`AbacusConnectionManager`](../contract-sdk/abacusconnectionmanager.md) contract that manages the connection between your `AbacusConnectionClient` and Abacus.
* The [`Router`](../advanced/router-pattern.md) mix-in contract, which implements a recommended pattern for interchain applications in which contracts are written once and deployed and operational across many chains.
* A [hardhat plugin](test-your-contracts.md) for unit testing interchain contracts.
