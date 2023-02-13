---
description: Send value across chains with Hyperlane's Liquidity Layer.
---

# Liquidity Layer

{% hint style="warning" %}
The LiquidityLayer API is in beta and deployed only on testnet. The API is subject to change
{% endhint %}

This tutorial demonstrates how to:

* [Send](../../apis/token-bridge-api.md#send) a simple interchain message alongside with tokens to a pre-deployed [`TestTokenRecipient`](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/solidity/contracts/test/TestTokenRecipient.sol) contract.
* [Pay for interchain gas](../../apis/token-bridge-api.md#paying-for-interchain-gas) to have a [relayer](../../protocol/agents/relayer.md) deliver the message.

### Inputs

* `$TOKEN_BRIDGE_ROUTER`: The address of the TokenBridgeRouter  `0x2abe0860D81FB4242C748132bD69D125D88eaE26`
* `$DESTINATION_DOMAIN`: The domain ID of the destination chain. Domain IDs can be found [here](../../resources/domains.md). Goerli's domain ID is `5`, Fuji is `43113`
* `$RECIPIENT`: The address of the `TestTokenRecipient` contract on the destination chain padded to bytes32, `0x00000000000000000000000036597C9C49F3c5887A86466398480ddB66aD0759` on every chain.
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

Next, you **must pay for interchain gas** in the following section.

If you view the transaction on a block explorer, you should be able to see the `Dispatch` event. You can see an example message sending transaction [here](https://goerli.etherscan.io/tx/0x00631c5fbff220619364dcda57421086890b4edcbbdb42e6507e8fb3578e8013).

### Pay For Interchain Gas

For a message to be delivered by an off-chain [relayer](../../protocol/agents/relayer.md), the message must [pay interchain gas](../../apis/token-bridge-api.md#paying-for-interchain-gas) on the origin chain to cover the destination chain transaction costs. This is done by calling the `payForGas` function of an "Interchain Gas Paymaster" contract, which lets you pay a relayer to deliver a message on your behalf.

This `payForGas` call would typically be done by a smart contract that would first dispatch the message and immediately pay for gas, but because we dispatched the message from an [externally owned account](https://ethereum.org/en/developers/docs/accounts/#types-of-account) (EOA), we need to pay for gas with a separate transaction.

#### Inputs

* `$IGP_ADDRESS` : The address of the [DefaultIsmInterchainGasPaymaster](../../resources/addresses.md#defaultisminterchaingaspaymaster-1) contract address on the origin chain.
* `$DESTINATION_DOMAIN`: The domain ID of the destination chain. Domain IDs can be found [here](../../resources/domains.md). This should be the same destination domain you used when sending the message.
* `$MESSAGE_ID`: This is a `0x`-prefixed hexadecimal 32-byte identifier of your message that you just dispatched.
  *   This is returned by the `TokenBridgeRouter.dispatchWithTokens` function, but for our purposes this can most easily be found in a block explorer. Navigate to the transaction where you previously called `TokenBridgeRouter.dispatchWithTokens` in a block explorer, open the "Logs" tab, and find the `DispatchId` log. The "Topic 1" is your message ID. Use the dropdown to select "Hex", and use this value. For example:



      <figure><img src="../../.gitbook/assets/Screen Shot 2023-01-26 at 10.47.06 AM.png" alt=""><figcaption><p>Finding the message ID from the <code>DispatchId</code> log</p></figcaption></figure>
* `$GAS_AMOUNT`: The amount of destination gas to pay for. We'll be paying for 350,000 gas, which is based off the overhead gas amount described [here](../../apis/token-bridge-api.md#paying-for-interchain-gas).

{% tabs %}
{% tab title="Using Metamask" %}
#### Getting the Interchain Gas Payment Quote

1. Navigate to the `DefaultIsmInterchainGasPaymaster` contract page on [Etherscan](https://goerli.etherscan.io/address/0xF90cB82a76492614D07B82a7658917f3aC811Ac1) (or its equivalent if you're sending from a non-Ethereum chain, which you could find [here](../../resources/addresses.md#defaultisminterchaingaspaymaster-1)).
2. Under the `Contract` tab, select `Read Contract`.
3. Expand the `quoteGasPayment` function.
4. For destination domain, enter `$DESTINATION_DOMAIN`.
5. For gas amount, enter `$GAS_AMOUNT`, which is `350000`.
6.  Click `Query` and make note of the amount returned as `$GAS_PAYMENT_QUOTE`. For example, at the time of writing, the quote is `1` wei.



    <figure><img src="../../.gitbook/assets/Screen Shot 2023-01-30 at 1.15.50 PM.png" alt=""><figcaption></figcaption></figure>

#### Paying the Interchain Gas Payment

1. Still on the `DefaultIsmInterchainGasPaymaster` contract page on Etherscan, select `Write Contract`.
2. Click on the `Connect to Web3` button to connect your Wallet (i.e. Metamask). Make sure that you are on the correct network.
3. Expand the `payForGas` function.
4. For the payable amount, Etherscan expects an amount quoted in ether, while our `$GAS_PAYMENT_QUOTE` is in wei. To convert from wei to ether, input the amount `$GAS_PAYMENT_QUOTE`, which is in wei, into [https://eth-converter.com/](https://eth-converter.com/) and copy the ether amount. Use this ether amount as the payable amount.
5. For the message ID, input your `$MESSAGE_ID`.
6. For the destination domain, input your `$DESTINATION_DOMAIN`.
7. For gas amount, enter `$GAS_AMOUNT`, which is `350000`.
8. For the refund address, input the address of the account you will sign the transaction with. This will receive a potential refund if you overpay for interchain gas.
9.  Click "Write" and submit the transaction via your wallet/Metamask.

    <figure><img src="../../.gitbook/assets/Screen Shot 2023-01-30 at 1.18.06 PM.png" alt=""><figcaption></figcaption></figure>
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

You can use the [Hyperlane Message Explorer](https://explorer.hyperlane.xyz/) to track the status of the message/transfer.&#x20;

<figure><img src="../../.gitbook/assets/Token Bridge transaction on Hyperlane Explorer.png" alt=""><figcaption><p>Token Bridge API transaction viewed in the Hyperlane Message Explorer</p></figcaption></figure>

You can see the explorer page for the above transaction [here](https://explorer.hyperlane.xyz/message/79652).
