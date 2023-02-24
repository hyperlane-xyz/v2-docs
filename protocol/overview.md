---
description: A secure interchain messaging protocol
---

# Overview

Hyperlane is a generalized interchain messaging protocol that empowers developers to send messages from one blockchain to another. Messages can contain any arbitrary bytes, and are not limited to text. They can be used to transfer any information between blockchains. They can allow you to move around value, execute function calls, and many other things that allow for the creation of interchain applications, apps that can be accessed by users on any blockchain.

Users interface with the Hyperlane protocol via Mailbox smart contracts, which provide an on-chain [API](messaging.md) to send and receive interchain messages.

Hyperlane is secured by [sovereign consensus](sovereign-consensus.md), which allows applications to configure and choose from a selection of **interchain security modules** (ISMs). Applications may specify an ISM to customize the security model that secures their integration with the Hyperlane messaging API.

The default ISM is secured by Hyperlane validators. Validators can be slashed for attempting to censor or falsify messages via a delegated proof-of-stake protocol.&#x20;

<!-- INCLUDE diagrams/multisig-pos-ism.md -->
<!-- END -->
