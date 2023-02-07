# Accounts

This tutorial demonstrates how to:

* Make a simple call via Interchain Accounts to a pre-deployed [`TestRecipient`](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/solidity/core/contracts/test/TestRecipient.sol) contract on a remote destination chain.
* [Pay for interchain gas](../../apis/send.md#paying-for-interchain-gas) to have a [relayer](../../protocol/agents/relayer.md) deliver the message.

You can also check out the [`hyperlane-quickstart`](https://github.com/hyperlane-xyz/hyperlane-quickstart) repo for running this out of the box.

### Inputs

* `$DESTINATION_DOMAIN`: The domain ID of the destination chain. Domain IDs can be found [here](../../resources/domains.md).
* `$RECIPIENT`: The address of the `TestRecipient` contract on the destination chain, `0xBC3cFeca7Df5A45d61BC60E7898E63670e1654aE`

### Make a call

Sending a message is a simple matter of calling `InterchainAccountRouter.dispatch()`. This function can be called easily using Etherscan+[Metamask](https://metamask.io/) or [cast](https://book.getfoundry.sh/cast/).

{% tabs %}
{% tab title="Using Metamask" %}
1. Navigate to the `InterchainAccountRouter 0xE0Be420779cAd6E2bEA1E4F7C02F996D9ED1fCB5` contract page on [Etherscan](https://etherscan.io/address/0xE0Be420779cAd6E2bEA1E4F7C02F996D9ED1fCB5) (or whatever chain you want to send from)
2. Under the `Contract` tab, find the `Write Contract` button.
3. Click on the `Connect to Web3` button to connect your Wallet (i.e. Metamask). Make sure that you are on the correct network.
4. Expand the second `dispatch` box (There are different overloads for `dispatch`, one with direct arguments and one with the `Call` structs).
5. For destination domain, enter `$DESTINATION_DOMAIN`. You can find some [here](../../resources/domains.md), or you could use `137` to send to Polygon.
6. For the `target` argument, enter the `$RECIPIENT`
7. For the `data` argument, enter the ABI-encoded function call to the $RECIPIENT. To call `TestRecipient's` `fooBar(uint256,string):`
   1.  ➜ cast calldata "fooBar(uint256,string)" 1 "HelloWorld from an ICA"&#x20;

       which generates `0xf07c1f4700000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000001648656c6c6f576f726c642066726f6d20616e2049434100000000000000000000`

       You can use your preferred abi encoding tool (like [https://abi.hashex.org/](https://abi.hashex.org/)) as well
8. Submit the transaction via your wallet/Metamask



<figure><img src="../../.gitbook/assets/Screen Shot 2022-10-04 at 4.24.21 PM.png" alt=""><figcaption></figcaption></figure>
{% endtab %}

{% tab title="Using cast" %}
You can call the `InterchainAccountRouter` directly using `cast`. Make sure that you have a valid RPC URL for the origin chain and a private key with which you can pay for gas.

{% code overflow="wrap" %}
```shell
cast send 0xE0Be420779cAd6E2bEA1E4F7C02F996D9ED1fCB5 'dispatch(uint32, (address,bytes)[])' $DESTINATION_DOMAIN "[($RECIPIENT,$(cast calldata "fooBar(uint256,string)" 1 "HelloWorld from an ICA via cast"))]" --rpc-url $RPC_URL --private-key $PRIVATE_KEY
```
{% endcode %}
{% endtab %}
{% endtabs %}

Next, you **must pay for interchain gas** in the following section.

If you view the transaction on a block explorer, you should be able to see the `Dispatch` event. You can see an example message sending transaction [here](https://goerli.etherscan.io/tx/0xbb076b17dca5e436f574a4728dd59d25da4fd9d05c48c6ec304ea5a354849edf).

### Pay For Interchain Gas

For a message to be delivered by an off-chain [relayer](../../protocol/agents/relayer.md), the message must [pay interchain gas](../../apis/send.md#paying-for-interchain-gas) on the origin chain to cover the destination chain transaction costs. This is done by calling the `payForGas` function of an "Interchain Gas Paymaster" contract, which lets you pay a relayer to deliver a message on your behalf.

This `payForGas` call would typically be done by a smart contract that would first dispatch the message and immediately pay for gas, but because we dispatched the message from an [externally owned account](https://ethereum.org/en/developers/docs/accounts/#types-of-account) (EOA), we need to pay for gas with a separate transaction.

#### Inputs

* `$IGP_ADDRESS` : The address of the [DefaultIsmInterchainGasPaymaster](../../resources/addresses.md#defaultisminterchaingaspaymaster) contract address on the origin chain.
* `$DESTINATION_DOMAIN`: The domain ID of the destination chain. Domain IDs can be found [here](../../resources/domains.md). This should be the same destination domain you used when sending the message.
* `$MESSAGE_ID`: This is a `0x`-prefixed hexadecimal 32-byte identifier of your message that you just dispatched.
  *   This is returned by the `InterchainAccountRouter.dispatch()` function, but for our purposes this can most easily be found in a block explorer. Navigate to the transaction where you previously called `InterchainAccountRouter.dispatch()` in a block explorer, open the "Logs" tab, and find the `DispatchId` log. The "Topic 1" is your message ID. Use the dropdown to select "Hex", and use this value. For example:



      <figure><img src="../../.gitbook/assets/Screen Shot 2023-01-26 at 10.47.06 AM.png" alt=""><figcaption><p>Finding the message ID from the <code>DispatchId</code> log</p></figcaption></figure>
* `$GAS_AMOUNT`: The amount of destination gas to pay for. We'll be paying for 550,000 gas, which is based off the overhead gas amount described [here](../../apis/send.md#overhead-gas-amounts) when creating a new ICA.

{% tabs %}
{% tab title="Using Metamask" %}
#### Getting the Interchain Gas Payment Quote

1. Navigate to the `DefaultIsmInterchainGasPaymaster` contract page on [Etherscan](https://etherscan.io/address/0x56f52c0A1ddcD557285f7CBc782D3d83096CE1Cc) (or its equivalent if you're sending from a non-Ethereum chain, which you could find [here](../../resources/addresses.md#defaultisminterchaingaspaymaster)).
2. Under the `Contract` tab, select `Read Contract`.
3. Expand the `quoteGasPayment` function.
4. For destination domain, enter `$DESTINATION_DOMAIN`.
5. For gas amount, enter `$GAS_AMOUNT`, which is `550000`.
6. Click `Query` and make note of the amount returned as `$GAS_PAYMENT_QUOTE`. For example, at the time of writing, the quote is `1` wei.

<figure><img src="../../.gitbook/assets/Screen Shot 2023-01-30 at 2.05.19 PM.png" alt=""><figcaption></figcaption></figure>

#### Paying the Interchain Gas Payment

1. Still on the `DefaultIsmInterchainGasPaymaster` contract page on Etherscan, select `Write Contract`.
2. Click on the `Connect to Web3` button to connect your Wallet (i.e. Metamask). Make sure that you are on the correct network.
3. Expand the `payForGas` function.
4. For the payable amount, Etherscan expects an amount quoted in ether, while our `$GAS_PAYMENT_QUOTE` is in wei. To convert from wei to ether, input the amount `$GAS_PAYMENT_QUOTE`, which is in wei, into [https://eth-converter.com/](https://eth-converter.com/) and copy the ether amount. Use this ether amount as the payable amount.
5. For the message ID, input your `$MESSAGE_ID`.
6. For the destination domain, input your `$DESTINATION_DOMAIN`.
7. For gas amount, enter `$GAS_AMOUNT`, which is `550000`.
8. For the refund address, input the address of the account you will sign the transaction with. This will receive a potential refund if you overpay for interchain gas.
9.  Click "Write" and submit the transaction via your wallet/Metamask.

    <figure><img src="../../.gitbook/assets/Screen Shot 2023-01-30 at 2.05.42 PM.png" alt=""><figcaption></figcaption></figure>
{% endtab %}

{% tab title="Using cast" %}
#### Getting the Interchain Gas Payment Quote

First, get a quote for how much your gas payment will cost, and save this in an environment variable called `$GAS_PAYMENT_QUOTE`:

{% code overflow="wrap" %}
```shell
cast call $IGP_ADDRESS "quoteGasPayment(uint32,uint256)" $DESTINATION_DOMAIN $GAS_AMOUNT --rpc-url $RPC_URL
```
{% endcode %}

#### Paying the Interchain Gas Payment

Now, we can call `payGasFor`, and we supply the gas payment quote as value in the transaction. The final parameter, `$MY_ADDRESS`, is the address of the account whose private key you're signing with. This address will be refunded any overpayment.

<pre class="language-shell" data-overflow="wrap"><code class="lang-shell"><strong>cast send $IGP_ADDRESS "payForGas(bytes32,uint32,uint256,address)" $MESSAGE_ID $DESTINATION_DOMAIN $GAS_AMOUNT $MY_ADDRESS --rpc-url $RPC_URL
</strong><strong>--private-key $PRIVATE_KEY --value $GAS_PAYMENT_QUOTE
</strong></code></pre>
{% endtab %}
{% endtabs %}

### Confirm delivery

After the transaction that sent your call is [finalized](../../resources/latencies.md), you should be able to see a corresponding transaction delivering your message to the `TestRecipient` contract on the destination chain. You can watch for this transaction on [Hyperlane's Message Explorer](https://explorer-v2.hyperlane.xyz/) by entering the transaction hash or the sender/recipient address in the input field.\
\
You can see an example message delivery transaction [here](https://explorer.hyperlane.xyz/message/24275).

<figure><img src="../../.gitbook/assets/Test Message Sent -- Hyperlane Explorer.png" alt=""><figcaption><p>This transaction sent a "Hello World" message from Goerli to Alfajores</p></figcaption></figure>

Read more under the [`Where is my message?` section](../troubleshooting/observability.md) to use tools like the[ Hyperlane Message Debugger.](https://explorer.hyperlane.xyz/debugger)
