---
description: A high level description of how Abacus is governed
---

# Governance

The Abacus protocol is governed by a DAO, which uses the [controller app](../developers/examples/controller.md) to control protocol contracts on remote chains.

## DAO

In an effective decentralized network, a representative set of participants routinely coordinate to make critical decisions. With the advent of smart contracts, DAOs have emerged as a pragmatic structure for orchestrating this process in code.&#x20;

The Abacus DAO will be tasked with the ongoing development and maintenance of the Abacus platform and protocol. Importantly, the DAO will also drive adoption of the platform and continue to diversify the set of governance participants.

Specifically, the DAO's control will extend over

* messaging protocol upgrades and modifications
* parameters dictating membership in the validator set
* ABC token supply changes including the size and rate of emissions
* treasury management for administering grants and incentive programs

Given that ABC is the primary incentive mechanism for protocol participants, the Abacus DAO will be governed with ABC token voting. This will be implemented as a fork of [Compound's Governor Bravo](https://blog.tally.xyz/understanding-governor-bravo-69b06f1875da) enabling participation across all supported chains.

Abacus is currently evaluating a number of token voting mechanisms, and will elect an official mechanism prior to its launch. The goal of this evaluation is to land on an optimal mechanism which incentivizes participation and the long term interests of the network. Findings and conclusions from this evaluation may be shared publicly.

## Controller

The Abacus DAO is able to execute transactions on remote chains by way of the [controller](../developers/examples/controller.md).

With the [`Controller` Abacus App](../developers/examples/controller.md), any DAO, including the Abacus DAO, is able to own contracts on remote chains and call them from its home chain.

The Abacus DAO's `Controller` contracts on remote chains effectively act as a proxy for the local Abacus DAO, which can use the `callRemote` function to make cross-chain function calls. This enables the Abacus DAO to own and manage the Abacus smart contracts on remote chains.
