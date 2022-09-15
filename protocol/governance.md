---
description: A high level description of how Hyperlane is governed
---

# Governance

The Hyperlane protocol is governed by a decentralized autonomous organization ([DAO](governance.md#dao)), which uses the [controller app](../developers/examples/controller.md) to control protocol contracts on remote chains.

### Governance

Hyperlane governance is based on Compound's Governor Bravo [framework](https://blog.tally.xyz/understanding-governor-bravo-69b06f1875da). ABC holders can propose, vote on, and implement changes to the Hyperlane protocol.

Unlike many of these other protocols, Hyperlane is natively interchain. Users can propose and vote on proposals from any Hyperlane supported chain. Furthermore, the Hyperlane DAO can execute transactions on any Hyperlane supported chain using the Hyperlane Controller.

The Hyperlane Controller is an instance of the [Controller](../developers/examples/controller.md) application, that owns the Hyperlane protocol contracts on each chain. When the DAO needs to execute a transaction on a remote chain, it calls a function on the source chain Hyperlane Controller contract, specifying the transaction to be executed.

This sends an interchain message to the destination chain Hyperlane Controller contract, which executes the transaction.

## DAO

In an effective decentralized network, a representative set of participants routinely coordinate to make critical decisions. With the advent of smart contracts, DAOs have emerged as a pragmatic structure for orchestrating this process in code.&#x20;

The Hyperlane DAO will be tasked with the ongoing development and maintenance of the Hyperlane platform and protocol. Importantly, the DAO will also drive adoption of the platform and continue to diversify the set of governance participants.

Specifically, the DAO's control will extend over

* messaging protocol upgrades and modifications
* parameters dictating membership in the validator set
* ABC token supply changes including the size and rate of emissions
* treasury management for administering grants and incentive programs

The Hyperlane DAO will be governed with ABC token voting. This will be implemented as a fork of [Compound's Governor Bravo](https://blog.tally.xyz/understanding-governor-bravo-69b06f1875da) enabling participation across all supported chains.

Hyperlane is currently evaluating a number of token voting mechanisms, and will elect an official mechanism prior to its launch. The goal of this evaluation is to land on an optimal mechanism which incentivizes participation and the long term interests of the network. Findings and conclusions from this evaluation may be shared publicly.

## Controller

The Hyperlane DAO is able to execute transactions on remote chains using the [controller](../developers/examples/controller.md).

With the [`Controller` Hyperlane App](../developers/examples/controller.md), any DAO, including the Hyperlane DAO, is able to own contracts on remote chains and call them from its home chain.

The Hyperlane DAO's `Controller` contracts on remote chains effectively act as a proxy for the local Hyperlane DAO, which can use the `callRemote` function to make interchain function calls. This enables the Hyperlane DAO to own and manage the Hyperlane smart contracts on remote chains.
