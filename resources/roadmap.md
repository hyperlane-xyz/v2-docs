---
description: Last updated June 6th, 2022
---

# Roadmap

{% hint style="info" %}
The following roadmap is for informational purposes only and is subject to change.
{% endhint %}

## Abacus Alpha

_**Live on**_ [_**testnet**_](../developers/contract-addresses/testnet2.md)_**, mainnet ETA June 2022**_

We are currently working towards the alpha release of Abacus.

**Security**

The alpha release will use ECDSA multi-signatures, rather than an aggregatable signature scheme. Future releases will use an aggregatable signature scheme, which will reduce the gas costs of relaying messages by up to 33%.

The validator set on each chain will be determined by a multi-signature wallet controlled by Abacus Works. Future releases will use proof-of-stake to determine the validator set.

Sovereign consensus will not be implemented for the alpha release.

**Governance**

Abacus alpha will be governed by a multi-signature wallet controlled by Abacus Works.

**Agents**

The relayer will be configurable with a whitelist that allows operators to specify which messages to relay. Future releases will allow relayers to accept payments on the origin chain for processing of messages on the destination chain.

**Networks**

The alpha version of Abacus will be deployed to the following mainnets (with testnets in parentheses):

* Arbitrum (Rinkeby)
* Avalanche (Fuji)
* BNB (BSC testnet)
* Celo (Alfajores)
* Ethereum (Kovan)
* Optimism (Kovan)
* Polygon (Mumbai)

## Abacus Beta

_**ETA Q3 2022**_

* Aggregatable signatures to reduce gas costs and expand the validator set
* Sovereign Consensus
* Proof of Stake
* Expand to additional EVM chains

