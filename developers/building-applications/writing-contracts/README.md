---
description: Build interchain smart contracts
---

# Solidity SDK

The solidity SDK ([`@hyperlane-xyz/sdk`](https://www.npmjs.com/package/@hyperlane-xyz/sdk)) contains smart contract libraries for helping you write your interchain apps, including:

### [`AbacusConnectionClient`](abacusconnectionclient.md)&#x20;

A mix-in that your contract can inherit from when integrating with Hyperlane.

### [`AbacusConnectionManager`](abacusconnectionmanager.md)&#x20;

A contract that manages the connection between your `AbacusConnectionClient` and Abacus.

### [`Router`](router.md)&#x20;

A mix-in contract, which implements a recommended pattern for interchain applications. Contracts can be written once and then deployed across many chains.

_Note: Abacus is the former name of the Hyperlane protocol. The repo, ACM, and ACC will soon be renamed._
