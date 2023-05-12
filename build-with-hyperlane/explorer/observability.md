---
description: How to use the Hyperlane Explorer to debug messages
---

# Debugging messages

Visit the Explorer at [https://explorer.hyperlane.xyz](https://explorer.hyperlane.xyz/)

Then paste a sender/recipient address or a transaction hash into the top search field. All matching messages will be shown in the result list. Click the row for more details.

<figure><img src="../../.gitbook/assets/pending tx in msg explorer.png" alt=""><figcaption><p>Retrieving a transaction in the Hyperlane Message Explorer</p></figcaption></figure>

### Debugging failed messages

You'll know that a message failed to process because the bar at the top of the Message Explorer will turn red and the upper right section of the page will feature error reasons indicating why the message wasn't able to process.

<figure><img src="../../.gitbook/assets/failed tx in explorer.png" alt=""><figcaption><p>Failed transaction from Fuji to Goerli</p></figcaption></figure>

If your message was not delivered it can be due to several factors:

#### Invalid destination

If the destination domain identifier (`uint32`) is not known to relay clients they will have no way to deliver your message. Refer to the [domains.md](../../resources/domains.md "mention") for known domains and the canonical identifiers to use when sending messages to these destinations.

#### Invalid recipient

If the recipient address (`bytes32`) is not a contract address that implements the [`IMessageRecipient` interface](../../apis/messaging-api/receive.md), the relayer will not be able to deliver your message.

{% hint style="warning" %}
EVM addresses (`address`) must be left-padded with zeroes to be compliant. Refer to the send [#encoding](../../apis/messaging-api/send.md#encoding "mention") section for details and a `pure addressToBytes32` utility function.
{% endhint %}

#### Unprocessable

If gas estimation of the message recipient's `IMessageRecipient.handle()` function fails, [relayer.md](../../protocol/agents/relayer.md "mention") will not be able to deliver the message. Relayers will continue to estimate gas for message delivery, as state changes may allow for successful delivery of a previously undeliverable message.

{% hint style="info" %}
If you have a use case which is not accommodated by this behavior, **please reach out** [on Discord](https://discord.com/invite/KBD3aD78Bb).
{% endhint %}

#### Underfunded

An underfunded message implies the [interchain-gas-payments.md](../../protocol/interchain-gas-payments.md "mention") made to deliver this message are insufficient.

Relayers use the [`eth_estimateGas`](https://ethereum.github.io/execution-apis/api-documentation/)RPC on the destination chain to determine the absolute cost of relaying a message. If this amount exceeds the total amount of gas paid for on the origin chain, relayers will typically refuse to deliver a message.

You can [manually-pay-for-interchain-gas.md](../guides/manually-pay-for-interchain-gas.md "mention") to resolve this.

### Using Etherscan

You can also look at the Etherscan page of the recipient on the destination chain however be aware that the processing transaction won't show up on list of transactions as you would typically imagine. The reason for that is that relayers actually call the Mailbox contracts which in turn call the `handle` function on the recipient. Thus, you will find evidence of processing on the under the `Internal Txns` tab instead
