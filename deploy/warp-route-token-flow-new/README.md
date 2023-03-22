---
description: How Tokens are being transferred when using Hyperlane Warp Routes
---

# Warp Route Token Flow - new

## Warp Route Token Flow

<figure><img src="../../.gitbook/assets/image.png" alt=""><figcaption></figcaption></figure>

As a developer, you transfer any ERC-20 contract on the Collateral chain which [HypERC20Collateral](https://github.com/hyperlane-xyz/hyperlane-token/blob/main/contracts/HypERC20Collateral.sol) wraps to mint new [HypERC20](https://github.com/hyperlane-xyz/hyperlane-token/blob/main/contracts/HypERC20.sol) tokens. Then the mailbox contract on the collateral chain passes the data as a message to the relayer. The relayer pass the message data over to [Interchain Security Module (ISM)](../../build-with-hyperlane/guides/receive-1.md) which verifies the message, pass the information back to Mailbox which then send the data over to [HypERC20](https://github.com/hyperlane-xyz/hyperlane-token/blob/main/contracts/HypERC20.sol) contract on the synthetic chain that mint and reflect the value 1:1 of the ERC-20 contract on the Collateral (origin) chain.

Warp Routes require gas fees to function. Fees are paid as part of outbound messages.The Router estimates the gas fee for the transfer before transferring the [HypERC20](https://github.com/hyperlane-xyz/hyperlane-token/blob/main/contracts/HypERC20.sol) tokens to destination chains. That’s why you need to have a gas token (like ETH or any other native mainnet or testnet token) on the Collateral (source) chain before deploying or using a Warp Route.

