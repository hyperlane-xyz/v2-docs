---
description: What Hyperlane offers to you, defined by stakeholder group
---

# Why Should You Use Hyperlane?

Hyperlane was built to cater to the modular future of blockchains, but what does it do for you? Read below to understand how Hyperlane could benefit your own situation:&#x20;

## New chains + rollups

As a new chain/rollup you face a major bottleneck due to permissioned access to interoperability. Currently, you have to lobby interoperability teams to support your chain, but these teams can't keep up manually deploying to every new chain. User and liquidity growth on your chain suffers as you wait for these permissioned interoperability teams to deploy, if they ever do.&#x20;

Hyperlane fixes this problem by introducing [Permissionless Interoperability](broken-reference), enabling any chain to access interoperability out-of-the-box, and without needing permission. Hyperlane was specifically built to serve the modular future of blockchains, With permissionless access to interoperability, it becomes significantly easier to onboard users and liquidity from established chains like Ethereum, Arbitrum, Polygon, and more. It's like building a highway straight to your new town, instantly stimulating your economy from day one.

## Rollups-as-a-Service providers

If you're running a rollup-as-a-service providers or have built a rollup framework, it's important to consider the connectivity of your users' rollups. How will these rollups be linked to each other and to existing blockchains at launch? How will they onboard users and capital? Interoperability plays a vital role during the initial bootstrapping phase and throughout the growth of any rollups in your ecosystem. Hyperlane enables you to [deploy interoperability right out-of-the-box](../deploy/deploy-hyperlane.md) so any of your customers can access interoperability at launch for a smoother bootstrapping phase.

## Apps without access to interoperability

What if you're an app on a long-tail chain without interoperability? You're stranded from accessing new users and liquidity. You need to lobby permissioned interoperability teams to deploy on your chain. But most interoperability teams don’t even want to spend time deploying on your chain if it isn’t already big. It's a frustrating chicken-and-egg problem that hurts apps on long-tail chains. Hyperlane fixes this with Permissionless Interoperability.&#x20;

Even if there is an existing interoperability solution on a chain, as an interchain app you’re limited by their roster of supported chains, slow deployment pace, and have no control over where they deploy in the future. Your growth as an interchain app is dependent on the permissioned interoperability team’s decisions.

Don't depend on the permissioned interoperability providers anymore, [permissionlessly deploy](../deploy/deploy-hyperlane.md) Hyperlane out-of-the-box yourself, on any chain you need. The cool part? Once you deploy Hyperlane on your chain, everyone else on the chain can access interoperability as well, leveling up the ecosystem and benefitting your app in more ways.

## Apps that need interchain composability

For app developers looking to upgrade their interchain capabilities, Hyperlane offers multiple off the shelf tools to get started with:

* [Messaging API](../apis/messaging-api/) for sending and receiving interchain messages.
* [Accounts API](../apis-and-sdks/accounts.md) for creating + calling smart contracts on remote chains.
* [Warp Routes API](../apis-and-sdks/warp-api.md) for moving assets between chains
* [Queries API](../apis/query.md) for querying state on remote chains.
* [Liquidity API](broken-reference) for attaching value to your Hyperlane messages
* And our [Hyperlane SDK](../apis-and-sdks/building-applications/) for building interchain apps if you need help getting started.

In addition, Hyperlane gives you the ability to customize your interchain security with[ Interchain Security Modules (ISMs)](https://docs.hyperlane.xyz/docs/protocol/sovereign-consensus). Most interoperability protocols today are built with a one-size-fits-all security model, where every supported chain is immediately opted-in to a connection with newly added chains. Under this model, the attack surface increases as more chains are added. And you can’t do anything about it as a developer. You have no control over your own app’s security. Hyperlane helps you remove this dependency with Modular Security.

## Asset issuers

As an asset issuer that wants to expand your asset interchain, you run into two main roadblocks: Permissioned bridge token lists and uncertain security. Existing bridges whitelist and gatekeep the tokens available for bridging, restricting long tail assets from expanding to other chains. On top of that, the majority of current bridges pool assets under homogenous security models controlled by the bridge teams. So you're stuck lobbying the bridge team to whitelist your token, and praying their security is sufficient to secure your assets.

Hyperlane offers an alternative with [Warp Routes](../apis-and-sdks/warp-api.md). With Warp Routes, anyone can transfer any assets between any Hyperlane-supported chains, secured by a modular security model customizable by you, the asset deployer.&#x20;
