---
description: A front-end for interchain token transfers
---

# Deploy the UI for your Warp Route

After you [deploy-a-warp-route.md](deploy-a-warp-route.md "mention"), you may want to deploy a UI for it. For that, you can simply use the [UI template](https://github.com/hyperlane-xyz/hyperlane-warp-ui-template).

### Configure & Customize the UI

Follow these [instructions](https://github.com/hyperlane-xyz/hyperlane-warp-ui-template/blob/main/CUSTOMIZE.md) for details on how to configure the UI's tokens and change the default branding assets/theme.

#### Configure Tokens

As mentioned in the [customization instructions](https://github.com/hyperlane-xyz/hyperlane-warp-ui-template/blob/main/CUSTOMIZE.md), the UI repo contains a token list (see `./src/consts/tokens.json)`which must be updated. It looks like this.

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
      "hypCollateralAddress": "0x145de8760021c4ac6676376691b78038d3DE9097"
    }
  ]
}
```

You can replace the `tokens` entry with the output that was written to `hyperlane-deploy/artifacts/warp-ui-token-list.json` when you followed the instructions to [deploy-a-warp-route.md](deploy-a-warp-route.md "mention").

### Deploy the UI

Since the UI is a Next.js app, you can use your favorite hosting service to host it. We recommend Vercel, which works very well with Next.

* Sign up for [Vercel](https://vercel.com/)
* Create a new project
* Connect it to your Git repo
* Hit Deploy!

And that's it! Now you and your users can use the UI to send tokens from the collateral chain to remote chains, from one remote chain to another, and from any remote chain back to the collateral chain.

