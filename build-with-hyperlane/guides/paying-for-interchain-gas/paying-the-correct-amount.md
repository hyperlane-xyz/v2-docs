---
description: Get a quote for your interchain gas payment
---

# Paying the correct amount

## Quoting gas payments

The `IInterchainGasPaymaster` interface provides a view function that quotes the required gas payment in origin chain native tokens:

```solidity
interface IInterchainGasPaymaster {
  function quoteGasPayment(
      uint32 _destinationDomain,
      uint256 _gasAmount
  ) external view returns (uint256);
}
```

This function can be called directly on or off chain.

The provided InterchainGasPaymaster contracts will refund any overpayment to the `_refundAddress` passed to the `payForGas` function. See [refunds.md](refunds.md "mention") for more information.

{% hint style="warning" %}
Because a refund may be made to the `_refundAddress`, special care should be made by an application to ensure this does not present a vector for reentrancy. See [#reentrancy-risk](refunds.md#reentrancy-risk "mention") for more details.
{% endhint %}

