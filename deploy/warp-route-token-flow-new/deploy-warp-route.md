---
description: Deploy Warp Route to any Hyperlane supported chain
---

# Deploy Warp Route

Deploying HypERC20Collateral and HypERC20 on any [Hyperlane supported Chains](../../resources/domains.md).

[Full code for deploying Warp Route](https://github.com/hyperlane-xyz/hyperlane-token/blob/main/scripts/deploy.ts#L7)

```
# Install dependencies
yarn
# Build source and generate types
$ yarn build:dev
```

Use the following command to deploy Warp Route:

```
yarn ts-node scripts/deploy.ts — private-key $PRIVATE_KEY — token-config ./configs/warp-route-token-config.json
```

You can find code examples of a token [config here](https://github.com/hyperlane-xyz/hyperlane-token/blob/main/configs/warp-route-token-config.json) — this example is between Goerli, Alfajores, Fuji and Moonbasealpha testnets. You can use the same example for configuring your own Warp Route UI. You can find[ a full list of contract addresses in our docs](https://docs.hyperlane.xyz/docs/developers-faq-and-troubleshooting/addresses), that should get you all the information you need to successfully configure and deploy your first Warp Route.

```
{ 
"goerli": {
"type": "collateral",
"token": "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6",
"owner": "0x5bA371aeA18734Cb7195650aFdfCa4f9251aa513",
"mailbox": "0xCC737a94FecaeC165AbCf12dED095BB13F037685",
"interchainGasPaymaster": "0xF90cB82a76492614D07B82a7658917f3aC811Ac1"
},
"alfajores": {
"type": "synthetic",
"name": "Weth",
"symbol": "WETH",
"totalSupply": 0,
"owner": "0x5bA371aeA18734Cb7195650aFdfCa4f9251aa513",
"mailbox": "0xCC737a94FecaeC165AbCf12dED095BB13F037685",
"interchainGasPaymaster": "0xF90cB82a76492614D07B82a7658917f3aC811Ac1"
},
"fuji": {
"type": "synthetic",
"name": "Weth",
"symbol": "WETH",
"totalSupply": 0,
"owner": "0x5bA371aeA18734Cb7195650aFdfCa4f9251aa513",
"mailbox": "0xCC737a94FecaeC165AbCf12dED095BB13F037685",
"interchainGasPaymaster": "0xF90cB82a76492614D07B82a7658917f3aC811Ac1"
},
"moonbasealpha": {
"type": "synthetic",
"name": "Weth",
"symbol": "WETH",
"totalSupply": 0,
"owner": "0x5bA371aeA18734Cb7195650aFdfCa4f9251aa513",
"mailbox": "0xCC737a94FecaeC165AbCf12dED095BB13F037685",
"interchainGasPaymaster": "0xF90cB82a76492614D07B82a7658917f3aC811Ac1"
}
}
```

_Optionally you can configure the security in the Interchain Security Module. You can find more information about_ [_ISM configuration in the docs_](https://docs.hyperlane.xyz/docs/build-with-hyperlane/guides/receive-1#specifying-custom-isms)_. You can play around different ISMs but no need to._

With our Warp Route fully configured, we can now go back to our yarn commands, and get ready to deploy.

```
yarn ts-node scripts/deploy.ts — private-key $PRIVATE_KEY — token-config ./configs/warp-route-token-config.json
```

Note that you can create a bridge between any of the existing testnet chains that Hyperlane supports and also between any of existing mainnet chains based on your choice. Warp Routes does not support cross chain testnet to mainnet message exchange, but this can be worked around as well.
