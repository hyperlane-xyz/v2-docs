---
description: Make your warp route accessible to your users by deploying the reference UI
---

# Deploy the UI for your Warp Route

After [deploying the contracts for your own warp route](deploy-your-own-warp-route.md), it's time to deploy a UI for it. For that, you can simply use our UI template [https://github.com/hyperlane-xyz/hyperlane-warp-ui-template](https://github.com/hyperlane-xyz/hyperlane-warp-ui-template)

### Configure the UI

After creating a repo from the template, we customize the UI by specifying the `HypERC20Collateral` from our deploy in [`./src/consts/tokens.json`](https://github.com/hyperlane-xyz/hyperlane-warp-ui-template/blob/main/src/consts/tokens.json)``

```
{
  "name": "Hyperlane Default Tokens",
  "timestamp": "2022-12-23T12:00:00.000Z",
  "version": {
    "major": 1,
    "minor": 0,
    "patch": 0
  },
  "tags": {},
  "logoURI": "https://www.hyperlane.xyz/logo-blue.png",
  "keywords": ["hyperlane", "default"],
  "tokens": [
    {
      "chainId": 5,
      "address": "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6",
      "name": "Weth",
      "symbol": "WETH",
      "decimals": 18,
      "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
      "hypCollateralAddress": "0xff1232787e3791c256e4F4746aF4EE2db353329c"
    }
  ]
}
```

Under `hypCollateralAddress`, specify the router address that you got on the collateral chain (`goerli` in the example config).

### Deploy the UI

Since the UI is a very simple Next.js app, you can use your favorite hosting service to host it. In this guide, we will be using Vercel.

* Sign up for Vercel ([https://vercel.com/](https://vercel.com/))
* Create a new project
* Connect it to your Git repo
* Hit Deploy!

And that's it. Now you and your users can use the UI to send tokens from the collateral chain to remote chains, from one remote chain to another, and from any remote chain back to the collateral chain.

