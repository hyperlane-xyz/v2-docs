# Which IGP to Use & Understanding Gas Amounts

Two different types of IGP contracts are provided. Read below to understand which one to use and how to use it.

#### When using the default ISM (for most applications)

If your application makes use of the default [Interchain Security Module](../receive-1.md#interchain-security-modules) (ISM) for security by either not specifying a [custom ISM](../receive-1.md#specifying-custom-isms) or specifying **** the [MultisigIsm](../../../../resources/addresses.md#multisigism), your application can make use of the **`DefaultIsmInterchainGasPaymaster`**.

{% hint style="info" %}
The default ISM is the default security module for Hyperlane messages, so if you don't know if you're using the default ISM for security, then you are automatically using the default ISM.
{% endhint %}

When using the `DefaultIsmInterchainGasPaymaster`, the `_gasAmount` to use when calling the `payForGas` or `quoteGasPayment` functions only needs to be the amount of gas that your message's recipient `handle` function will use at the destination.

Behind the scenes, the `DefaultIsmInterchainGasPaymaster` is configured to automatically add to the provided `_gasAmount` all overhead gas amounts that your message will use at its destination-- this includes any gas used by the Mailbox or the default ISM (for example, verifying validator signatures). This allows messages to be fully paid for without requiring any knowledge of the internal gas usage of the destination's Mailbox contract or default ISM when a message is processed.

Find the deployed `DefaultIsmInterchainGasPaymaster` [addresses here](../../../../resources/addresses.md#defaultisminterchaingaspaymaster).

See [Examples](examples.md) to see how this is used in practice.

#### When using a custom ISM (advanced)

If you are using a custom ISM, you must instead use the provided **InterchainGasPaymaster**. This IGP requires that the `_gasAmount` used when calling the `payForGas` or `quoteGasPayment` functions accounts for _all_ gas required by the relayer to process the message on the destination chain.

The gas amount required to process the message should include:

* Intrinsic transaction gas costs, including gas for calldata
* The amount of gas used by the `Mailbox.process` function
* The amount of gas used by the ISM
* The amount of gas used by the message's recipient `handle` function

Find the deployed `InterchainGasPaymaster` [addresses here.](../../../../resources/addresses.md#interchaingaspaymaster)

#### TLDR

| Application ISM       | IGP Contract                       | \_gasAmount                                              |
| --------------------- | ---------------------------------- | -------------------------------------------------------- |
| Default / MultisigIsm | `DefaultIsmInterchainGasPaymaster` | Only recipient `handle` function gas usage               |
| A custom ISM          | `InterchainGasPaymaster`           | All gas used by a transaction that processes the message |
