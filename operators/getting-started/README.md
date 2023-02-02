---
description: Everything you need to start running a validator
---

# Validators

Hyperlane [validators](../../../protocol/agents/validators.md) are stateless, do not submit transactions, and are not networked with other validators. Hyperlane validators are run on a per-origin-chain basis, and these instructions are written for a single chain.

Running a validator simply requires the following:

#### An RPC node&#x20;

Validators make simple view calls to read merkle roots from the [`Mailbox`](../../../protocol/messaging.md) contract on the chain they are validating for.

{% hint style="warning" %}
Operating a validator for Polygon mainnet requires access to an archive node. This is because validators should only sign roots once they've been finalized, and Polygon requires 256 block confirmations to achieve finality.
{% endhint %}

#### A secure signing key&#x20;

Validators use this key to sign the `Mailbox's` latest merkle root. Securing this key is important. If it is compromised, attackers can attempt to falsify messages, causing the validator to be slashed.&#x20;

The Hyperlane validator agent currently supports signing with AWS KMS keys that are accessed via API keys/secrets.

#### Publicly readable storage&#x20;

Validators write their signatures off-chain to publicly accessible, highly available, storage, so that they can be aggregated by [relayers](../../../protocol/agents/relayer.md).&#x20;

The Hyperlane validator agent currently supports storing signatures on AWS S3 using the same AWS API key above.&#x20;

#### A machine to run on

Validators can compile the rust binary themselves, or run a docker image provided by Abacus Works. The binary is completely stateless and can be run using your favorite cloud service. You can even run multiple instances of them in different regions for high availability, as Hyperlane has no notion of "double signing".
