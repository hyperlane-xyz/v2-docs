---
description: Send your first interchain message in under 5 minutes
---

# Quickstart Tutorial

This tutorial demonstrates how to [send](send.md) a simple interchain message to a pre-deployed [`TestRecipient`](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/solidity/core/contracts/test/TestRecipient.sol) contract.

{% hint style="warning" %}
Note that this tutorial does not cover [paying for the cost of relaying the message to the destination chain](gas.md), which will eventually be required.
{% endhint %}

### Inputs

* `$OUTBOX_ADDRESS`: The [Outbox](../../protocol/messaging/outbox.md) contract address on the origin chain. Hyperlane contract addresses can be found [here](../addresses.md#outbox).
* `$DESTINATION_DOMAIN`: The domain ID of the destination chain. Domain IDs can be found [here](../domains.md).
* `$RECIPIENT`: The address of the `TestRecipient` contract on the destination chain, left padded to a `bytes32`. In our case: `0x000000000000000000000000BC3cFeca7Df5A45d61BC60E7898E63670e1654aE`

### Send a message

Sending a message is a simple matter of calling `Outbox.dispatch()`. This function can be called easily using Etherscan+[Metamask](https://metamask.io/) or [cast](https://book.getfoundry.sh/cast/).

{% tabs %}
{% tab title="Using Metamask" %}
1. Navigate to the `Outbox` contract page on [Etherscan](https://etherscan.io/address/0x2f9DB5616fa3fAd1aB06cB2C906830BA63d135e3#writeProxyContract) (or its equivalent if you're sending from a non-ethereum chain, which you could find [here](../addresses.md#outbox)).
2. Under the `Contract` tab, find the `Write as Proxy` button.
3. Click on the `Connect to Web3` button to connect your Wallet (i.e. Metamask). Make sure that you are on the correct network.
4. Expand the `dispatch` box.
5. For destination domain, enter `$DESTINATION_DOMAIN`. You can find some [here](../domains.md), or you could use `0x706f6c79` to send to Polygon.
6. For the recipient address, enter `$RECIPIENT`. Remember to make sure to zero-pad this to a `bytes32` if you are using your own address. Alternatively, you can use any of the recipient addresses provided [here](quickstart-tutorial.md#testrecipient-addresses), or use `0x000000000000000000000000BC3cFeca7Df5A45d61BC60E7898E63670e1654aE` if you're sending to Polygon.
7. For the message body, enter whatever you like! A [string-to-hex converter website](https://dencode.com/en/string/hex) can help you write your message if you want to send a human-readable message. In the example below, we sent the "Hello World" string as `0x48656c6c6f20576f726c64`
8. Submit the transaction via your wallet/Metamask

![How to send an interchain message using Etherscan + Metamask](<../../.gitbook/assets/Screen Shot 2022-08-10 at 4.01.00 PM.png>)
{% endtab %}

{% tab title="Using Cast" %}
You can call `Outbox.dispatch()` directly using `cast`. Make sure that you have a valid RPC URL for the origin chain and a private key with which you can pay for gas.

<pre class="language-shell" data-overflow="wrap"><code class="lang-shell"><strong>cast send $OUTBOX_ADDRESS "dispatch(uint32,bytes32,bytes)" $DESTINATION_DOMAIN $RECIPIENT $(cast --from-utf8 "your message") --rpc-url $RPC_URL
</strong><strong>--private-key $PRIVATE_KEY</strong></code></pre>
{% endtab %}
{% endtabs %}

That's all it takes! If you view the transaction on a block explorer, you should be able to see the `Dispatch` event.

You can see an example message sending transaction [here](https://kovan.etherscan.io/tx/0x7cabd0c3c780f62bbadff0b400086d46bfca0bf5c7cbd34a3e30c8880dddb5e3#eventlog).

### Confirm delivery

After the transaction that sent your message is [finalized](../latencies.md), you should be able to see a corresponding transaction delivering your message to the `TestRecipient` contract on the destination chain. You can watch for this transaction on the destination chain's block explorer by querying for the recipient's address.&#x20;

If your message body was a human readable string, you can view it in the logs by selecting "Text" in the dropdown for the third parameter.\
\
You can see an example message delivery transaction [here](https://mumbai.polygonscan.com/address/0x0f860bfd24d08c484033d478fe4b7cda2c9167ff#events.).

Read more under the [Where is my message?](../observability.md) section to use tools like the[ Hyperlane Message Debugger.](https://explorer.hyperlane.xyz/debugger)

![This transaction delivered an interchain message to the TestRecipient contract on Mumbai](<../../.gitbook/assets/Screen Shot 2022-08-10 at 4.04.40 PM.png>)

