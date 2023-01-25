# Paying For Interchain Gas

{% hint style="info" %}
Changes have been made to how gas payments work and a new set of IGP contract addresses have been released as of January 25, 2023. The latest information is reflected here. See [Migration to Enforced Interchain Gas Payments](migrating-to-enforced-interchain-gas-payments.md) for migration details and future plans.
{% endhint %}

The lifecycle of a Hyperlane message involves two transactions: one on the origin chain to send the message, and one on the destination chain to deliver the message.

For convenience, Hyperlane provides an on-chain API on the origin chain that can be used to pay [relayers](../../protocol/agents/relayer.md) in the origin chain's native token to deliver messages on the destination chain. This payment is called an interchain gas payment.
