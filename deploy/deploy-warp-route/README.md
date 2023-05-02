---
description: Interchain ERC20 and ERC721 tokens
---

# Warp Routes

{% content-ref url="deploy-a-warp-route.md" %}
[deploy-a-warp-route.md](deploy-a-warp-route.md)
{% endcontent-ref %}

### Overview of Warp Routes

Warp Routes are Hyperlane's take on the concept of token bridging, allowing you to permissionlessly transfer any ERC20-like asset to any chain via Hyperlane.

You can combine Warp Routes with a Hyperlane deployment to create economic trade routes between any chain and others already connected through Hyperlane.

This diagram below illustrates a fairly simplified overview of the flow in creating your Warp Route, and the resulting asset.

## Warp Route Architecture

<figure><img src="../../.gitbook/assets/image.png" alt=""><figcaption></figcaption></figure>

Warp Route contracts transfer value between chains by locking [#collateral-token](../../resources/glossary.md#collateral-token "mention")s on the origin chain (the [#collateral-chain](../../resources/glossary.md#collateral-chain "mention")) and then minting wrapped tokens on the destination chain (the[#synthetic-chain](../../resources/glossary.md#synthetic-chain "mention")).

Users can redeem their locked tokens at any time by transferring their wrapped tokens back to the collateral chain.

Like all applications built on top of Hyperlane, Warp Routes have customizable security via [sovereign-consensus](../../protocol/sovereign-consensus/ "mention"). This allows Warp Route deployers to configure and enforce custom rules and constraints that the interchain token must follow.

Warp Routes can be deployed between any set of chains that have Hyperlane deployments. If you would like to create a Warp Route that includes a chain that Hyperlane is not currently deployed on, feel free to [deploy-hyperlane.md](../deploy-hyperlane.md "mention")yourself!

{% content-ref url="deploy-a-warp-route.md" %}
[deploy-a-warp-route.md](deploy-a-warp-route.md)
{% endcontent-ref %}
