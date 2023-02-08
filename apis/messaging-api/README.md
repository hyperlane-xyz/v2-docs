---
description: Send and receive interchain messages using Hyperlane
---

# Messaging API

```mermaid
%%{init: {'theme': 'neutral', 'themeCSS': '.node rect { fill: #025AA1 } .edgeLabel { color: black } .nodeLabel { color: white }'}}%%
flowchart LR
	subgraph origin chain
		sender --"dispatch()"--> MO[API]
	end

	MO -."relayer".-> MD

	subgraph destination chain
		MD[API] --"handle()"--> recipient
	end
```

Hyperlane provides an on-chain API for sending and receiving interchain messages.

Cant wait to get started? Follow [this tutorial](../../build-with-hyperlane/quickstarts/quickstart-tutorial.md) to send your first interchain message in less than five minutes. Otherwise, read on—

To send interchain messages, reference the [`Mailbox.dispatch()` API](send.md).

To receive interchain messages, implement the [`IMessageRecipient.handle()`](receive.md) interface.

You can [unit test](../../build-with-hyperlane/guides/unit-testing.md) your integration with the Hyperlane messaging API using the `MockMailbox`  contracts.

Delivering an interchain message requires submitting a transaction on the destination chain. Optionally, you can pay for the gas for this transaction on the origin chain, and let a Hyperlane [relayer](../../protocol/agents/relayer.md) deliver your message for you.

Learn more about [paying-for-interchain-gas](../../build-with-hyperlane/guides/developers/paying-for-interchain-gas/ "mention").
