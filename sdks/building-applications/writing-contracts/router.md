---
description: A write-once deploy-everywhere pattern for interchain applications
---

# Router

Application developers looking to write their contracts once and deploy them on multiple chains should consider building with the [`Router`](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/solidity/contracts/Router.sol) pattern.

In this pattern, an instance of the application's contracts is deployed on each application-supported chain. Each instance is made aware of the addresses of instances on other chains. These instances use Hyperlane to communicate information and state to and from instances on remote chains.

<!-- INCLUDE diagrams/router.md -->
<!-- END -->

Developers using this pattern can inherit from the `Router` mix-in contract. `Router` is a [`HyperlaneConnectionClient`](abacusconnectionclient.md) that tracks the addresses of other `Router` contract addresses on remote chains. This allows `Routers` to send messages directly to others without having to specify addresses. It also allows `Routers` to reject messages sent from other untrusted senders.

<!-- INCLUDE node_modules/@hyperlane-xyz/core/contracts/Router.sol -->
<!-- END -->
