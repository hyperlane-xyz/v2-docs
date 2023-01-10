---
description: Paying for message delivery gas costs
---

# Gas

The lifecycle of an Hyperlane message involves two transactions, one on the origin chain to send the message, and one on the destination chain to deliver the message.

For convenience, Hyperlane provides an on-chain API on the origin chain that can be used to pay [relayers](../../protocol/agents/relayer.md) to deliver messages on the destination chain. This payment is called an interchain gas payment.

{% hint style="danger" %}
Note that interchain gas payments are **not currently required**, but work is being done to enforce gas payments. See [Migrating Toward Enforcing Gas Payments](gas.md#migrating-toward-enforcing-gas-payments) for more details. This is important for the economic sustainability of the protocol.

Stay tuned in the docs and Discord for updates.
{% endhint %}

### Interface

The contract has a single payable function which accepts a message ID, the destination domain of the message, an upper bound of gas that the recipient's handle function will use, and an address on the origin chain to refund any overpayment of interchain gas to. Note the `_gasAmount` and `_refundAddress` are not currently used or enforced, but this will change as gas payments are eventually enforced. See [Migrating Toward Enforcing Gas Payments](gas.md#migrating-toward-enforcing-gas-payments) for more details.

This function does not necessarily need to be called in the same transaction as the message dispatch.

```solidity
interface IInterchainGasPaymaster {
  function payForGas(
      uint256 _messageId,
      uint32 _destinationDomain,
      uint256 _gasAmount,
      address _refundAddress
  ) external payable;
}
```

Developers can reference deployed [`InterchainGasPaymaster` addresses](../addresses.md) and [destination domains](../domains.md) in the docs.

### Access Control

This interchain payment protocol is based on a social contract between the a [relayer](../../protocol/agents/relayer.md) and an application developer or user. To pay for their message, anyone can send native value on the origin chain to the operator and pass their message identifier as defined by the  [`Mailbox`](broken-reference). So long as enough tokens were provided on the origin chain given the current token exchange rates and gas prices, the relayer is expected to submit a transaction that processes the message.

{% hint style="warning" %}
Because a call is made to the `InterchainGasPaymaster` contract, special care should be made by an application to ensure the `InterchainGasPaymaster` contract is trustworthy and does not present a vector for reentrancy.
{% endhint %}

### Example Usage

Extending our [send message API](send.md) example, we get the message identifier from the return value of `Mailbox.dispatch`, and pay 1 wei in interchain gas to send our message from Ethereum to Avalanche.

```solidity
uint256 constant requestedGas = 25000;
address constant refundAddress = msg.sender;
address constant ethereumGasPaymaster = 0xdE86327fBFD04C4eA11dC0F270DA6083534c2582;
uint256 messageId = IMailbox(ethereumMailbox).dispatch(...);
IInterchainGasPaymaster(ethereumGasPaymaster).payForGas{
    value: 1 // wei
}(
    messageId,
    avalancheDomain,
    requestedGas,
    refundAddress
);
```

### Calculating Gas Payments

See [gas.md](../building-applications/nodejs-sdk/gas.md "mention") to learn how to use the Hyperlane SDK to calculate the correct payment for a message.

### Migrating Toward Enforcing Gas Payments

{% hint style="info" %}
Keep up to date with Discord announcements to stay in the loop as the migration plan progresses.
{% endhint %}

At the moment, Hyperlane isn’t enforcing interchain gas payments, meaning all messages are relayed and processed at their destination at the relayer’s expense.

On-chain fee quoting (see the [spec](https://github.com/hyperlane-xyz/hips/pull/3) for details) is in the process of being implemented. This will result in being able to pay an on-chain fee at the time in which a message is dispatched that guarantees the relayer will process the message. The relayer will honor these gas payments as long as the recipient's handler does not exceed the amount of gas that was paid for on the origin chain.

This will be rolled out in a few phases that have yet to begin. Each phase will be communicated on Discord.

1. Enforcing a non-zero payment - the InterchainGasPaymaster contract will require at least 1 wei in payment for interchain gas. See [gas.md](../building-applications/nodejs-sdk/gas.md "mention") for quoting the interchain gas payment.
2. Gas limit enforcement - the relayer will only process messages whose recipient's handle functions do not exceed the `_gasAmount` that has been paid for.
3. Quoting accurate payments - the InterchainGasPaymaster will consider token exchange rates and destination chain gas prices to provide accurate quotes for messages. See [gas.md](../building-applications/nodejs-sdk/gas.md "mention") for quoting payment amounts.
