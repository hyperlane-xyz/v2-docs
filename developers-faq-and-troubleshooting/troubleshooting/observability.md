---
description: How to use the Hyperlane Explorer to debug messages
---

# Debugging with Explorer

Visit the Explorer at [https://explorer.hyperlane.xyz](https://explorer.hyperlane.xyz/)

Then paste a sender/recipient address or a transaction hash into the top search field. All matching messages will be shown in the result list. Click the row for more details.

<figure><img src="../../.gitbook/assets/pending tx in msg explorer.png" alt=""><figcaption><p>Retrieving a transaction in the Hyperlane Message Explorer</p></figcaption></figure>

### Debugging failed messages

You'll know that a message failed to process because the bar at the top of the Message Explorer will turn red and the upper right section of the page will feature error reasons indicating why the message wasn't able to process.

<figure><img src="../../.gitbook/assets/failed tx in explorer.png" alt=""><figcaption><p>   Failed transaction from Fuji to Goerli</p></figcaption></figure>

If your message was not delivered it can be due to several factors:

#### Invalid destination

If the destination domain identifier (`uint32`) is not known to relay clients they will have no way to deliver your message. Refer to the [domain identifiers](../domains.md) docs for supported domains and the canonical identifiers to use when sending messages to these destinations.

#### Invalid recipient

If the recipient address (`bytes32`) is not a contract address that implements the [`IMessageRecipient` interface](../../developers/messaging-api/receive.md), the relayer will not be able to deliver your message.&#x20;

{% hint style="warning" %}
EVM addresses (`address`) must be left-padded with zeroes to be compliant. Refer to the [send encoding](../../developers/messaging-api/send.md#encoding) section for details and a `pure addressToBytes32` utility function.&#x20;
{% endhint %}

#### Unprocessable

If gas estimation of the message recipient's `IMessageRecipient.handle()` function fails, the [relayer](../../protocol/agents/relayer.md) will not deliver the message. The relayer will continue to estimate gas for message delivery, as state changes may allow for successful delivery of a previously undeliverable message.

{% hint style="info" %}
If you have a use case which is not accommodated by this behavior, **please reach out** [on Discord](https://discord.com/invite/KBD3aD78Bb).&#x20;
{% endhint %}

#### Underfunded

{% hint style="danger" %}
Users are **not currently required** to pay relaying fees but eventually this will be necessary for the economic sustainability of the protocol.
{% endhint %}

An underfunded message implies the [gas paid](../../developers/messaging-api/gas.md) for message delivery is insufficient. The relayer registered on the gas paymaster can [`claim`](https://github.com/abacus-network/abacus-monorepo/blob/main/solidity/core/contracts/InterchainGasPaymaster.sol#L62) these fees to compensate for gas costs incurred on the destination chain. The relayer client uses the [`eth_estimateGas`](https://ethereum.github.io/execution-apis/api-documentation/)RPC on the destination chain to determine the absolute cost of relaying a message, uses the [CoinGecko API](https://www.coingecko.com/en/api) to calculate the exchange rate between the two chains native assets, and will only pay for message processing if the message relay was funded appropriately on the source chain's paymaster (within some acceptable price deviation).

## Message status in your application

### Using Etherscan

You can also look at the Etherscan page of the recipient on the destination chain however be aware that the processing transaction won't show up on list of transactions as you would typically imagine. The reason for that is that relayers actually call the Mailbox contracts which in turn call the `handle` function on the recipient. Thus, you will find evidence of processing on the under the `Internal Txns` tab instead
