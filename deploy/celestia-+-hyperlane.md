---
description: A match made in modular heaven
---

# Celestia + Hyperlane

This guide will walk you through the process of deploying an EVM-compatible sovereign rollup on Celestia, with interoperability powered by Hyperlane.

By the end of the tutorial, you will have deployed your own sovereign rollup on Celestia's Mocha testnet. Users of your rollup will be able to send messages and tokens to and from your rollup and other EVM compatible testnets.

## &#x20;Overview

This tutorial is intended for users who want to deploy an EVM compatible rollup on Celestia, and deploy Hyperlane's interchain messaging and token transfer APIs to that rollup.

At a high level, this tutorial will involve three steps.

1. Deploy an EVM compatible rollup to Celestia
2. Deploy Hyperlane's interchain messaging API to that rollup
3. Deploy Hyperlane's interchain token API

## 1. Deploy an Ethermint-based rollup to Celestia

Additional documentation for deploying an EVM compatible rollup to Celestia can be found [here](https://docs.celestia.org/developers/ethermint).

### Setup

Configure a machine (or VM) with at least 4 cores, 8 GB RAM, and 250 GB disk. You will use this machine to host:

1. A Celestia light node
2. Your rollup

Make sure your machine allows inbound TCP traffic on port 9090.

### Run a Celestia light node

Your rollup will need to connect to a Celestia light node in order to submit transactions to the DA layer.

Open up a new `screen` session for running your light node:

```
$ sudo apt-get install screen
$ screen -S celestia-light-node
```

Then, follow [these instructions](https://docs.celestia.org/developers/node-tutorial) to spin up a `mocha` light node on the machine you just set up.

{% hint style="warning" %}
If `make install` fails to write to `/usr/local/bin/celestia`, run `sudo env "PATH=$PATH" make install` instead
{% endhint %}

&#x20;You can verify that your node is syncing by exiting your screen session and requesting the latest block

```
$ curl -X GET http://127.0.0.1:26659/head | jq
```

Once your node is syncing, follow [these instructions](https://docs.celestia.org/developers/node-tutorial#keys-and-wallets) to acquire mocha tokens from the faucet.

### Run an ethermint node

First, build `ethermintd` by following [these instructions](https://docs.celestia.org/developers/rollmint-on-ethermint).

Open up a new `screen` session for running your ethermint node:

```
$ screen -S ethermint-node
```

Then, follow [these instructions](https://docs.celestia.org/developers/instantiate-ethermint#instantiating-the-ethermint-rollup) to run your ethermint node.

## 2. Deploy Hyperlane's interchain messaging API

Additional documentation for deploying Hypelane to an EVM compatible chain can be found [here](deploy-hyperlane/).

### Deploy the Hyperlane core contracts

Follow [these instructions](deploy-hyperlane/#1.-deploy-the-core-smart-contracts) to deploy the Hyperlane core contracts to your ethermint chain.

If you run the contract deployment on the same machine as your ethermint node, you can use the RPC URL `http://localhost:8545`.

By default, your ethermint chain will fund a single address with testnet tokens. You can find the private key for that address by running the following command

<pre class="language-bash"><code class="lang-bash"><strong>$ PRIVATE_KEY=$(ethermintd keys unsafe-export-eth-key mykey --keyring-backend test)
</strong></code></pre>

{% hint style="info" %}
If `forge` complains about an incorrect nonce, use the `--slow` flag when deploying contracts&#x20;
{% endhint %}

### Run Hyperlane validators

Follow [these instructions](deploy-hyperlane/#2.-run-validators) to run one or more Hyperlane validators for your ethermint chain.

You will need to expose your ethermint node's RPC endpoint to these validator(s) so that they can query the Hyperlane [`Mailbox`](../protocol/messaging.md) contract.

### Deploy remote ISMs

Follow [these instructions](deploy-hyperlane/#3.-deploy-remote-isms) to deploy an `Interchain Security Module` smart contract to each of the remote chains you would like your ethermint chain to be able to communicate with.

You will need an RPC URL for each of these remote chains, as well as an address with tokens to pay for gas.&#x20;

Applications on remote chains will use these contracts to verify messages coming from your rollup.

### Run Hyperlane relayers

Follow [these instructions ](deploy-hyperlane/#4.-run-a-relayer-for-the-local-chain)and [these instructions](deploy-hyperlane/#5.-run-relayer-s-for-the-remote-chain-s) to run Hyperlane relayers to deliver messages between your ethermint chain and the remote chains you've configured.

You will need an RPC URL for each chain, as well as an address with tokens to pay for gas.&#x20;

You will need to expose your ethermint node's RPC endpoint to the relayers so that they can query the Hyperlane [`Mailbox`](../protocol/messaging.md) contract.

### Test your Hyperlane deployment

Follow these instructions to send messages from your ethermint chain to the remote chain(s) and from the remote chain(s) back to your ethermint chain(s).

## 3. Deploy a Hyperlane Warp route

Additional documentation for deploying a Warp route to an EVM compatible chain can be found [here](deploy-warp-route/deploy-a-warp-route.md).

### Deploy the contracts

Follow [these instructions](deploy-warp-route/deploy-a-warp-route.md) to deploy warp route contracts to your ethermint chains and the remote chains that you'd like to support.

You will need to make sure you add the details for your chain in a chain config JSON file and pass that to the deployer. The contents of that file should look something like this. Make sure to substitute your own chain name, token name, and RPC URL.\


```json
{
  "hypermint": {
    "id": 9000,
    "name": "hypermint",
    "displayName": "Hypermint",
    "nativeToken": { "name": "Hypermint", "symbol": "HMNT", "decimals": 18 },
    "publicRpcUrls": [{ "http": "http://localhost:8545" }],
    "blockExplorers": [],
    "blocks": {
      "confirmations": 1,
      "reorgPeriod": 2,
      "estimateBlockTime": 13
    }
  }
}
```

Your token config **must** specify the ISMs that you deployed on the remote chains, as the default ISMs on those chains will not be able to verify messages sent from your ethermint chain.

### Deploy the UI

Follow [these instructions](deploy-warp-route/deploy-the-ui-for-your-warp-route.md) to deploy the UI for your Warp Route.

You will need to make sure you've added your chain to `src/consts/chains.json`. You can use the same JSON object you used in the previous step, with the additional `logoImgSrc` field.

