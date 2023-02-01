---
description: Make a view call across chains using IQS.
---

# Queries

This tutorial demonstrates how to make a simple interchain view call via the Queries API from pre-deployed `TestQuerySender` contracts to any arbitrary target on which Hyperlane is deployed.

### Inputs

* `$DESTINATION_DOMAIN`: The domain ID of the destination chain. Domain IDs can be found [here](../../resources/domains.md), or you could use `43113` to send to Fuji.
* `$TARGET`: The address of the contract on the destination chain you want to query. You could just query for the `owner()` of the `InterchainAccountRouter` contract which is found at `0xc61Bbf8eAb0b748Ecb532A7ffC49Ab7ca6D3a39D` on every testnet chain
* `$TARGET_DATA`: The ABI encoded call, if you want to make an `owner()` call that would be `0x8da5cb5b`
* `$GAS_AMOUNT`: The amount of gas on the destination chain to pay for. This should be an upper estimate of the amount of gas you expect your specific query to use on the destination chain, plus the [overhead gas amount](../../apis/query.md#paying-for-interchain-gas) expected to be used by the Queries API contract on the destination chain. For the simple `owner()` example, we can set this to a generous `200000` gas.

### How TestQuerySender works

* `TestQuerySender` is very simple. It basically just calls the `InterchainQueryRouter` and designates a callback function for the result of the query itself. It also [pays for interchain gas](../../apis/query.md#paying-for-interchain-gas).

```solidity
function queryAddress(
    uint32 _destinationDomain,
    address _target,
    bytes calldata _targetData,
    uint256 _gasAmount
) public {
    bytes32 _messageId = queryRouter.query(
        _destinationDomain,
        Call({to: _target, data: _targetData}),
        abi.encodePacked(this.handleQueryAddressResult.selector)
    );
    _payForGas(_messageId, _destinationDomain, _gasAmount);
}

function handleQueryAddressResult(address _result) public {
    emit ReceivedAddressResult(_result);
    lastAddressResult = _result;
}
```

### Make a query

{% tabs %}
{% tab title="Using Metamask" %}
#### Getting the Interchain Gas Payment Quote

1. The TestQuerySender contract uses the DefaultIsmInterchainGasPaymaster to pay for interchain gas. Navigate to this contract page on [Etherscan](https://goerli.etherscan.io/address/0xF90cB82a76492614D07B82a7658917f3aC811Ac1) (or whatever chain you want to send from, see contract addresses [here](../../resources/addresses.md#defaultisminterchaingaspaymaster))
2. Under the `Contract` tab, select `Read Contract`.
3. Expand the `quoteGasPayment` function.
4. For destination domain, enter `$DESTINATION_DOMAIN`.
5. For gas amount, enter `$GAS_AMOUNT`, which is `200000`.
6. Click `Query` and make note of the amount returned as `$GAS_PAYMENT_QUOTE`. For example, at the time of writing, the quote is `1` wei.

<figure><img src="../../.gitbook/assets/Screen Shot 2023-01-31 at 1.55.10 PM (1).png" alt=""><figcaption></figcaption></figure>

#### Making the Query

1. Navigate to the `TestQuerySender` `0x96D7D6Eba6C635e3EaC12b593Ef8B2eE1F6E6683` contract page on [Etherscan](https://goerli.etherscan.io/address/0xF49ed566145eA1773c4Fb788b143Bd99f17b2024) (or whatever chain you want to send from - on testnets the TestQuerySender is always found at `0x96D7D6Eba6C635e3EaC12b593Ef8B2eE1F6E6683`, and on mainnets it's `0x8566F965f613cB47A5Bd59879d07186122590895`)
2. Under the `Contract` tab, find the `Write Contract` button.
3. Click on the `Connect to Web3` button to connect your Wallet (i.e. Metamask). Make sure that you are on the correct network.
4. Expand the `queryAddress` box.
5. For the payable amount, Etherscan expects an amount quoted in ether, while our `$GAS_PAYMENT_QUOTE` is in wei. To convert from wei to ether, input the amount `$GAS_PAYMENT_QUOTE`, which is in wei, into [https://eth-converter.com/](https://eth-converter.com/) and copy the ether amount. Use this ether amount as the payable amount.
6. For destination domain, enter `$DESTINATION_DOMAIN`.
7. For the target, enter `$TARGET`, i.e. the address of the contract you like to query on the destination.
8. For target data, enter `$TARGET_DATA`, i.e. the ABI encoded call of the query itself.
9. For gas amount, enter `$GAS_AMOUNT`.
10. Submit the transaction via your wallet/Metamask

<figure><img src="../../.gitbook/assets/Screen Shot 2023-01-31 at 2.14.07 PM.png" alt=""><figcaption></figcaption></figure>
{% endtab %}

{% tab title="Using cast" %}
We can get an interchain gas payment quote and call TestQuerySender directly using `cast`.&#x20;

#### Getting the Interchain Gas Payment Quote

The `$IGP_ADDRESS` is the address of the [DefaultIsmInterchainGasPaymaster](../../resources/addresses.md#defaultisminterchaingaspaymaster-1), which is used by the TestQuerySender.

First, we use the `$IGP_ADDRESS` to get a quote for how much your gas payment will cost, and we save this in an environment variable called `$GAS_PAYMENT_QUOTE`:

{% code overflow="wrap" %}
```shell
cast call $IGP_ADDRESS "quoteGasPayment(uint32,uint256)" $DESTINATION_DOMAIN $GAS_AMOUNT --rpc-url $RPC_URL
```
{% endcode %}

#### Making the Query

You can call the `TestQuerySender` directly using `cast`. Make sure that you have a valid RPC URL for the origin chain and a private key with which you can pay for gas. The `TestQuerySender` address is `0x96D7D6Eba6C635e3EaC12b593Ef8B2eE1F6E6683` on testnets and `0x8566F965f613cB47A5Bd59879d07186122590895` on mainnets.

{% code overflow="wrap" %}
```shell
cast send 0x96D7D6Eba6C635e3EaC12b593Ef8B2eE1F6E6683 'queryAddress(uint32,address,bytes,uint256)' $DESTINATION_DOMAIN 0xc61Bbf8eAb0b748Ecb532A7ffC49Ab7ca6D3a39D $(cast calldata "owner()") $GAS_AMOUNT --rpc-url $RPC_URL --private-key $PRIVATE_KEY --value $GAS_PAYMENT_QUOTE
```
{% endcode %}
{% endtab %}
{% endtabs %}

If you view the transaction on a block explorer, you should be able to see the `Dispatch` event. You can see an example message sending transaction [here](https://goerli.etherscan.io/tx/0x193b6e25d49a7c3ca0ad70467d9bd0911cc65dc8735470d41a544be934b58b36#eventlog).

### Confirm query

You can use the [Message Explorer](https://explorer.hyperlane.xyz/) to show the delivery of the message for the query to the destination. When it gets delivered ([example](https://explorer.hyperlane.xyz/message/c9678d49de18267ef2afae7b0c42035cb85df28bb8681cb296d772cb81207a40)), the delivery transaction will actually be also the origin tx hash for the delivery of the result back to the origin. Once again, you can use the Message Explorer to check on the delivery of that message ([example](https://explorer.hyperlane.xyz/message/bf38835a7b58fe28c8ec4b35e6a97fee6b44ca85cb843c0793373ccc7a9d3bfa)). When all is done, you can see how the query result was persisted on the [`TestQuerySender` contract ](https://goerli.etherscan.io/address/0x96D7D6Eba6C635e3EaC12b593Ef8B2eE1F6E6683#readContract)by going to the `Contract => Read Contract` page and expanding the `lastAddressResult` section.

<figure><img src="../../.gitbook/assets/Screen Shot 2023-01-31 at 2.28.57 PM.png" alt=""><figcaption></figcaption></figure>
