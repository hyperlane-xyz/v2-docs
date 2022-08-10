---
description: Paying for message delivery gas costs
---

# Gas

The lifecycle of an Abacus message involves two transactions, one on the origin chain to send the message, and one on the destination chain to deliver the message.

For convenience, Abacus provides an API on the origin chain that can be used to pay [relayers](../../protocol/agents/relayer.md) to deliver messages on the destination chain.

{% hint style="danger" %}
Users are **not currently required** to pay relaying fees but eventually this will be necessary for the economic sustainability of the protocol.
{% endhint %}

### Interface

The contract has a single payable function which accepts a message ID and emits an event with that UID and the amount of tokens that have been paid to the contract.

```solidity
interface IInterchainGasPaymaster {
  function payGasFor(
      address _outbox,
      uint256 _messageId,
      uint32 _destinationDomain
  ) external payable;
}
```

Developers can reference deployed [`InterchainGasPaymaster` addresses](../addresses/) and [destination domains](../domains.md) in the docs.

### Access Control

This interchain payment protocol is based on a social contract between the a [relayer](../../protocol/agents/relayer.md) and an application developer or user. To pay for their message, anyone can send native value on the origin chain to the operator and pass their message identifier as defined by the [Outbox](../../protocol/messaging/outbox.md). So long as enough tokens were provided on the origin chain given the current token exchange rates and gas prices, the relayer is expected to submit a transaction that processes the message.

{% hint style="warning" %}
Because a call is made to the `InterchainGasPaymaster` contract, special care should be made by an application to ensure the `InterchainGasPaymaster` contract is trustworthy and does not present a vector for reentrancy.
{% endhint %}

### Example Usage

Extending our [send message API](send.md) example, we get the message identifier from the return value of `Outbox.dispatch` and relay gas fees from Ethereum to Avalanche.

```solidity
address constant ethereumGasPaymaster = 0x17E216fBb22dF4ef8A6640ae9Cb147C92710ac84;
uint256 messageId = IOutbox(ethereumOutbox).dispatch(...);
IInterchainGasPaymaster(ethereumGasPaymaster).payGasFor{
    value: 1 // wei
}(
    ethereumOutbox,
    messageId,
    avalancheDomain
);
```
