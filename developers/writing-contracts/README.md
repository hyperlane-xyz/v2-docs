---
description: Build interchain smart contracts
---

# Smart Contract Libraries

The Abacus SDK contains everything you need to write, deploy, and test your interchain smart contracts, including:

* An [`AbacusConnectionClient`](abacusconnectionclient.md) mix-in that your contract can inherit from when integrating with Abacus.
* An [`AbacusConnectionManager`](abacusconnectionmanager.md) contract that manages the connection between your `AbacusConnectionClient` and Abacus.
* The [`Router`](router.md) mix-in contract, which implements a recommended pattern for interchain applications. Contracts can be written once and then deployed across many chains.
* A [Hardhat plugin](testing-contracts.md) for unit testing interchain contracts.
