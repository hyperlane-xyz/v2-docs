---
description: Send and receive interchain messages using Hyperlane
---

# Messaging API

Hyperlane provides an on-chain API for sending and receiving interchain messages.

Cant wait to get started? Follow the [messaging.md](../../build-with-hyperlane/quickstarts/messaging.md "mention") quickstart to send your first interchain message in less than five minutes. Otherwise, read on—

#### Interface

To [send.md](send.md "mention") interchain messages, reference the `Mailbox.dispatch()` API.

To [receive.md](receive.md "mention") interchain messages, implement the `IMessageRecipient` interface.

```mermaid
%%{ init: {
  "theme": "neutral",
  "themeVariables": {
    "mainBkg": "#025AA1",
    "textColor": "white",
    "clusterBkg": "white"
  },
  "themeCSS": ".edgeLabel { color: black }"
}}%%

flowchart LR
    subgraph Origin Chain
      Sender
      M_O[(Mailbox)]
      Sender -- "dispatch(destination, recipient, body)" --> M_O
    end

    subgraph Destination Chain
      Recipient[IMessageRecipient]
      M_D[(Mailbox)]

      M_D -- "handle(origin, sender, body)" --> Recipient
    end

    M_O -. "relay" .-> M_D

    click M_O https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/solidity/contracts/Mailbox.sol
    click Recipient https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/solidity/interfaces/IMessageRecipient.sol
    click M_D https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/solidity/contracts/Mailbox.sol

    style Sender fill:#efab17
    style Recipient fill:#efab17
```

#### Testing

See the [unit-testing.md](../../build-with-hyperlane/guides/unit-testing.md "mention") documentation to see how to test your integration with the Hyperlane messaging API using the `MockMailbox` contracts.

#### Interchain gas

Delivering an interchain message requires submitting a transaction on the destination chain. Optionally, you can pay for the gas for this transaction on the origin chain, and let Hyperlane [relayers](../../operators/relayers/ "mention") deliver your message for you.

Learn more about [paying-for-interchain-gas](../../build-with-hyperlane/guides/developers/paying-for-interchain-gas/ "mention").
