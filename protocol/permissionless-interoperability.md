---
description: A secure interchain messaging protocol
---

# Overview

Hyperlane is a generalized interchain messaging protocol that empowers developers to send messages from one blockchain to another. Messages can contain any arbitrary bytes, and are not limited to text. They can be used to transfer any information between blockchains. They can allow you to move around value, execute function calls, and many other things that allow for the creation of interchain applications, apps that can be accessed by users on any blockchain.

Users interface with the Hyperlane protocol via [messaging.md](messaging.md "mention") smart contracts, which provide an on-chain [messaging-api](../apis/messaging-api/ "mention") to send and receive interchain messages.

Hyperlane takes a modular approach to [sovereign-consensus](sovereign-consensus/ "mention"), allowing applications to configure and choose from a selection of [interchain-security-modules.md](sovereign-consensus/interchain-security-modules.md "mention") (ISMs). Applications may specify an ISM to customize the security model that secures their integration with the Hyperlane messaging API.

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
    V(("Validator(s)"))
    Relayer((Relayer))

    subgraph Origin
      Sender
      M_O[(Mailbox)]
      POS[Proof of Stake]

      Sender -- "dispatch(destination, recipient, body)" --> M_O
    end

    subgraph Cloud
      aws[(Metadata\nDatabase)]
    end

    M_O -. "indexing" .-> Relayer
    M_O -. "indexing" .-> V
    POS == "staking" === V

    V -- "signatures" --> aws

    subgraph Destination
      Recipient
      M_D[(Mailbox)]
      ISM[MultisigISM]

      M_D -- "verify(metadata, [origin, sender, body])" --> ISM
      M_D -- "handle(origin, sender, body)" --> Recipient
      ISM -. "interchainSecurityModule()" .- Recipient
    end

    Relayer -- "process()" --> M_D

    aws -. "metadata" .-> Relayer
    aws -. "moduleType()" .- ISM

    POS -. "validators()" .- ISM

    click ISM https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/solidity/contracts/isms/MultisigIsm.sol

    style Sender fill:#efab17
    style Recipient fill:#efab17
```
