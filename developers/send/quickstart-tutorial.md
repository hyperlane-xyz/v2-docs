# Quickstart Tutorial

This tutorial demonstrates how to make a simple call via Interchain Accounts to a pre-deployed [`TestRecipient`](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/solidity/core/contracts/test/TestRecipient.sol) contract on a remote destination chain. You can also check out the [`hyperlane-quickstart`](https://github.com/hyperlane-xyz/hyperlane-quickstart) repo for running this out of the box.

### Inputs

* `$DESTINATION_DOMAIN`: The domain ID of the destination chain. Domain IDs can be found [here](../domains.md).
* `$RECIPIENT`: The address of the `TestRecipient` contract on the destination chain,`` `0xBC3cFeca7Df5A45d61BC60E7898E63670e1654aE` ``

### Make a call

Sending a message is a simple matter of calling `Outbox.dispatch()`. This function can be called easily using Etherscan+[Metamask](https://metamask.io/) or [cast](https://book.getfoundry.sh/cast/).

{% tabs %}
{% tab title="Using Metamask" %}
1. Navigate to the `InterchainAccountRouter 0xc011170d9795a7a2d065E384EAd1CA3394A7d35E` contract page on [Etherscan](https://etherscan.io/address/0xc011170d9795a7a2d065E384EAd1CA3394A7d35E) (or whatever chain you want to send from)
2. Under the `Contract` tab, find the `Write Contract` button.
3. Click on the `Connect to Web3` button to connect your Wallet (i.e. Metamask). Make sure that you are on the correct network.
4. Expand the second `dispatch` box (There are different overloads for `dispatch`, one with direct arguments and one with the `Call` structs).
5. For destination domain, enter `$DESTINATION_DOMAIN`. You can find some [here](../domains.md), or you could use `0x706f6c79` to send to Polygon.
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
cast send 0xc011170d9795a7a2d065E384EAd1CA3394A7d35E 'dispatch(uint32, (address,bytes)[])' $DESTINATION_DOMAIN "[($RECIPIENT,$(cast calldata "fooBar(uint256,string)" 1 "HelloWorld from an ICA via cast"))]" --rpc-url $RPC_URL --private-key $PRIVATE_KEY
```
{% endcode %}
{% endtab %}
{% endtabs %}

If you view the transaction on a block explorer, you should be able to see the `Dispatch` event. You can see an example message sending transaction [here](https://goerli.etherscan.io/tx/0xbb076b17dca5e436f574a4728dd59d25da4fd9d05c48c6ec304ea5a354849edf).



### Confirm delivery

After the transaction that sent your call is [finalized](../latencies.md), you should be able to see a corresponding transaction delivering your message to the `TestRecipient` contract on the destination chain. You can watch for this transaction on [Hyperlane's Message Explorer](https://explorer.hyperlane.xyz/) by entering the transaction hash or the sender/recipient address in the input field.\
\
You can see an example message delivery transaction [here](https://explorer.hyperlane.xyz/message/24275).

<figure><img src="../../.gitbook/assets/Test Message Sent -- Hyperlane Explorer.png" alt=""><figcaption><p>This transaction sent a "Hello World" message from Goerli to Alfajores</p></figcaption></figure>

Read more under the [`Where is my message?` section](../troubleshooting/observability.md) to use tools like the[ Hyperlane Message Debugger.](https://explorer.hyperlane.xyz/debugger)
