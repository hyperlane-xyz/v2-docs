---
description: Build interchain smart contracts
---

# Solidity SDK

The solidity SDK ([`@abacus-network/app`](https://www.npmjs.com/package/@abacus-network/app)) contains smart contract libraries for helping you write your interchain apps, including:

### [`AbacusConnectionClient`](abacusconnectionclient.md)&#x20;

A mix-in that your contract can inherit from when integrating with Abacus.

### [`AbacusConnectionManager`](abacusconnectionmanager.md)&#x20;

A contract that manages the connection between your `AbacusConnectionClient` and Abacus.

### [`Router`](router.md)&#x20;

A mix-in contract, which implements a recommended pattern for interchain applications. Contracts can be written once and then deployed across many chains.
