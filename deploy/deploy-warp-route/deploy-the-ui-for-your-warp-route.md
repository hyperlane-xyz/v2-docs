---
description: A front-end for interchain token transfers
---

# Deploy a UI for your Warp Route

After you [deploy-a-warp-route.md](deploy-a-warp-route.md "mention"), you may want to deploy a UI for it. You can use the [UI template](https://github.com/hyperlane-xyz/hyperlane-warp-ui-template) and customize it to fit your needs.

### Configure & Customize the UI

Follow these [instructions](https://github.com/hyperlane-xyz/hyperlane-warp-ui-template/blob/main/CUSTOMIZE.md) for details on how to configure the UI's tokens and change the default branding assets/theme.

#### Configure Tokens

As mentioned in the [customization instructions](https://github.com/hyperlane-xyz/hyperlane-warp-ui-template/blob/main/CUSTOMIZE.md), the UI repo contains a token list (see `./src/consts/tokens.ts)`which must be updated. Here's an example:

```typescript
import { TokenMetadata } from '../features/tokens/types';

export const tokenList: TokenMetadata[] = [
  {
    chainId: 5,
    address: '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6',
    hypCollateralAddress: '0x145de8760021c4ac6676376691b78038d3DE9097',
    name: 'Weth',
    symbol: 'WETH',
    decimals: 18,
    logoURI: '/logos/weth.png',
  },
];

```

You can replace the `tokens` entry with the output that was written to `hyperlane-deploy/artifacts/warp-ui-token-list.ts` from the [deploy-a-warp-route.md](deploy-a-warp-route.md "mention") instructions.

### Deploy the UI

Since the UI is a Next.js app, you can use your favorite hosting service to host it. We recommend [Vercel](https://vercel.com), which works very well with Next. [Netlify](https://www.netlify.com) and [Fleek](https://fleek.co) are also a good options.

* Sign up for [Vercel](https://vercel.com/)
* Create a new project
* Connect it to your Git repo
* Hit Deploy!

And that's it! Now you and your users can use the UI to send tokens from the collateral chain to remote chains, from one remote chain to another, and from any remote chain back to the collateral chain.

