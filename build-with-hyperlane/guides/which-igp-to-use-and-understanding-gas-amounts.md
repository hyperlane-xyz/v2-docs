---
description: Which IGP contract should you use?
---

# Choosing an interchain gas paymaster contract

There may be many interchain gas paymaster (IGP) contracts on a given chain, this guide helps you understand which one you should use to pay for message delivery.

## Choosing a relayer

Each relayer must deploy one or more IGP contracts through which it can accept payment to deliver messages to a remote chain.

Not all [relayer.md](../../protocol/agents/relayer.md "mention") will be able to deliver all messages. For example, some relayers may only deliver messages between a specific subset of chains, or some relayers may only deliver messages between specific sender and recipient contracts.

Be sure that you're using an IGP for a relayer that is capable of delivering all of the messages that your application might send.

In some cases, this may mean using different IGP contracts depending on the destination of the message.

## Choosing an IGP contract

Many relayers will deploy two types of IGP contracts. Read below to understand which one to use and how to use it.

#### When using the default ISM (for most applications)

If the message recipient uses the default [sovereign-consensus](../../protocol/sovereign-consensus/ "mention"), your application can make use of the `DefaultIsmInterchainGasPaymaster`.

{% hint style="info" %}
The default ISM is the security module used if no security model is specified explicitly by the recipient. Learn more about [receive-1.md](receive-1.md "mention").
{% endhint %}

When using the `DefaultIsmInterchainGasPaymaster`, the `_gasAmount` to use when calling the `payForGas` or `quoteGasPayment` functions only needs to be the amount of gas that your message's recipient `handle` function will use at the destination.

Behind the scenes, the `DefaultIsmInterchainGasPaymaster` is configured to automatically add to the provided `_gasAmount` all overhead gas amounts that your message will use at its destination-- this includes any gas used by the Mailbox or the default ISM (for example, verifying validator signatures). This allows messages to be fully paid for without requiring any knowledge of the internal gas usage of the destination's Mailbox contract or default ISM when a message is processed.

Find the deployed [#defaultisminterchaingaspaymaster](../../resources/addresses.md#defaultisminterchaingaspaymaster "mention") contract addresses for the Abacus Works relayer.

#### When using a custom ISM (advanced)

If the message recipient is [receive-1.md](receive-1.md "mention") other than the default ISM, you should instead use the `InterchainGasPaymaster`.

This IGP requires that the `_gasAmount` used when calling the `payForGas` or `quoteGasPayment` functions accounts for _all_ gas required by the relayer to process the message on the destination chain.

The gas amount required to process the message should include:

* Intrinsic transaction gas costs, including gas for calldata
* The amount of gas used by the `Mailbox.process` function
* The amount of gas used by the ISM to verify the message
* The amount of gas used by the message's recipient `handle` function

Find the deployed [#interchaingaspaymaster](../../resources/addresses.md#interchaingaspaymaster "mention") contract addresses for the Abacus Works relayer.

#### TL;DR

| Recipient specifies an ISM | IGP Contract                       | \_gasAmount                                              |
| -------------------------- | ---------------------------------- | -------------------------------------------------------- |
| No                         | `DefaultIsmInterchainGasPaymaster` | Only recipient `handle` function gas usage               |
| Yes                        | `InterchainGasPaymaster`           | All gas used by a transaction that processes the message |
