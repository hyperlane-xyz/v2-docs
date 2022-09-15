---
description: How can I see my message get delivered?
---

# Observability

When you [send](messaging-api/send.md) an interchain message, your application may want to perform an action upon [receiving](messaging-api/receive.md) and processing the message on the destination chain. Your smart contracts can make state changes or emit their own events but there is some minimal observability included in the core protocol for your use.

{% hint style="info" %}
A fully-featured interchain message explorer is **coming soon**! For now, use the methods below for message observability.
{% endhint %}

## Mailbox Events

When you use the [send API](messaging-api/send.md), a `Dispatch` event is emitted from the `Outbox` contract with your `message` body and a `leafIndex` that uniquely identifies your message in the stored [Merkle tree](../protocol/messaging/outbox.md). When the message lands on the destination chain, a `Process` event is emitted from the corresponding origin `Inbox` contract with the [hash of your `message` body and `leafIndex`](https://github.com/abacus-network/abacus-monorepo/blob/main/solidity/core/contracts/libs/Message.sol#L48-L54). You can use this relation to trace when your message has been processed and the `recipient` contract's handle has been invoked with the `message` body.

### Using Block Explorers

If you visit a verified `Outbox` contract on a block explorer, you can easily view the most recent emitted `Dispatch` events. See the [Ethereum Outbox events tab on etherscan](https://etherscan.io/address/0x2f9DB5616fa3fAd1aB06cB2C906830BA63d135e3#events) and reference the [outbox addresses section](broken-reference) for other networks.

If you visit a verified `Inbox` contract on a block explorer, you can easily view the most recent emitted `Process` events. See the [Ethereum Inbox on Celo events tab on celoscan](https://celoscan.io/address/0x8105a095368f1a184CceA86cCe21318B5Ee5BE28#events) and reference the [inbox addresses section](broken-reference) for other networks.

### Using the NodeJS SDK

The Hyperlane Core App (built using the [App Framework](building-applications/)) exposes various utilities for message observability. To instantiate this app, reference the [Core App environments docs](building-applications/nodejs-sdk/contract-interaction/environments.md).

```typescript
import { AbacusCore } from '@abacus-network/sdk';
const core = AbacusCore.fromEnvironment(environment, multiProvider);
```

_Note: Abacus is the former name of the Hyperlane protocol. The repo and SDK will soon be renamed._

#### Get dispatched messages

Use an [ethers transaction receipt](https://docs.ethers.io/v5/api/providers/types/#providers-TransactionReceipt), get a list of dispatched messages. You can easily [fetch a transaction receipt from the transaction hash using the ethers provider.](https://docs.ethers.io/v5/api/providers/provider/#Provider-getTransactionReceipt)

```typescript
// included for reference
type DispatchedMessage = {
  leafIndex: number;
  message: string; // unparsed
  parsed: {
    origin: number;
    sender: string;
    destination: number;
    recipient: string;
    body: string;
  };
};
// get dispatched messages for tx receipt
const messages: DispatchedMessage[] = core.getDispatchedMessages(txReceipt);
```

#### Wait for message processing

Using an [ethers transaction receipt](https://docs.ethers.io/v5/api/providers/types/#providers-TransactionReceipt) from the source chain, wait for message processing and get destination chain(s) transaction receipt(s)!&#x20;

{% hint style="warning" %}
This utility leverages [ethers event polling](https://docs.ethers.io/v5/api/contract/contract/#Contract--events) and should be used with caution against RPC providers.
{% endhint %}

```typescript
const processReceipts = await core.waitForMessageProcessing(txReceipt);
```
