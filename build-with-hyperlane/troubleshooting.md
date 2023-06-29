---
description: Having trouble with Hyperlane? Let's help you figure it out!
---

# Troubleshooting/Developer FAQ

As you navigate the interchain space and begin sending your first messages between blockchains, you may run into some issues. This section will help you troubleshoot common issues so you can get right back on the Interchain Highway and onwards to your destination!

### Message Delivery

For a simple approach to debugging messages, try the Hyperlane Explorer. It can diagnose common issues with message delivery. See [Debugging with Explorer](explorer/observability.md) for details.

Still need more help? Find our team on the [Hyperlane Discord](http://discord.gg/hyperlane) and ask away!

#### Can I retry my messages?

Relayers are configured to automatically retry delivering a message with an exponential back-off (assuming that there was sufficient gas paid for on the origin chain).

#### Etherscan says an Error ocurrred

More often than not, it is not actually an error. What happens is that the [messaging.md](../protocol/messaging.md "mention") will attempt to make a call to the recipient to query its [sovereign-consensus](../protocol/sovereign-consensus/ "mention"). If a recipient does not specify an ISM by implementing the interface, the Mailbox will default to the default ISM that is configured on it. However, to Etherscan, the transaction trace includes a revert which it calls out, however in this case, it is a false-positive. So if you see a process transaction like [this one](https://goerli-optimism.etherscan.io/tx/0x753843852e95048c21ce7b4e68149e8496beb86174197f8d727467dae1183dae), know that your message has actually been processed.

<figure><img src="../.gitbook/assets/Screen Shot 2023-03-18 at 11.59.44 AM.png" alt=""><figcaption><p>This is actually fine!</p></figcaption></figure>

<figure><img src="../.gitbook/assets/Screen Shot 2023-03-18 at 11.58.57 AM.png" alt=""><figcaption><p>This is also fine!</p></figcaption></figure>

### Message cancellation

Once a message is enqueued on a Mailbox merkle tree, from the system perspective, messages are perpetually processable. If messages are supposed to be of limited validity or cancelable, it is up to the application to encode those semantics into their message bytes.&#x20;

### Off-chain Agents

#### Missing name field error

An error about a missing `name` field most likely indicates that you have an environment variable that implies the existence of a chain, but said chain does not exist in the config files. You may have mispelled the ENV name (`HYP_BASE_CHAINS_GOERLI_CONNECTION_URL)`. Or you may have specified a new chain but forgot to load the corresponding config file.
