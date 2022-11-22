---
description: How can I see what happens once my messages are sent?
---

# Where is my message?

This section shows you how to track interchain messages both manually and programmatically.

## Using the Hyperlane Message Explorer

Simply paste a sender/recipient address or a transaction hash into the input field on the Message Explorer to view details about a given message.

<figure><img src="../.gitbook/assets/pending tx in msg explorer.png" alt=""><figcaption><p>Retrieving a transaction in the Hyperlane Message Explorer</p></figcaption></figure>

### Debugging failed messages

You'll know that a message failed to process because the bar at the top of the Message Explorer will turn red and the upper right section of the page will feature error reasons indicating why the message wasn't able to process.

<figure><img src="../.gitbook/assets/failed tx in explorer.png" alt=""><figcaption><p>   Failed transaction from Fuji to Goerli</p></figcaption></figure>

If your message was not delivered it can be due to several factors:

#### Invalid destination

If the destination domain identifier (`uint32`) is not known to relay clients they will have no way to deliver your message. Refer to the [domain identifiers](domains.md) docs for supported domains and the canonical identifiers to use when sending messages to these destinations.

#### Invalid recipient

If the recipient address (`bytes32`) is not a contract address that implements the [`IMessageRecipient` interface](messaging-api/receive.md), the relayer will not be able to deliver your message.&#x20;

{% hint style="warning" %}
EVM addresses (`address`) must be left-padded with zeroes to be compliant. Refer to the [send encoding](messaging-api/send.md#encoding) section for details and a `pure addressToBytes32` utility function.&#x20;
{% endhint %}

#### Unprocessable

If gas estimation of the message recipient's `IMessageRecipient.handle()` function fails, the [relayer](../protocol/agents/relayer.md) will not deliver the message. The relayer will continue to estimate gas for message delivery, as state changes may allow for successful delivery of a previously undeliverable message.

{% hint style="info" %}
If you have a use case which is not accommodated by this behavior, **please reach out** [on Discord](https://discord.com/invite/KBD3aD78Bb).&#x20;
{% endhint %}

#### Underfunded

{% hint style="danger" %}
Users are **not currently required** to pay relaying fees but eventually this will be necessary for the economic sustainability of the protocol.
{% endhint %}

An underfunded message implies the [gas paid](messaging-api/gas.md) for message delivery is insufficient. The relayer registered on the gas paymaster can [`claim`](https://github.com/abacus-network/abacus-monorepo/blob/main/solidity/core/contracts/InterchainGasPaymaster.sol#L62) these fees to compensate for gas costs incurred on the destination chain. The relayer client uses the [`eth_estimateGas`](https://ethereum.github.io/execution-apis/api-documentation/)RPC on the destination chain to determine the absolute cost of relaying a message, uses the [CoinGecko API](https://www.coingecko.com/en/api) to calculate the exchange rate between the two chains native assets, and will only pay for message processing if the message relay was funded appropriately on the source chain's paymaster (within some acceptable price deviation).

## Message status in your application

When you [send a message](messaging-api/send.md), a `Dispatch` event is emitted from the `Outbox` contract with the `message` body and a `leafIndex` that uniquely identifies your message in the stored [Merkle tree](../protocol/messaging/outbox.md). When the message is delivered to the destination chain, a `Process` event is emitted from the `Inbox` contract with the [hash of your `message` body and `leafIndex`](https://github.com/abacus-network/abacus-monorepo/blob/main/solidity/core/contracts/libs/Message.sol#L48-L54). You can use this relation to trace when your message has been processed and the `recipient` contract's handle has been invoked with the `message` body in your application.

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

### Using Etherscan

You can also look at the Etherscan page of the recipient on the destination chain however be aware that the processing transaction won't show up on list of transactions as you would typically imagine. The reason for that is that relayers actually call the Mailbox contracts which in turn call the `handle` function on the recipient. Thus, you will find evidence of processing on the under the `Internal Txns` tab instead
