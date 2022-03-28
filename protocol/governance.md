---
description: A high level description of how Abacus is governed
---

# Governance

The Abacus protocol is governed by a DAO, which uses the [controller app](../developers/examples/controller.md) to control protocol contracts on remote chains.

## DAO

The Abacus DAO will be implemented as a fork of [Compound's Governor Bravo](https://blog.tally.xyz/understanding-governor-bravo-69b06f1875da), with changes that allow for voting from remote chains.

As with most decentralized networks and protocols, the ultimate goal is for the network to be governed by its participants. We believe DAOs are an appropriate and effective means of achieving this goal and as such Abacus will be governed by its DAO. \
\
It is anticipated that the most active participants in governance will overlap with the most active participants in the network. Given that ABC is the primary incentive mechanism powering Abacus' Proof of Stake the Abacus DAO will be governed in the form of on-chain token voting with ABC.&#x20;

The DAO will be tasked with the ongoing development and maintenance of the Abacus platform and protocol. But most importantly, the DAO will be a primary tool in the quest to drive adoption of the platform.&#x20;

The DAO will control many critical elements of the protocol and network. Namely its control will extend over: messaging protocol upgrades and modifications, the parameters dictating membership in the validator set, the logic behind any changes to the ABC token supply including the size and rate of emissions, changes to the recipients of emissions, and the allotment of certain emission streams. Additionally, the DAO will be expected to govern its treasury responsibly and administer grants as well as incentive programs.&#x20;

Abacus is currently evaluating a number of token voting mechanisms, and will elect an official mechanism prior to its launch. The goal of this evaluation is to land on an optimal mechanism which incentivizes participation and the long term interests of the network. Findings and conclusions from this evaluation may be shared publicly.

## Controller

The Abacus DAO is able to execute transactions on remote chains by way of the [controller](../developers/examples/controller.md).

With the [`Controller` Abacus App](../developers/examples/controller.md), any DAO, including the Abacus DAO, is able to own contracts on remote chains and call them from its home chain.

The Abacus DAO's `Controller` contracts on remote chains effectively act as a proxy for the Abacus DAO, which can use the `callRemote` function to make cross-chain function calls.

Thus, the Abacus DAO is able to, in effect, own the Abacus smart contracts on remote chains.
