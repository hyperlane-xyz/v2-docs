# Deploy contracts

## Overview

In this step we will be deploying Hyperlane smart contracts to the local and remote chains.

On the local chain, we will deploy:

* The core contracts, including a [messaging.md](../../protocol/messaging.md "mention") that can be used to send and receive messages

On all chains, we will deploy:

* A [multisig-ism.md](../../protocol/sovereign-consensus/multisig-ism.md "mention") that can be used to verify inbound messages
* An [interchain-gas-paymasters.md](../../build-with-hyperlane/guides/paying-for-interchain-gas/interchain-gas-paymasters.md "mention"), which can be used to pay our relayer for delivering interchain messages
* A `TestRecipient`, which we will send messages to, in order to test that everything is working correctly

## Setup

{% hint style="info" %}
If you have not yet set up your deployer, validator, and relayer keys, see [keys.md](keys.md "mention")
{% endhint %}

First, set up the `hyperlane-deploy` repo. This repo contain scripts to deploy Hyperlane contracts. You will need to install [`yarn`](https://yarnpkg.com/getting-started/install) if you haven't already.

```bash
git clone git@github.com:hyperlane-xyz/hyperlane-deploy.git
cd hyperlane-deploy
yarn install
```

Next, add a [`ChainMetadata`](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/typescript/sdk/src/consts/chainMetadata.ts#L21) entry for your local chain to `hyperlane-deploy/config/chains.ts`. An example has been populated for you for [`anvil`](https://book.getfoundry.sh/anvil/). Any chains that already have Hyperlane deployments do not need to be configured here (see [domains.md](../../resources/domains.md "mention") for the list of already supported chains).

```typescript
export const chains: ChainMap<ChainMetadata> = {
  // ----------- Your chains here -----------------
  anvil1: {
    name: 'anvil1',
    // anvil default chain id
    chainId: 31337,
    publicRpcUrls: [
      {
        http: 'http://localhost:8545',
      },
    ],
  },
};
```

Finally, add the `MultisigIsmConfig` entry for your local chain to `hyperlane-deploy/config/multisig_ism.ts`. An example with a single validator has been populated for you for `anvil`. Any chains that already have Hyperlane deployments do not need to be configured here (see [domains.md](../../resources/domains.md "mention") for the list of already supported chains).

```typescript
export const multisigIsmConfig: ChainMap<MultisigIsmConfig> = {
  // ----------- Your chains here -----------------
  anvil1: {
    threshold: 1,
    validators: [
      // Last anvil address
      '0xa0ee7a142d267c1f36714e4a8f75612f20a79720',
    ],
  },
};
```

## Deploy

You can then run `yarn ts-node scripts/deploy-hyperlane.ts` to deploy the Hyperlane contracts. You will need to provide the following arguments:

* `local`: The local chain on which Hyperlane is being deployed
* `remotes`: The chains with which 'local' will be able to send and receive messages
* `key`: A hexadecimal private key for transaction signing

An example deployment command to `anvil` that supports communication with `goerli` and `sepolia` is shown below:

```bash
yarn ts-node scripts/deploy-hyperlane.ts --local anvil \
  --remotes goerli sepolia \
  --key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

{% hint style="warning" %}
The deploy script will only accept chains for which configuration has been provided. If you do not see your desired chain in the list of choices, you may be missing config in `chains.ts` or `multisig_ism.ts`
{% endhint %}

## Verify

If everything ran successfully, congrats! You should see contract addresses written to `artifacts/addresses.json`, and agent config written to `artifacts/agent_config.json`

```bash
$ head -n 19 artifacts/addresses.json
{
  "anvil": {
    "validatorAnnounce": "0x177B784C94d85f6645a35BfD14175D44045e573f",
    "proxyAdmin": "0x5Dfb392D946d0F3b6af599705541050A6ca6A870",
    "mailbox": "0x74756B469390CAee600F332184895ACbf86C4396",
    "multisigIsm": "0x1dD5a3E037be5C46839192a5b83a260166751409",
    "testRecipient": "0x7672E92386B49717D32946214A10B1988542F660",
    "storageGasOracle": "0xbA033019Fe072beda2389259e05bEB042bAb8fF6",
    "interchainGasPaymaster": "0x9368C1f2B6BE2869018622a9aB43a5D8ED27Fba2",
    "defaultIsmInterchainGasPaymaster": "0xc1FD390F3aB9d0e2bb8394B0DeCE48D31fC44121"
  },

$  head -n 22 artifacts/agent_config.json
{
  "chains": {
    "anvil": {
      "name": "anvil",
      "domain": 31337,
      "addresses": {
        "mailbox": "0x74756B469390CAee600F332184895ACbf86C4396",
        "interchainGasPaymaster": "0x9368C1f2B6BE2869018622a9aB43a5D8ED27Fba2",
        "validatorAnnounce": "0x177B784C94d85f6645a35BfD14175D44045e573f"
      },
      "signer": null,
      "protocol": "ethereum",
      "finalityBlocks": 1,
      "connection": {
        "type": "http",
        "url": ""
      },
      "index": {
        "from": 17
      }
    }
  },
```



