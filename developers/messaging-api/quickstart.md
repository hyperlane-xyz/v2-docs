---
description: Send your first interchain message in under 5 minutes
---

# Quickstart

This tutorial demonstrates how to [send](send.md) a simple interchain message to a pre-deployed [`TestRecipient`](https://github.com/abacus-network/abacus-monorepo/blob/e199e9688a4b5710fe45eefd2f04ecb84385952c/solidity/core/contracts/test/TestRecipient.sol) contract.

### Inputs

* `$OUTBOX_ADDRESS`: The [Outbox](../../protocol/messaging/outbox.md) contract address on the origin chain. Abacus contract addresses can be found [here](../addresses/).
* `$DESTINATION_DOMAIN`: The domain ID of the destination chain. Domain IDs can be found [here](../domains.md).
* `$RECIPIENT`: The address of the `TestRecipient` contract on the destination chain, left padded to a `bytes32`. TestRecipient contract addresses can be found [here](quickstart.md#appendix).

### Send a message

Sending a message is a simple matter of calling `Outbox.dispatch()`. This function can be called easily using Etherscan+[Metamask](https://metamask.io/) or [cast](https://book.getfoundry.sh/cast/).

{% tabs %}
{% tab title="Using Metamask" %}
1. Navigate to the `Outbox` contract page on Etherscan (or its equivalent if you're sending from a non-ethereum chain).
2. Under the `Contract` tab, find the `Write as Proxy` button.
3. Click on the `Connect to Web3` button to connect your Wallet (i.e. Metamask). Make sure that you are on the correct network.
4. Expand the `dispatch` box.
5. For destination domain, enter `$DESTINATION_DOMAIN`.
6. For the recipient address, enter `$RECIPIENT`. Remember to make sure to zero-pad this to a `bytes32`.
7. For the message body, enter whatever you like! A [string-to-hex converter website](https://dencode.com/en/string/hex) can help if you want to send a human-readable message. In the example below, we sent the "Hello World" string.
8. Submit the transaction via your wallet/Metamask

![How to send an interchain message using Etherscan + Metamask](<../../.gitbook/assets/Screen Shot 2022-08-10 at 4.01.00 PM.png>)
{% endtab %}

{% tab title="Using Cast" %}
You can call `Outbox.dispatch()` directly using `cast`. Make sure that you have a valid RPC URL for the origin chain and a private key with which you can pay for gas.

<pre class="language-shell" data-overflow="wrap"><code class="lang-shell"><strong>cast send $OUTBOX_ADDRESS "dispatch(uint32,bytes32,bytes)" $DESTINATION_DOMAIN $RECIPIENT $(cast --from-utf8 "your message") --rpc-url $RPC_URL
</strong><strong>--private-key $PRIVATE_KEYT</strong></code></pre>
{% endtab %}
{% endtabs %}

That's all it takes! If you view the transaction on a block explorer, you should be able to see the `Dispatch` event.

You can see an example message sending transaction [here](https://kovan.etherscan.io/tx/0x7cabd0c3c780f62bbadff0b400086d46bfca0bf5c7cbd34a3e30c8880dddb5e3#eventlog).

### Confirm delivery

After the transaction that sent your message is [finalized](../latencies.md), you should be able to see a corresponding transaction delivering your message to the `TestRecipient` contract on the destination chain. You can watch for this transaction on the destination chain's block explorer by querying for the recipient's address.

If your message body was a human readable string, you can view it in the logs by selecting "Text" in the dropdown for the third parameter.\
\
You can see an example message delivery transaction [here](https://mumbai.polygonscan.com/address/0x0f860bfd24d08c484033d478fe4b7cda2c9167ff#events.).

![This transaction delivered an interchain message to the TestRecipient contract on Mumbai](<../../.gitbook/assets/Screen Shot 2022-08-10 at 4.04.40 PM.png>)

## `TestRecipient` addresses

Address of `TestRecipient` contracts that you can send test messages to. Left-padded to `bytes32`.

#### Mainnets

| Chain     | TestRecipient address                                                                                                                                    |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ethereum  | [0x0000000000000000000000003C5b70e0D5Bab4397cEA18272574c44aC8fC9A6E](https://etherscan.io/address/0x3C5b70e0D5Bab4397cEA18272574c44aC8fC9A6E)            |
| Polygon   | [0x000000000000000000000000c1C8760B7be3901A2FB6F8ecF2829552721d0FfF](https://polygonscan.com/address/0xc1C8760B7be3901A2FB6F8ecF2829552721d0FfF)         |
| Celo      | [0x000000000000000000000000D126Ed458a6eD624AeE125Ef2F5285E80CEe980D](https://celoscan.io/address/0xD126Ed458a6eD624AeE125Ef2F5285E80CEe980D)             |
| Avalanche | [0x0000000000000000000000004ca4541f2Fe9590d8D11b005bFFfe9F231CCb5d0](https://snowtrace.io/address/0x4ca4541f2Fe9590d8D11b005bFFfe9F231CCb5d0)            |
| BSC       | [0x000000000000000000000000fc5c1d5Ac3655668F2545668938a52D7810DB86d](https://bscscan.com/address/0xfc5c1d5Ac3655668F2545668938a52D7810DB86d)             |
| Arbitrum  | [0x0000000000000000000000002E00E2C74A70B8B7573231e7ED063FEf065855Ab](https://arbiscan.io/address/0x2E00E2C74A70B8B7573231e7ED063FEf065855Ab)             |
| Optimism  | [0x000000000000000000000000EaB3b53b08926182324bF7E12D30A5393C394cE3](https://optimistic.etherscan.io/address/0xEaB3b53b08926182324bF7E12D30A5393C394cE3) |

#### Testnets

| Chain            | TestRecipient address                                                                                                                                          |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mumbai           | [0x0000000000000000000000000f860bfd24d08C484033D478fe4b7Cda2C9167Ff](https://mumbai.polygonscan.com/address/0x0f860bfd24d08C484033D478fe4b7Cda2C9167Ff)        |
| Alfajores        | [0x000000000000000000000000b510708DC42eb9F74816E8f167B0dEa4C98ad92E](https://alfajores.celoscan.io/address/0xb510708DC42eb9F74816E8f167B0dEa4C98ad92E)         |
| Kovan            | [0x000000000000000000000000611241eC593B5692180A6ce5CbD79445826f30Be](https://kovan.etherscan.io/address/0x611241eC593B5692180A6ce5CbD79445826f30Be)            |
| Fuji             | [0x000000000000000000000000C7529Ec8F908512e875B5d118927a3B0665Bc843](https://testnet.snowtrace.io/address/0xC7529Ec8F908512e875B5d118927a3B0665Bc843)          |
| BSC Testnet      | [0x000000000000000000000000d97D98F6353e4D0de0d9e180059941325e23f1f7](https://mumbai.polygonscan.com/address/0x0f860bfd24d08C484033D478fe4b7Cda2C9167Ff)        |
| Arbitrum Rinkeby | [0x00000000000000000000000010D005721329B1278B23e9E84501D339D5037Cbc](https://testnet.arbiscan.io/address/0x10D005721329B1278B23e9E84501D339D5037Cbc)           |
| Optimism Kovan   | [0x000000000000000000000000C5C50B4890F4171E6Ae50cD50Ff636Baef3b2Ed1](https://kovan-optimistic.etherscan.io/address/0xC5C50B4890F4171E6Ae50cD50Ff636Baef3b2Ed1) |
