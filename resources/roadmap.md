---
description: Last updated June 6th, 2022
---

# Roadmap

{% hint style="info" %}
The following roadmap is for informational purposes only and is subject to change.
{% endhint %}

## Hyperlane Alpha

We have currently released Hyperlane's 'mainnet-alpha'

**Security**

The alpha release uses ECDSA multi-signatures, rather than an aggregatable signature scheme. Future releases will use an aggregatable signature scheme, which will allow Hyperlane to scale to larger validator sets.

The validator set on each chain is determined by a multi-signature wallet controlled by Abacus Works. Future releases will use proof-of-stake to determine the validator set.

Sovereign consensus is implemented for the alpha release.

**Governance**

Hyperlane alpha is governed by a multi-signature wallet controlled by Abacus Works.

**Agents**

The relayer is configurable with a whitelist that allows operators to specify which messages to relay. Future releases will allow relayers to accept payments on the origin chain for processing of messages on the destination chain.

**Networks**

The alpha version of Hyperlane is deployed to the following mainnets (with testnets in parentheses):

* Arbitrum (Rinkeby)
* Avalanche (Fuji)
* BNB (BSC testnet)
* Celo (Alfajores)
* Ethereum (Kovan)
* Optimism (Kovan)
* Polygon (Mumbai)

## Hyperlane Beta

_**ETA Q4 2022**_

* Aggregatable signatures to reduce gas costs and expand the validator set
* Sovereign Consensus
* Proof of Stake
* Expand to additional EVM chains

