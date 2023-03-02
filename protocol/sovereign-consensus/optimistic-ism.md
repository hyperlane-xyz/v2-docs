---
description: Prioritizing safety over liveness
---

# Optimistic ISM

{% hint style="warning" %}
`OptimisticISM` is coming soon and is not yet implemented. This page is shown for informational purposes only. Details may change as the design matures.
{% endhint %}

The `OptimisticISM` encodes the optimistic verification security model pioneered by [Optics](https://docs.celo.org/protocol/bridge/optics) and adopted by [Synapse](https://docs.synapseprotocol.com/protocol/optimistic-verification), [Nomad](https://docs.nomad.xyz/the-nomad-protocol/verification-mechanisms/optimistic-verification), and [Connext](https://blog.connext.network/optimistic-bridges-fb800dc7b0e0).

Much like the [multisig-ism.md](multisig-ism.md "mention"), an `OptimisticISM` requires that `m` of `n` [validators.md](../agents/validators.md "mention") have attested to the validity of a particular interchain message. However, unlike the [multisig-ism.md](multisig-ism.md "mention"), messages do not get immediately delivered to their recipient. Instead, messages are not delivered until a **fraud window** has passed.

During the fraud window, any one of the **watchers** configured on the `OptimisticISM` have the opportunity to flag a message as fraudulent, preventing it from being delivered.

**This security model prioritizes safety over liveness;** only one watcher needs to be honest in order for the model to be safe. Dishonest watchers, however, can prevent valid messages from being delivered.
