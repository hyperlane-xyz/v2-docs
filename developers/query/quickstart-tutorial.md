---
description: Make a view call across chains using IQS.
---

# Quickstart Tutorial

This tutorial demonstrates how to make a simple cross-chain view call via the Queries API from pre-deployed `TestQuerySender` contracts to any arbitrary target on which Hyperlane is deployed.

### Inputs

* `$DESTINATION_DOMAIN`: The domain ID of the destination chain. Domain IDs can be found [here](../domains.md).
* `$TARGET`: The address of the contract on the destination chain you want to query. You could just query for the `owner()` of the `InterchainAccountRouter` which is `0xffD17672d47E7bB6192d5dBc12A096e00D1a206F` on every chain
* `$TARGET_DATA`: The ABI encoded call, if you want to make an `owner()` call that would be `0x8da5cb5b`

### How TestQuerySender works

`TestQuerySender` is very simple. It basically just calls the `InterchainQueryRouter` and designates a callback function for the result of the query itself.

```solidity
function queryAddress(
    uint32 _destinationDomain,
    address _target,
    bytes calldata _targetData
) public {
    queryRouter.query(
        _destinationDomain,
        Call({to: _target, data: _targetData}),
        abi.encodePacked(this.handleQueryAddressResult.selector)
    );
}

function handleQueryAddressResult(address _result) public {
    emit ReceivedAddressResult(_result);
    lastAddressResult = _result;
}
```

### Make a query

{% tabs %}
{% tab title="Using Metamask" %}
1. Navigate to the `TestQuerySender 0xF49ed566145eA1773c4Fb788b143Bd99f17b2024` contract page on [Etherscan](https://goerli.etherscan.io/address/0xF49ed566145eA1773c4Fb788b143Bd99f17b2024) (or whatever chain you want to send from)
2. Under the `Contract` tab, find the `Write Contract` button.
3. Click on the `Connect to Web3` button to connect your Wallet (i.e. Metamask). Make sure that you are on the correct network.
4. Expand the `queryAddress` box.
5. For destination domain, enter `$DESTINATION_DOMAIN`. You can find some [here](../domains.md), or you could use `43113` to send to Fuji.
6. For the target, enter `$TARGET`, i.e. the address of the contract you like to query on the destination (if you just want to see how this works, try `0xffD17672d47E7bB6192d5dBc12A096e00D1a206F`)
7. For target data, enter `$TARGET_DATA`, i.e. the ABI encoded call of the query itself (`owner()` is `0x8da5cb5b`).
8. Submit the transaction via your wallet/Metamask

<figure><img src="../../.gitbook/assets/Screen Shot 2022-11-02 at 5.37.06 PM.png" alt=""><figcaption></figcaption></figure>
{% endtab %}

{% tab title="Using cast" %}
You can call the `InterchainAccountRouter` directly using `cast`. Make sure that you have a valid RPC URL for the origin chain and a private key with which you can pay for gas.

{% code overflow="wrap" %}
```shell
cast send 0x28DB114018576cF6c9A523C17903455A161d18C4 'dispatch(uint32, (address,bytes)[])' $DESTINATION_DOMAIN "[($RECIPIENT,$(cast calldata "fooBar(uint256,string)" 1 "HelloWorld from an ICA via cast"))]" --rpc-url $RPC_URL --private-key $PRIVATE_KEY
```
{% endcode %}
{% endtab %}
{% endtabs %}

If you view the transaction on a block explorer, you should be able to see the `Dispatch` event. You can see an example message sending transaction [here](https://goerli.etherscan.io/tx/0xbb076b17dca5e436f574a4728dd59d25da4fd9d05c48c6ec304ea5a354849edf).

### Confirm query

You can use the [Message Explorer](https://explorer.hyperlane.xyz/) to show the delivery of the message for the query to the destination. [When it gets delivered](https://explorer.hyperlane.xyz/message/76395), the delivery transaction will actually be also the origin tx hash for the delivery of the result back to the origin. Once again, you can use the Message Explorer to check on the [delivery of that message.](https://explorer.hyperlane.xyz/message/76397) When all is done, you can see how the query result was persisted on the [`TestQuerySender` contract](https://goerli.etherscan.io/address/0xf49ed566145ea1773c4fb788b143bd99f17b2024#readContract) by going to the `Contract => Read Contract` page and expanding the `lastAddressResult` section.

<figure><img src="../../.gitbook/assets/Screen Shot 2022-11-02 at 5.45.23 PM.png" alt=""><figcaption></figcaption></figure>
