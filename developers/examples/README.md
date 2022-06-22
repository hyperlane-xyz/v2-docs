---
description: Examples of different interchain applications using Abacus
---

# Examples

## Hello World

The [abacus-app-template repo](https://github.com/abacus-network/abacus-app-template) shows the basic skeleton of an Abacus app.

Its [contract](https://github.com/abacus-network/abacus-app-template/blob/main/contracts/HelloWorld.sol) sends a user-specified string to another chain which handles the message by increasing counters and emitting events.

Its [deployer](https://github.com/abacus-network/abacus-app-template/blob/main/src/deploy/deploy.ts) is configured to deploy to local hardhat-based test networks.

Its [app](https://github.com/abacus-network/abacus-app-template/blob/main/src/sdk/app.ts) fetches some basic statistics and returns them.

## ERC20 Token

The [abacus-token repo](https://github.com/abacus-network/abacus-token) shows an example interchain ERC20 token.

The changes to the vanilla OpenZeppelin ERC20 contract are minimal. It has a `transferRemote()` function that burns the specified amount of tokens on the sending chain and mints the equivalent amount on the receiving chain.

## Controller

The [Controller](controller.md) is an Abacus application that allows arbitrary function calls to be executed on remote chains.
