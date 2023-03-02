---
description: Watchtowers observe the network for validator fraud
---

# Watchtowers

{% hint style="warning" %}
`Watchtowers` are coming soon and is not yet implemented. This page is shown for informational purposes only. Details may change as the design matures.
{% endhint %}

[validators.md](validators.md "mention") are responsible for signing attestations of [messaging.md](../messaging.md "mention") state on the origin chain. These attestations can be consumed by [interchain-security-modules.md](../sovereign-consensus/interchain-security-modules.md "mention") to prove the validity of interchain messages on the destination chain.

But who watches them? Who makes sure they perform their role dutifully, without fault? The Watchtowers!

Watchtowers are responsible for observing a [messaging.md](../messaging.md "mention") and validator signatures to detect if validators are attempting to censor or falsify messages. They are a permissionless agent by which the network protects against fraud.

If fraud is detected, the watchtower submits evidence to the origin chain, slashing the validator. Watchtowers earn a reward for successfully submitting evidence of fraud.

The presence of one or more watchtowers acts to deter misbehavior by validators.

For convenience, Abacus Works will run an open source and configurable watchtower agent, implemented as a rust binary. Watchtowers will remain an open source and permissionless role. Applications could run watchtowers, but so could validators, relayers, and any other stakeholder in the Hyperlane ecosystem.

