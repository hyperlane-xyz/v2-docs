# Overview

### What is Abacus

Abacus is a developer platform that allows developers to build true cross-chain applications, applications that have shared state across their multiple deployments on different blockchains. In Abacus lingo these are referred to as interchain applications, or Abacus apps. Abacus itself is built on top of a generalized cross chain messaging protocol which is the engine of our platform that enables these applications to share state.\
\
Abacus isn’t a blockchain. Abacus is how you build interchain applications.\


### The Problem Abacus is Solving

There are a number of engineering problems that Abacus is solving, but the most acute problem Abacus set out to solve is the problem of choosing which blockchain platform you should deploy on. The Abacus vision is premised on the belief that the future of blockchains spans an array of blockchains, and that both developers and users do not want to be tied to a single chain. Web3 is one of the few environments in which the developers choice of hosting environment will have existential implications for them and their users. Soon the question of which blockchain you should deploy on will be made irrelevant by Abacus, with Abacus becoming the answer to 'how should I build an interchain application'.

To enable this, it's necessary to solve the hard engineering problem that emerges from the fact that blockchains do not natively know anything about the world outside them, which then means they do not know anything about other blockchains and thus cannot communicate with others. Simply put, blockchains are islands of state with no communication network in between them. Abacus is here to change that.

### How Does Abacus Work

At the core of Abacus lies the messaging protocol, this enables messaging between distinct blockchains. Alice can send a message from her address on the X chain to Bob’s address on the Y chain. What this means is that an Alice’s account on the X chain can call a function on the Y chain, such that App A on chain X can communicate with App B on chain Y. But what we believe is the most interesting construction is for App A’s instance on Chain X to communicate with App A’s instance on Chain Y which enables what we’ve been calling an interchain app.

#### Messaging

To enable interchain apps we have a set of contracts on each chain which we call the Inbox and the Outbox. On each chain there is an Outbox directing messages to every other supported chain, and an Inbox receiving messages from every chain. This means that if Abacus supported 12 networks on each network there would be 12 Inbox and Outbox contracts.

Messages are sent from an Outbox to one or more Inboxes, depending on the nature of the message and the application configuration, using the root of the Outbox’s merkle tree. This merkle root represents a commitment to all of the messages that were ever sent to the Outbox by all the applications on a given chain. To send a message from Chain X to chain Y, an account calls Outbox, dispatch(Y, msg.sender, message), which inserts hash(X, msg.sender, Y, msg.receiver, message).

#### Validator Set

You may be wondering how can we trust the validity of these messages? That’s where the Abacus Validators come into the picture. Abacus validators observe the chains and sign the merkle roots that the Outboxes send and the Inboxes receive. They are incentivized to sign merkle roots that are valid and are slashed when they are found to sign an invalid or fraudulent root. The Abacus Validator set is unique relative to others in that Abacus does not require all validators to observe all chains, rather there is a set for each supported chain that only observes that chain. A single validator can be part of all Abacus sets, meaning it validates for all supported chains, or it can pick and choose which chains to operate on. This results in minimal operational overhead for the operators of validator nodes as they don’t need to observe networks they don’t already operate on. Which in turn should lead to quick bootstrapping of Abacus validator sets.

#### Consensus

But wait, there’s more. Abacus employs a new and novel consensus mechanism that allows every Abacus app to select a subset of the broader validator set which must sign off on incoming messages. This means that an Abacus app does not have to be concerned about validator set collusion rugging it or its users, and only be concerned with the ones selected. The app could even select itself as the validator subset that must affirm the message, in that sense the app becomes ‘Sovereign’. Hence we call this Sovereign Consensus! You can read about this in more detail in the Sovereign Consensus section.

In between the out and inboxes, and the validator set are a group of permissionless agents that help keep the protocol in order and ensure proper functioning. More on these in their distinct sections.

