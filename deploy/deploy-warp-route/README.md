---
description: >-
  Step-by-step guide to deploying your first Warp Routes, allowing you to bring
  your assets to any chain
---

# Deploy Warp Route

### Overview of Warp Routes

Warp Routes are Hyperlane's unique take on the concept of token bridging, allowing you to permissionlessly bridge any ERC20-like asset to any chain via Hyperlane. You can combine Warp Routes with a Hyperlane deployment to create economic trade routes between any chain and others already connected through Hyperlane.

Once a Warp Route is created, the resulting asset is a true [Interchain Token](../../build-with-hyperlane/examples/erc20-token.md), meaning it can traverse between any Hyperlane connected chain with ease.&#x20;

This diagram below illustrates a fairly simplified overview of the flow in creating your Warp Route, and the resulting asset.&#x20;

## Warp Route Architecture

<figure><img src="../../.gitbook/assets/image.png" alt=""><figcaption></figcaption></figure>

Warp Route contracts transfer value between chains by locking tokens as collateral on the origin chain (the Collateral chain) and then minting the token as wrapped token (HypERC-20 synthetics) which get transferred to the destination chain (the Synthetic chain referred to earlier). Locked tokens can be returned to the origin chain to reclaim the initial ERC-20 tokens (collateral) at any time. Unlike other bridges, Warp Routes have customizable security; each route can specify a contract (an Interchain Security Module) to be used to enforce rules and constraints the token route must follow.

Warp Routes use Hyperlane [Mailbox contracts](https://docs.hyperlane.xyz/docs/build-with-hyperlane/guides/v2-migration-guide#unified-mailboxes) which provide a simple communication interface between chains. Mailbox contracts as well as [Interchain Security Modules](../../protocol/sovereign-consensus/) are implemented on any of the [mainnet and testnet chains](https://docs.hyperlane.xyz/docs/resources/domains) by Hyperlane. You can create routes between [any Hyperlane supported](../../resources/domains.md) mainnet or testnet chains. Better yet, you can even use Warp Routes to bridge assets over to any new chain by [deploying Hyperlane](https://docs.hyperlane.xyz/docs/build-with-hyperlane/deploy-hyperlane) there yourself, thanks to [Permissionless Interoperability](https://docs.hyperlane.xyz/docs/protocol/permissionless-interoperability).

## Collateral vs Synthetic Chain

**Collateral chain = The Origin chain where you deposit any ERC-20 token to a** [**HypCollateral Contract**](https://github.com/hyperlane-xyz/hyperlane-token/blob/main/contracts/HypERC20Collateral.sol)

**Synthetic chain = The Destination chains between which HypERC-20 tokens can flow.** [**HypERC-20**](https://github.com/hyperlane-xyz/hyperlane-token/blob/main/contracts/HypERC20.sol) **tokens are minted 1:1 from tokens locked as collateral.**

The Collateral chain is where you deposit the ERC-20 tokens — it is the “origin chain” for your Warp Route — the permissionless token bridge. This chain is where tokens are held while a warped representation of them exists. Tokens can be withdrawn when HypERC-20 token is burned.&#x20;

Collateral token — any ERC-20. It does not get burned but its value is reflected 1:1 on the Synthetic chain(s). Users can redeem their HypERC-20 tokens for their origin tokens at any time.

Synthetic chain(s) are the chains on which the newly minted HypERC-20 tokens live, and the chains to which they can be transferred to.&#x20;

## Deploy Warp Routes

Follow [Deploy Warp Routes](./) to help you deploy Warp Route on any chain with [Hyperlane](../../resources/domains.md)
