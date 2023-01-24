---
description: Move your token between chains
---

# Deploy a Warp Route

A Warp Route is simply a [router.md](../building-applications/writing-contracts/router.md "mention") application, requiring one `HypERC20` token contract to be deployed on each chain you wish to support.

The [hyperlane-token](https://github.com/hyperlane-xyz/hyperlane-token) repo includes a script that allows you to configure and deploy a Warp Route for your desired token.

### 1. Setup

Clone the [hyperlane-token](https://github.com/hyperlane-xyz/hyperlane-token) repo and run the following commands:

```
$ yarn install
$ yarn build
```

### 2. Configuration

You will need to create a JSON file that specifies the Warp Route configuration. This will include information such as:

* Which token, on which chain, is this Warp Route being created for?
* Hyperlane connection details (e.g. contract addresses for [messaging](../../protocol/messaging/ "mention"))
* Optional security configuration (i.e. [Interchain Security Module](../messaging-api/receive-1.md#interchain-security-modules) addresses)

Your configuration must have exactly one entry with `"type": "collateral"`, which specifies the canonical token address. Every other entry must have `"type": "synthetic"`.

Deployers may configure interchain security by setting the `interchainSecurityModule` field to the address of the ISM that will verify inbound interchain messages. If none is specified, the default from the `Mailbox` contract will be used.

#### Example

An example config for a Warp Route that allows for interchain transfers of the ERC20 token at address `0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6` between the Goerli and Alfajores testnets is shown below.

This Warp Route is secured by the default ISMs that are set on the `Mailboxes` for those chains.

```json
{
  "goerli": {
    "type": "collateral",
    "token": "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6",
    "owner": "0x5bA371aeA18734Cb7195650aFdfCa4f9251aa513",
    "mailbox": "0xCC737a94FecaeC165AbCf12dED095BB13F037685",
    "interchainGasPaymaster": "0xf857706CE59Cb7AE6df81Bbd0B0a656dB3e6beDA",
    "interchainSecurityModule": undefined,
  },
  "alfajores": {
    "type": "synthetic",
    "name": "WETH",
    "symbol": "WETH",
    "totalSupply": 0,
    "token": "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6",
    "owner": "0x5bA371aeA18734Cb7195650aFdfCa4f9251aa513",
    "mailbox": "0xCC737a94FecaeC165AbCf12dED095BB13F037685",
    "interchainGasPaymaster": "0xf857706CE59Cb7AE6df81Bbd0B0a656dB3e6beDA",
    "interchainSecurityModule": undefined,
  }
}
```

### 3. Deployment

Run the following script to deploy your Warp Route:

```
$ DEBUG=* yarn ts-node scripts/deploy.ts --private-key $PRIVATE_KEY --token-config my-config.json
```

You must pass a private key and the path to the config file as arguments for the deploy script. Setting the `DEBUG=*` env var as shown above allows for more verbose deployment logging to be displayed.

Example configs can be found in `./configs/`, one for tokens and another for chains. The chains config can be used to enable permisionless deployments, or to override the Hyperlane SDK's default values. Use the `--chain-config` flag to pass a chain config path to the deploy script.

When the command finishes, it will output the list of contracts.
