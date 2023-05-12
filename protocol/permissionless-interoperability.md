---
description: The Permissionless Interoperability Layer
---

# Overview

Hyperlane is the first [#permissionless-interoperability](../deploy/permissionless-interoperability.md#permissionless-interoperability "mention") layer that allows smart contract developers to send arbitrary data between blockchains.

Developers can use Hyperlane to move tokens, execute function calls, and many other things that allow for the creation of interchain applications, apps that can be accessed by users on any blockchain.

Users interface with the Hyperlane protocol via [messaging.md](messaging.md "mention") smart contracts, which provide an on-chain [messaging-api](../apis/messaging-api/ "mention") to send and receive interchain messages.

Hyperlane takes a modular approach to security, allowing applications to configure and choose from a selection of [sovereign-consensus](sovereign-consensus/ "mention") (ISMs). Applications may specify an ISM to customize the security model that secures their integration with the Hyperlane messaging API.

```mermaid
%%{ init: {
  "theme": "neutral",
  "themeVariables": {
    "mainBkg": "#025AA1",
    "textColor": "white",
    "clusterBkg": "white"
  },
  "themeCSS": ".edgeLabel { color: black }",
  "flowchart": {"useMaxWidth": "true" }
}}%%

flowchart TB
    Relayer((Relayer))

    subgraph Origin
      Sender
      M_O[(Mailbox)]

      Sender -- "1. dispatch(destination, recipient, body)" --> M_O
    end

    M_O -. "2. emit Message(origin, sender, destination, recipient, body)" .-> Relayer

    subgraph Destination
      Recipient
      M_D[(Mailbox)]
      ISM[InterchainSecurityModule]

      M_D -. "4. interchainSecurityModule()" .-> Recipient
      M_D -- "5. verify(metadata, message)" --> ISM
      M_D -- "6. handle(origin, sender, body)" --> Recipient
    end

    Relayer -- "3. process(metadata, message)" --> M_D

    style Sender fill:#efab17
    style Recipient fill:#efab17
```
