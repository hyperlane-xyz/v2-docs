---
description: Refunding overpayments
---

# Refunds

### Refunds

The provided IGP contracts will refund any overpayment to the `_refundAddress`. Overpayment is anything that exceeds the amount returned by the `quoteGasPayment` contract.

For example, if you are paying for 1M gas and pass 0.1 ETH to the IGP contract, but `quoteGasPayment` quotes a payment of 0.08 ETH, the `_refundAddress` will be refunded `0.02` ETH.

Note that you will only be refunded any payment that exceeds what is quoted on the origin chain, and that you will not be refunded if the processing of a message at its destination turns out to cost less than initially paid for. This is because on the origin chain, at the time of gas payment, it's impossible to know the gas costs on the destination will really be, and a second refund transaction would be required.

For example, if you pay for 1M gas but delivering the message only uses 500k gas, this is only known after the message has been delivered. Refunding this overpayment would require a separate refund transaction, which at the moment does not occur.

#### Reentrancy Risk

Note that refunding overpayment involves the IGP contract calling the `_refundAddress`, which can present a risk of [reentrancy](https://www.certik.com/resources/blog/3K7ZUAKpOr1GW75J2i0VHh-what-is-a-reentracy-attack) for your application. Special care should be made by callers to ensure they are not vulnerable to reentrancy exploits.

#### Unsuccessful Refunds

If a refund is unsuccessful, the `payForGas` call will revert.
