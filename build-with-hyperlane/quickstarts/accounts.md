# Accounts

This tutorial demonstrates how to make a simple interchain call using the [accounts](../../apis-and-sdks/accounts/ "mention") to a pre-deployed [`TestRecipient`](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/solidity/contracts/test/TestRecipient.sol) contract on a remote chain.

You can also check out the [`hyperlane-quickstart`](https://github.com/hyperlane-xyz/hyperlane-quickstart) repo for running this out of the box.

{% hint style="info" %}
Want to learn more about interchain accounts? Take a look at the [accounts](../../apis-and-sdks/accounts/ "mention") documentation
{% endhint %}

### Inputs

* `$DESTINATION_DOMAIN`: The domain ID of the destination chain. See [domains.md](../../resources/domains.md "mention")
* `$RECIPIENT`: The address of the `TestRecipient` contract on the destination chain,`0x36FdA966CfffF8a9Cdc814f546db0e6378bFef35`
* `$CALLDATA`: The calldata of the call to make on `TestRecipient`, which we generate using `cast`: `0xf07c1f4700000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000001648656c6c6f576f726c642066726f6d20616e2049434100000000000000000000`

```
$ cast calldata "fooBar(uint256,string)" 1 "HelloWorld from an ICA"
```

### Make a call

Sending a message is a simple matter of calling `InterchainAccountRouter.callRemote()`. This function can be called easily using Etherscan+[Metamask](https://metamask.io/) or [cast](https://book.getfoundry.sh/cast/).

{% tabs %}
{% tab title="Using Metamask" %}
1. Navigate to the `InterchainAccountRouter` contract page on Etherscan (or whatever chain you want to send from). See [addresses.md](../../resources/addresses.md "mention") for `InterchainAccountRouter` addresses
2. Under the `Contract` tab, find the `Write Contract` button.
3. Click on the `Connect to Web3` button to connect your Wallet (i.e. Metamask). Make sure that you are on the correct network.
4. Expand the `callRemote` box
5. For the `_destination` argument, enter `$DESTINATION_DOMAIN`. You can find some [here](../../resources/domains.md), or you could use `137` to send to Polygon.
6. For the `_to` argument, enter the `$RECIPIENT`
7. For the `_value` argument, enter 0
8. For the `_data` argument, enter the `$CALLDATA`
9. Submit the transaction via your wallet/Metamask
{% endtab %}

{% tab title="Using cast" %}
You can call the `InterchainAccountRouter` directly using `cast`. Make sure that you have a valid RPC URL for the origin chain and a private key with which you can pay for gas.

<pre class="language-shell" data-overflow="wrap"><code class="lang-shell"><strong>cast send 0xE0Be420779cAd6E2bEA1E4F7C02F996D9ED1fCB5 \
</strong><strong>  'callRemote(uint32,address,uint256,bytes)' \
</strong><strong>  $DESTINATION_DOMAIN $RECIPIENT 0 $CALLDATA \
</strong><strong>  --rpc-url $RPC_URL --private-key $PRIVATE_KEY
</strong></code></pre>
{% endtab %}
{% endtabs %}

If you view the transaction on a block explorer, you should be able to see the `Dispatch` event. You can see an example message sending transaction [here](https://goerli.etherscan.io/tx/0xbb076b17dca5e436f574a4728dd59d25da4fd9d05c48c6ec304ea5a354849edf).

{% hint style="warning" %}
For your call to be executed on the destination chain, you **must** [manually-pay-for-interchain-gas.md](../guides/paying-for-interchain-gas/manually-pay-for-interchain-gas.md "mention"), using `550000` for the gas amount
{% endhint %}

{% content-ref url="../guides/paying-for-interchain-gas/manually-pay-for-interchain-gas.md" %}
[manually-pay-for-interchain-gas.md](../guides/paying-for-interchain-gas/manually-pay-for-interchain-gas.md)
{% endcontent-ref %}
