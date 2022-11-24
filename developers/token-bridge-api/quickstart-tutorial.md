---
description: Send value across chains with Hyperlane's Liquidity Layer.
---

# Quickstart Tutorial

This tutorial demonstrates how to [send](../messaging-api/send.md) a simple interchain message alongside with tokens to a pre-deployed [`TestTokenRecipient`](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/solidity/contracts/test/TestTokenRecipient.sol) contract.&#x20;



{% hint style="warning" %}
Note that this tutorial does not cover [paying for the cost of relaying the message to the destination chain](../messaging-api/gas.md), which will eventually be required.
{% endhint %}

### Inputs

* `$TOKEN_BRIDGE_ROUTER`: The address of the TokenBridgeRouter which exists on Goerli and Fuji right now `0x3428e12EfDb2446c1E7feC3f1CED099A8a7cD541`
* `$DESTINATION_DOMAIN`: The domain ID of the destination chain. Domain IDs can be found [here](../domains.md). Goerli's domain ID is `5`, Fuji is `43113`
* `$RECIPIENT`: The address of the `TestTokenRecipient` contract on the destination chain padded to bytes32, `0x00000000000000000000000036597C9C49F3c5887A86466398480ddB66aD0759` on every chain.
* `$TOKEN_ADDRESS`: The address of the Token you want to transfer. On Goerli, USDC is at `0x07865c6e87b9f70255377e024ace6630c1eaa37f`. On Fuji, USDC is at `0x5425890298aed601595a70ab815c96711a31bc65`.

### Acquire Token

For transferring USDC via the Circle Bridge, you can use [https://usdcfaucet.com/](https://usdcfaucet.com/)

### Send a message with Tokens

Sending a message with tokens is a simple matter of calling `TokenBridgeRouter.dispatchWithTokens`. This function can be called easily using Etherscan+[Metamask](https://metamask.io/) or [cast](https://book.getfoundry.sh/cast/).

{% tabs %}
{% tab title="Using Metamask" %}
1. Navigate to the USDC token contract page on [Etherscan](https://goerli.etherscan.io/token/0x07865c6e87b9f70255377e024ace6630c1eaa37f#writeProxyContract)
2. Under the `Contract` tab, find the `Write as Proxy` button.
3. Click on the `Connect to Web3` button to connect your Wallet (i.e. Metamask). Make sure that you are on the correct network.
4. Expand the `approve` box.
5. Approve the TokenBridgeRouter at `0x3428e12EfDb2446c1E7feC3f1CED099A8a7cD541` as the spender with the desirable amount (Note that USDC has 6 decimals vs. the conventional 18)
6. Submit the transaction via Metamask
7. Navigate to the TokenBridgeRouter contract page on [Etherscan](https://goerli.etherscan.io/address/0x3428e12EfDb2446c1E7feC3f1CED099A8a7cD541).
8. Under the `Contract` tab, find the `Write as Proxy` button.
9. Click on the `Connect to Web3` button to connect your Wallet (i.e. Metamask). Make sure that you are on the correct network.
10. Expand the `dispatchWithTokens` box.
11. For destination domain, enter `$DESTINATION_DOMAIN`.&#x20;
12. For the recipient address, enter `$RECIPIENT`.
13. For the message body, enter whatever you like! A [string-to-hex converter website](https://dencode.com/en/string/hex) can help you write your message if you want to send a human-readable message. In the example below, we sent the "Hello World" string as `0x48656c6c6f20576f726c64`
14. For the token, enter `$TOKEN_ADDRESS`
15. For the amount, enter the desirable amount
16. For the bridge, enter the bridge name as a string (i.e. `Circle` or `Portal`)
17. Submit the transaction via your wallet/Metamask

    <figure><img src="../../.gitbook/assets/Screen Shot 2022-11-03 at 1.56.04 PM.png" alt=""><figcaption></figcaption></figure>
{% endtab %}

{% tab title="Using Cast" %}
You can call `TokenBridgeRouter.dispatchWithTokens` directly using `cast`. Make sure that you have a valid RPC URL for the origin chain and a private key with which you can pay for gas.

The final two parameters are the amount of the token you wish to send (not accounting for token decimals), and the bridge you wish to use. You can use the `Circle` or `Portal` bridges.

<pre class="language-shell" data-overflow="wrap"><code class="lang-shell"><strong>cast send $TOKEN_BRIDGE_ROUTER "dispatchWithTokens(uint32,bytes32,bytes,address,uint256,string)" $DESTINATION_DOMAIN $RECIPIENT $(cast --from-utf8 "your message") $TOKEN_ADDRESS 1000 Circle -rpc-url $RPC_URL
</strong><strong>--private-key $PRIVATE_KEY</strong></code></pre>
{% endtab %}
{% endtabs %}

If you view the transaction on a block explorer, you should be able to see the `Dispatch` event.

You can see an example message sending transaction [here](https://goerli.etherscan.io/tx/0x00631c5fbff220619364dcda57421086890b4edcbbdb42e6507e8fb3578e8013).

### Confirm delivery

You can use the [Hyperlane Message Explorer](https://explorer.hyperlane.xyz/) to track the status of the message/transfer.&#x20;

<figure><img src="../../.gitbook/assets/Token Bridge transaction on Hyperlane Explorer.png" alt=""><figcaption><p>Token Bridge API transaction viewed in the Hyperlane Message Explorer</p></figcaption></figure>

You can see the explorer page for the above transaction [here](https://explorer.hyperlane.xyz/message/79652).
