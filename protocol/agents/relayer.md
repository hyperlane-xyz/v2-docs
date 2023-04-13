---
description: Relayers deliver interchain messages to their recipients
---

# Relayers

Relayers are responsible for ensuring messages are delivered to their recipients. Relayers are a permissionless but integral part of the Hyperlane protocol. Anyone can run a relayer.

{% hint style="info" %}
Want to run a relayer? Follow the instructions at [relayers](../../operators/relayers/ "mention")
{% endhint %}

Relayers are configured to relay messages from an origin chain to one or more destination chains. A relayer observes the [messaging.md](../messaging.md "mention") on the origin chain, watching for new messages. When a new message is detected, the relayer queries the destination chain to determine the message recipient's [interchain-security-modules.md](../sovereign-consensus/interchain-security-modules.md "mention").

The relayer is then responsible for aggregating the metadata needed by that ISM. This will vary by ISM, and may include signatures from one or more [validators.md](validators.md "mention"), merkle proofs, zero knowledge proofs, and more!

Finally, relayers deliver the message to its recipient by calling `Mailbox.process()` on the destination chain with the aforementioned metadata.&#x20;

Relayers do not receive direct token incentives from the protocol, but relayers can configure their fee structure for the messages they process, enabling them to earn revenue streams for providing their critical service.

Relayers can easily configure the messages that they wish to process. Currently, the relayer will support:

1. A sender/recipient whitelist
2. A sender/recipient blacklist
3. The ability to accept [payments on the origin chain](../../sdks/building-applications/nodejs-sdk/gas.md) as for processing a message on the destination chain.&#x20;

For convenience, Abacus Works will run an open source and configurable relayer agent, implemented as a rust binary. If you'd like to run your own relayer, we've open sourced the [binary here](https://github.com/hyperlane-xyz/hyperlane-monorepo/tree/main/rust/agents/relayer).&#x20;

Eventually, we envision a robust marketplace of relayers, each providing unique transaction processing services with different fee structures. Additionally, it is possible that relayers will eventually receive token incentives from the protocol for the services they provide.

#### Error handling

The relayer may be configured to retry messages when processing fails. Messages that fail to process on the first attempt will cause the relayer to retry with exponential backoff. After a maximum amount of retries, the relayer will no longer attempt to process the message.

