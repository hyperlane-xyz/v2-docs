---
description: Send value across chains with Hyperlane's Liquidity Layer.
---

# Liquidity Layer

{% hint style="warning" %}
The LiquidityLayer API is in beta and deployed only on testnet. The API is subject to change
{% endhint %}

This tutorial demonstrates how to:

* [Send](../../apis-and-sdks/token-bridge-api.md#send) a simple interchain message alongside with tokens to a pre-deployed [`TestTokenRecipient`](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/solidity/contracts/test/TestTokenRecipient.sol) contract.
* [Pay for interchain gas](../../apis-and-sdks/token-bridge-api.md#paying-for-interchain-gas) to have a [relayer](../../protocol/agents/relayer.md) deliver the message.

### Inputs

* `$TOKEN_BRIDGE_ROUTER`: The address of the TokenBridgeRouter  `0x2abe0860D81FB4242C748132bD69D125D88eaE26`
* `$DESTINATION_DOMAIN`: The domain ID of the destination chain. Domain IDs can be found [here](../../resources/domains.md). Goerli's domain ID is `5`, Fuji is `43113`
* `$RECIPIENT`: The address of the `TestTokenRecipient` contract on the destination chain padded to bytes32, `0x00000000000000000000000085ac1164878e017b67660a74ff1f41f3D05C02Bb` on every chain.
* `$TOKEN_ADDRESS`: The address of the Token you want to transfer. On Goerli, USDC is at `0x07865c6e87b9f70255377e024ace6630c1eaa37f`. On Fuji, USDC is at `0x5425890298aed601595a70ab815c96711a31bc65`.

### Acquire Token

For transferring USDC via the Circle Bridge, you can use [https://usdcfaucet.com/](https://usdcfaucet.com/)

### Send a message with Tokens

Sending a message with tokens is a simple matter of calling `TokenBridgeRouter.dispatchWithTokens`. This function can be called easily using Etherscan+[Metamask](https://metamask.io/) or [cast](https://book.getfoundry.sh/cast/).

{% tabs %}
{% tab title="Using Metamask" %}
#### Approve USDC to the Liquidity Layer

1. Navigate to the USDC token contract page on [Etherscan](https://goerli.etherscan.io/token/0x07865c6e87b9f70255377e024ace6630c1eaa37f#writeProxyContract)
2. Under the `Contract` tab, find the `Write as Proxy` button.
3. Click on the `Connect to Web3` button to connect your Wallet (i.e. Metamask). Make sure that you are on the correct network.
4. Expand the `approve` box.
5. Approve the TokenBridgeRouter at `0x2abe0860D81FB4242C748132bD69D125D88eaE26` as the spender with the desirable amount (Note that USDC has 6 decimals vs. the conventional 18)
6. Submit the transaction via Metamask

#### Dispatch a Message With Tokens

1. Navigate to the TokenBridgeRouter contract page on [Etherscan](https://goerli.etherscan.io/address/0x2abe0860D81FB4242C748132bD69D125D88eaE26).
2. Under the `Contract` tab, find the `Write as Proxy` button.
3. Click on the `Connect to Web3` button to connect your Wallet (i.e. Metamask). Make sure that you are on the correct network.
4. Expand the `dispatchWithTokens` box.
5. For destination domain, enter `$DESTINATION_DOMAIN`.&#x20;
6. For the recipient address, enter `$RECIPIENT`.
7. For the message body, enter whatever you like! A [string-to-hex converter website](https://dencode.com/en/string/hex) can help you write your message if you want to send a human-readable message. In the example below, we sent the "Hello World" string as `0x48656c6c6f20576f726c64`
8. For the token, enter `$TOKEN_ADDRESS`
9. For the amount, enter the desirable amount
10. For the bridge, enter the bridge name as a string (i.e. `Circle` or `Portal`)
11. Submit the transaction via your wallet/Metamask

    <figure><img src="../../.gitbook/assets/Screen Shot 2022-11-03 at 1.56.04 PM.png" alt=""><figcaption></figcaption></figure>
{% endtab %}

{% tab title="Using Cast" %}
You can call `TokenBridgeRouter.dispatchWithTokens` directly using `cast`. Make sure that you have a valid RPC URL for the origin chain and a private key with which you can pay for gas.

The final two parameters are the amount of the token you wish to send (not accounting for token decimals), and the bridge you wish to use. You can use the `Circle` or `Portal` bridges.

This example shows how to send 1 USDC (USDC has 6 decimals, so `1000000` is one full USDC) via the Circle bridge.

<pre class="language-shell" data-overflow="wrap"><code class="lang-shell"><strong>cast send $TOKEN_BRIDGE_ROUTER "dispatchWithTokens(uint32,bytes32,bytes,address,uint256,string)" $DESTINATION_DOMAIN $RECIPIENT $(cast --from-utf8 "your message") $TOKEN_ADDRESS 1000000 Circle -rpc-url $RPC_URL
</strong><strong>--private-key $PRIVATE_KEY
</strong></code></pre>
{% endtab %}
{% endtabs %}

{% hint style="warning" %}
For your transfer to be executed on the destination chain, you **must** [manually-pay-for-interchain-gas.md](../guides/paying-for-interchain-gas/manually-pay-for-interchain-gas.md "mention"), using `350000` for the gas amount
{% endhint %}

{% content-ref url="../guides/paying-for-interchain-gas/manually-pay-for-interchain-gas.md" %}
[manually-pay-for-interchain-gas.md](../guides/paying-for-interchain-gas/manually-pay-for-interchain-gas.md)
{% endcontent-ref %}
