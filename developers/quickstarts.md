---
description: >-
  Want to quickly explore how Hyperlane works without writing any code? You're
  in the right place.
---

# Quickstarts

Each API has a quickstart section that can be used with just Metamask or foundry's cast, but if you are looking for a repo that you can clone and run locally, check out [https://github.com/hyperlane-xyz/hyperlane-quickstart/](https://github.com/hyperlane-xyz/hyperlane-quickstart/)

### Messaging&#x20;

Hyperlane makes interchain communication straightforward by providing a simple on-chain API for sending and receiving messages.

Send your first message in under 5 minutes with our [Messaging Quickstart](messaging-api/quickstart-tutorial.md).

### Interchain Accounts

With Hyperlane, you can make a simple call via Interchain Accounts to a pre-deployed [`TestRecipient`](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/solidity/core/contracts/test/TestRecipient.sol) contract on a remote destination chain.&#x20;

Try it here with the [ICA Quickstart](send/quickstart-tutorial.md).

### Interchain Queries

Query any contract, not just `IMessageRecipient`s with the `handle()` function (even legacy contracts!).&#x20;

Make a view call in moments using `TestQuerySender` and the [IQS Quickstart](query/quickstart-tutorial.md).

### Sending Tokens

You've sent messages with Hyperlane; now it's time to bring value into the mix.&#x20;

Send tokens alongside messages with our [Liquidity Layer API Quickstart](token-bridge-api/quickstart-tutorial.md).

