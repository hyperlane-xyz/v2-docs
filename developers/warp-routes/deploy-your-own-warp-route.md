---
description: Find out how you can deploy your own Warp Route
---

# Deploy your own Warp Route

Since Warp Routes are at their heart just simple HypERC20s which themselves are simple Router applications, deploying a Warp Route for any token becomes very simple.&#x20;

### Configuration

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

Each config has exactly one entry for the chain on which the canonical token lives (that's where you specify the token address for the `HypERC20Collateral` which holds the token as collateral). On all other chains, synthetic `HypERC20`s are deployed by specifying the metadata. For all chains, you have to specify common things like contract owners and Hyperlane contracts.

If no `interchainSecurityModule` is specified, the default from the Mailbox will be used.

### Deployment

Clone the [https://github.com/hyperlane-xyz/hyperlane-token](https://github.com/hyperlane-xyz/hyperlane-token) repo and get it setup:

```
$ yarn install
$ yarn build
```

You can then just run the following script:

```
$ DEBUG=* yarn ts-node scripts/deploy.ts --private-key $PRIVATE_KEY ----token-config trade-route-example-config.json
```

You have to pass a private key and the path to the config file as arguments to the command. If you would like to see more verbose deployment output, set the `DEBUG=*` env var.

When the command finishes, it will output the list of contracts.
