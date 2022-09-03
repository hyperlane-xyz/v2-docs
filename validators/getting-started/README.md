---
description: Everything you need to start running a validator
---

# Getting started

Abacus [validators](../../protocol/agents/validators.md) are stateless, do not submit transactions, and are not networked with other validators. Abacus validators are run on a per-source-chain basis, but of course entities can be running validators for multiple chains. These instructions are written for a single chain.

Running a validator simply requires the following:

#### An RPC node&#x20;

Validators make simple view calls to read merkle roots from the [`Outbox`](../../protocol/messaging/outbox.md) contract on the chain they are validating for.

Note that operating a validator for the mainnet Polygon network requires an RPC endpoint of an archive node. This is because validators make view calls for state that has reached finality by looking at state at past block heights that have since reached finality. Polygon's number of blocks to finality is very high (256 blocks), and a non-archive Polygon node only allows state reads 128 blocks in the past.

#### A secure signing key&#x20;

Validators use this key to sign the `Outbox's` latest merkle root. Securing this key is important. If it is compromised, attackers can attempt to falsify messages, causing the validator to be slashed.&#x20;

The Abacus validator agent currently supports signing with AWS KMS keys that are accessed via API keys/secrets.

#### Publicly readable storage&#x20;

Validators write their signatures off-chain to publicly accessible, highly available, storage, so that they can be aggregated by [relayers](../../protocol/agents/relayer.md).&#x20;

The Abacus validator agent currently supports storing signatures on AWS S3 using the same AWS API key above.&#x20;

#### A machine to run on

Validators can compile the rust binary themselves, or run a docker image provided by Abacus Works. The binary is completely stateless and can be run using your favorite cloud service. You can even run multiple instances of them in different regions for high availability, as Abacus has no notion of "double signing".
