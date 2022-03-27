---
description: A high level description of the Abacus protocol
---

# Overview

{% hint style="info" %}
Note: The Abacus protocol is still under development. The protocol docs describe the latest Abacus protocol design.

For the latest on what's been implemented and deployed to testnet(s) and mainnet(s), please visit the [roadmap](../resources/roadmap.md).
{% endhint %}

## Components

Abacus is comprised of three high level components that combine to create a secure cross-chain communication protocol.

### Messaging

The messaging component of Abacus is comprised of two smart contracts, [Outbox](messaging/outbox.md), and  [Inbox](messaging/inbox.md). These contracts implement the API that developers must integrate in order to send cross-chain messages using Abacus.

To send a cross-chain message chain A, developers simply call `Outbox.dispatch()`, specifying the message contents, the destination chain, and the address on that chain that the message should be sent to.

To receive a cross-chain message on chain B, developers simply implement a `handle()` function. This gets called by an Inbox contract with the message contents, the origin chain, and the address that sent the message on the origin chain, as arguments.

### Security

Abacus cross-chain messaging is secured by two layers.

First, a [proof-of-stake](security/proof-of-stake.md) protocol secures a validator set, providing shared security for all Abacus users. Second, [sovereign consensus](security/sovereign-consensus.md) allows  application's to implement additional security measures when necessary.

#### Proof of stake

Abacus is powered by decentralized network of validators, secured by proof-of-stake. On each chain, the validator set acts as a notary, signing the merkle root of the Outbox smart contract. This commits to the history of outbound messages on that chain, which allows those messages to be relayed to their destinations.

The validator set for each chain is determined by a delegated proof-of-stake protocol, implemented as a series of smart contracts. Individual validators that sign anything other than Outbox merkle roots can be slashed by presenting the signature as evidence to these smart contracts.

#### Sovereign consensus

Developers building on the Abacus protocol can optionally specify application specific security rules using sovereign consensus. Sovereign consensus addresses the scalability problems inherent in proof-of-stake systems while isolating failures within "zones of sovereignty".

### Governance

Abacus is governed by a [DAO](governance/dao.md), based on Compound's Governor Bravo. Much as in other protocols, ABC holders can propose, vote on, and implement changes to the Abacus protocol.

Unlike many of these other protocols, Abacus is natively multi-chain. Users can propose and vote on proposals from any Abacus supported chain. Furthermore, the Abacus DAO can execute transactions on any Abacus supported chain using the [Abacus Controller](governance/controller.md).

The Abacus Controller is an instance of the [Controller](../developers/examples/controller.md) application, that owns the Abacus protocol contracts on each chain. When the DAO needs to execute a transaction on a remote chain, it calls a function on the Abacus Controller contract on the source chain, specifying the transaction to be executed.

This causes a cross-chain message to be sent to the Controller contract on the destination chain, which executes the transaction.
