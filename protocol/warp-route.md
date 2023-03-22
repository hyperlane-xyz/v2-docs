---
description: All you need to know about Warp Route Architecture
---

# Warp Route

## Warp Route Architecture

Warp Route contracts transfer value between chains by locking tokens as collateral on the origin chain (the Collateral chain) and then minting the token as wrapped token (HypERC-20 synthetics) which get transferred to the destination chain (the Synthetic chain referred to earlier). Locked tokens can be returned to the origin chain to reclaim the initial ERC-20 tokens (collateral) at any time. Unlike other bridges, Warp Routes have customizable security; each route can specify a contract (an Interchain Security Module) to be used to enforce rules and constraints the token route must follow.

Warp Routes use Hyperlane [Mailbox contracts](https://docs.hyperlane.xyz/docs/build-with-hyperlane/guides/v2-migration-guide#unified-mailboxes) which enable communication between chains. Mailbox contracts as well as [Interchain Security Modules](sovereign-consensus/) are implemented on any of the [mainnet and testnet chains](https://docs.hyperlane.xyz/docs/resources/domains) by Hyperlane. You can create routes between [any Hyperlane supported](../resources/domains.md) mainnet or testnet chains. Better yet, you can even use Warp Routes to bridge assets over to any new chain by [deploying Hyperlane](https://docs.hyperlane.xyz/docs/build-with-hyperlane/deploy-hyperlane) there yourself, thanks to [Permissionless Interoperability](https://docs.hyperlane.xyz/docs/protocol/permissionless-interoperability).

## Collateral vs Synthetic Chain

**Collateral chain = The Origin chain where you deposit any ERC-20 token to a** [**HypCollateral Contract**](https://github.com/hyperlane-xyz/hyperlane-token/blob/main/contracts/HypERC20Collateral.sol)

**Synthetic chain = The Destination chains between which HypERC-20 tokens can flow.** [**HypERC-20**](https://github.com/hyperlane-xyz/hyperlane-token/blob/main/contracts/HypERC20.sol) **tokens are minted 1:1 from tokens locked as collateral.**

The Collateral chain is where you deposit the ERC-20 tokens — it is the “origin chain” for your Warp Route — the permissionless token bridge. This chain locks and holds the token value, it can withdraw the token value when the HypERC-20 token which represents the ERC-20 token value is burned. Collateral token — any ERC-20. It does not get burned but its value is reflected 1:1 on the Synthetic chain(s). Users can redeem their HypERC-20 tokens for their origin tokens at any time.

Synthetic chain moves the HypERC-20 token which represents 1:1 value of the initial ERC-20 token from the Collateral chain and reflects it as HypERC-20 on the synthetic chain(s). HypERC-20 token can be minted via a Router in the token flow and used on the Synthetic chain to transfer value.&#x20;

## Deploy Warp Routes

Follow [Deploy Warp Routes](../deploy/deploy-warp-route/) guideliness to help you deploy Warp Route on any [Hyperlane supported chain](../resources/domains.md)
