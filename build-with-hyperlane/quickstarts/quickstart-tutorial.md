---
description: Send your first interchain message in under 5 minutes
---

# Messaging

This tutorial demonstrates how to:

* [Send](../../apis/messaging-api/send.md) a simple interchain message to a pre-deployed [`TestRecipient`](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/solidity/contracts/test/TestRecipient.sol) contract.
* [Pay for interchain gas](../guides/developers/paying-for-interchain-gas/) to have a [relayer](../../protocol/agents/relayer.md) deliver the message.

### Inputs

* `$MAILBOX_ADDRESS`: The [messaging.md](../../protocol/messaging.md "mention") contract address on the origin chain, see [addresses.md](../../resources/addresses.md "mention").
* `$DESTINATION_DOMAIN`: The domain ID of the destination chain, see [domains.md](../../resources/domains.md "mention")
* `$RECIPIENT`: The address of the `TestRecipient` contract on the destination chain, left padded to a `bytes32`. In our case: `0x00000000000000000000000036FdA966CfffF8a9Cdc814f546db0e6378bFef35`

### Send a message

Sending a message is a simple matter of calling `Mailbox.dispatch()`. This function can be called easily using Etherscan+[Metamask](https://metamask.io/) or [cast](https://book.getfoundry.sh/cast/).

{% tabs %}
{% tab title="Using Metamask" %}
1. Navigate to the `Mailbox` contract page on [Etherscan](https://etherscan.io/address/0x35231d4c2D8B8ADcB5617A638A0c4548684c7C70) (or its equivalent if you're sending from a non-ethereum chain, which you could find [here](../../resources/addresses.md#mailbox)).
2. Under the `Contract` tab, find the `Write as Proxy` button.
3. Click on the `Connect to Web3` button to connect your Wallet (i.e. Metamask). Make sure that you are on the correct network.
4. Expand the `dispatch` box.
5. For destination domain, enter `$DESTINATION_DOMAIN`. You can find some [here](../../resources/domains.md), or you could use `137` to send to Mainnet Polygon.
6. For the recipient address, enter `$RECIPIENT`. Remember to make sure to zero-pad this to a `bytes32` if you are using your own address. Alternatively, you can use `0x00000000000000000000000036FdA966CfffF8a9Cdc814f546db0e6378bFef35` (our test recipient address).
7. For the message body, enter whatever you like! A [string-to-hex converter website](https://dencode.com/en/string/hex) can help you write your message if you want to send a human-readable message. In the example below, we sent the "Hello World" string as `0x48656c6c6f20576f726c64`
8. Submit the transaction via your wallet/Metamask

![How to send an interchain message using Etherscan + Metamask](<../../.gitbook/assets/Screen Shot 2022-08-10 at 4.01.00 PM.png>)
{% endtab %}

{% tab title="Using Cast" %}
You can call `Mailbox.dispatch()` directly using `cast`. Make sure that you have a valid RPC URL for the origin chain and a private key with which you can pay for gas.

<pre class="language-shell" data-overflow="wrap"><code class="lang-shell"><strong>cast send $MAILBOX_ADDRESS "dispatch(uint32,bytes32,bytes)" $DESTINATION_DOMAIN $RECIPIENT $(cast --from-utf8 "your message") --rpc-url $RPC_URL
</strong><strong>--private-key $PRIVATE_KEY
</strong></code></pre>
{% endtab %}
{% endtabs %}

Next, you **must pay for interchain gas** in the following section.

If you view the transaction on a block explorer, you should be able to see the `Dispatch` event. You can see an example message sending transaction [here](https://kovan.etherscan.io/tx/0x7cabd0c3c780f62bbadff0b400086d46bfca0bf5c7cbd34a3e30c8880dddb5e3#eventlog).

### Pay For Interchain Gas

For a message to be delivered by an off-chain [relayer](../../protocol/agents/relayer.md), the message must [pay interchain gas](../guides/developers/paying-for-interchain-gas/) on the origin chain to cover the destination chain transaction costs. This is done by calling the `payForGas` function of an "Interchain Gas Paymaster" contract, which lets you pay a relayer to deliver a message on your behalf.

This `payForGas` call would typically be done by a smart contract that would first dispatch the message and immediately pay for gas, but because we dispatched the message from an [externally owned account](https://ethereum.org/en/developers/docs/accounts/#types-of-account) (EOA), we need to pay for gas with a separate transaction.

#### Inputs

* `$IGP_ADDRESS` : The address of the [DefaultIsmInterchainGasPaymaster](../../resources/addresses.md#defaultisminterchaingaspaymaster-read-here) contract address on the origin chain.
* `$DESTINATION_DOMAIN`: The domain ID of the destination chain. Domain IDs can be found [here](../../resources/domains.md). This should be the same destination domain you used when sending the message.
* `$MESSAGE_ID`: This is a `0x`-prefixed hexadecimal 32-byte identifier of your message that you just dispatched.
  *   This is returned by the `Mailbox.dispatch` function, but for our purposes this can most easily be found in a block explorer. Navigate to the transaction where you previously called `Mailbox.dispatch` in a block explorer, open the "Logs" tab, and find the `DispatchId` log. The "Topic 1" is your message ID. Use the dropdown to select "Hex", and use this value. For example:



      <figure><img src="../../.gitbook/assets/Screen Shot 2023-01-26 at 10.47.06 AM.png" alt=""><figcaption><p>Finding the message ID from the <code>DispatchId</code> log</p></figcaption></figure>

{% tabs %}
{% tab title="Using Metamask" %}
#### Getting the Interchain Gas Payment Quote

1. Navigate to the `DefaultIsmInterchainGasPaymaster` contract page on [Etherscan](https://etherscan.io/address/0x56f52c0A1ddcD557285f7CBc782D3d83096CE1Cc#readContract) (or its equivalent if you're sending from a non-Ethereum chain, which you could find [here](../../resources/addresses.md#defaultisminterchaingaspaymaster)).
2. Under the `Contract` tab, select `Read Contract`.
3. Expand the `quoteGasPayment` function.
4. For destination domain, enter `$DESTINATION_DOMAIN`.
5. For gas amount, enter `100000`.
6.  Click `Query` and make note of the amount returned as `$GAS_PAYMENT_QUOTE`. For example, at the time of writing, the quote is `1` wei.

    ![](<../../.gitbook/assets/Screen Shot 2023-01-30 at 11.30.56 AM (1).png>)

#### Paying the Interchain Gas Payment

1. Still on the `DefaultIsmInterchainGasPaymaster` contract page on Etherscan, select `Write Contract`.
2. Click on the `Connect to Web3` button to connect your Wallet (i.e. Metamask). Make sure that you are on the correct network.
3. Expand the `payForGas` function.
4. For the payable amount, Etherscan expects an amount quoted in ether, while our $GAS\_PAYMENT\_QUOTE is in wei. To convert from wei to ether, input the amount `$GAS_PAYMENT_QUOTE`, which is in wei, into [https://eth-converter.com/](https://eth-converter.com/) and copy the ether amount. Use this ether amount as the payable amount.
5. For the message ID, input your `$MESSAGE_ID`.
6. For the destination domain, input your `$DESTINATION_DOMAIN`.
7. For the gas amount, input `100000`.
8. For the refund address, input the address of the account you will sign the transaction with. This will receive a potential refund if you overpay for interchain gas.
9. Click "Write" and submit the transaction via your wallet/Metamask.

<figure><img src="../../.gitbook/assets/Screen Shot 2023-01-30 at 11.48.02 AM.png" alt=""><figcaption></figcaption></figure>
{% endtab %}

{% tab title="Using Cast" %}
We'll be paying for 100,000 gas to be used by the TestRecipient's message handler.

#### Getting the Interchain Gas Payment Quote

First, get a quote for how much your gas payment will cost, and save this in an environment variable called `$GAS_PAYMENT_QUOTE`:

{% code overflow="wrap" %}
```shell
cast call $IGP_ADDRESS "quoteGasPayment(uint32,uint256)" $DESTINATION_DOMAIN 100000 --rpc-url $RPC_URL
```
{% endcode %}

#### Paying the Interchain Gas Payment

Now, we can call `payGasFor`, and we supply the gas payment quote as value in the transaction. The final parameter, `$MY_ADDRESS`, is the address of the account whose private key you're signing with. This address will be refunded any overpayment.

<pre class="language-shell" data-overflow="wrap"><code class="lang-shell"><strong>cast send $IGP_ADDRESS "payForGas(bytes32,uint32,uint256,address)" $MESSAGE_ID $DESTINATION_DOMAIN 100000 $MY_ADDRESS --rpc-url $RPC_URL
</strong><strong>--private-key $PRIVATE_KEY --value $GAS_PAYMENT_QUOTE
</strong></code></pre>
{% endtab %}
{% endtabs %}

### Confirm delivery

After the transaction that sent your message is [finalized](../../resources/latencies.md), you should be able to see a corresponding transaction delivering your message to the `TestRecipient` contract on the destination chain. You can watch for this transaction on [Hyperlane's Message Explorer](https://explorer.hyperlane.xyz/) by entering the transaction hash or the sender/recipient address in the input field.\
\
You can see an example message delivery transaction [here](https://explorer.hyperlane.xyz/message/24275).

<figure><img src="../../.gitbook/assets/Test Message in Hyperlane Explorer.png" alt=""><figcaption><p>Test "Hello World" message sent from Ethereum to Polygon, shown in the Hyperlane Message Explorer</p></figcaption></figure>

Read more under the [Where is my message?](../explorer/observability.md) section to use tools like the[ Hyperlane Message Debugger.](https://explorer.hyperlane.xyz/debugger)

