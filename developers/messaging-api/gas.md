---
description: Paying for message delivery gas costs
---

# Gas

The lifecycle of an Hyperlane message involves two transactions, one on the origin chain to send the message, and one on the destination chain to deliver the message.

For convenience, Hyperlane provides an API on the origin chain that can be used to pay [relayers](../../protocol/agents/relayer.md) to deliver messages on the destination chain. This payment is called an interchain gas payment.

{% hint style="danger" %}
Note that interchain gas payments are **not currently required**, but the first of four phases is currently in place to migrating toward requiring accurate payments for messages. This is important for the economic sustainability of the protocol.

See [[#migrating-toward-enforced-gas-payments](gas.md#migrating-toward-enforced-gas-payments "mention")](gas.md#migrating-toward-enforcing-gas-payments) to learn about the migration plan.&#x20;
{% endhint %}

### Interface

The contract has a single payable function which accepts a message ID and emits an event with that UID and the amount of tokens that have been paid to the contract. This function does not necessarily need to be called in the same transaction as the message dispatch, allowing for the ability to top up payments for a message that's already been dispatched.

```solidity
interface IInterchainGasPaymaster {
  function payGasFor(
      address _outbox,
      uint256 _messageId,
      uint32 _destinationDomain
  ) external payable;
}
```

Developers can reference deployed [`InterchainGasPaymaster` addresses](../../developers-faq-and-troubleshooting/addresses/) and [destination domains](../../developers-faq-and-troubleshooting/domains.md) in the docs.

### Access Control

This interchain payment protocol is based on a social contract between the a [relayer](../../protocol/agents/relayer.md) and an application developer or user. To pay for their message, anyone can send native value on the origin chain to the operator and pass their message identifier as defined by the [`Outbox`](../../protocol/messaging/outbox.md). So long as enough tokens were provided on the origin chain given the current token exchange rates and gas prices, the relayer is expected to submit a transaction that processes the message.

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

### Calculating Gas Payments

See [gas.md](../building-applications/nodejs-sdk/gas.md "mention") to learn how to use the Hyperlane SDK to calculate the correct payment for a message.

### Migrating Toward Enforcing Gas Payments

{% hint style="info" %}
Keep up to date with Discord announcements to stay in the loop as the migration plan progresses.
{% endhint %}

At the moment, Hyperlane isn’t enforcing interchain gas payments, meaning all messages are relayed and processed at their destination at the relayer’s expense.

Recently, gas payment enforcement logic has been implemented in relayers to only process messages that have made a sufficient interchain gas payment. To ensure a smooth transition for mainnet Hyperlane users and applications, a phased approach is being put into action to move toward full enforcement of interchain gas payments. This requires minimal effort from Hyperlane users, offers flexibility, and works directly with existing Hyperlane applications to ensure they can move toward paying gas at their own pace.

#### Phase 1 - Laying the groundwork _(Current Phase)_&#x20;

* Messages between existing deployed mainnet applications will be moved to dedicated application-specific relayer infrastructure. The intent of using separate relayer infrastructure is to provide existing applications with their own flexible timeline while transitioning to paying for interchain gas.
  * No smart contract changes or actions on the application’s side are required; this is an implementation infrastructural detail taken on by the Hyperlane core team to accommodate more flexible transitions for each application. The same InterchainGasPaymaster addresses are used.
  * The Hyperlane core team will reach out to applications for the contract addresses and chains, will spin up relayers that are responsible for relaying messages exclusively between these contracts and chains, and will not incur any liveness impact.
  * Gas payments for messages will still not be enforced by the application-specific relayers, however applications should begin to make interchain gas payments in preparation for the next phase. See [gas.md](../building-applications/nodejs-sdk/gas.md "mention") to learn how to estimate interchain gas payments.
* The Hyperlane core team will reach out to live applications that require application-specific relayers. **If the Hyperlane core team has not reached out to you and you believe they should have, please reach out on Discord.**
* To ensure all users are still able to use Hyperlane, a “public” relayer responsible for relaying all other messages will continue to be operated and will not enforce message payment.
* **TLDR**:
  * If you have an application using Hyperlane on mainnet and the Hyperlane core team is aware of this, expect the Hyperlane core team to reach out to you.
  * If you're currently building on Hyperlane, follow the documentation above and see [gas.md](../building-applications/nodejs-sdk/gas.md "mention") to start paying for interchain gas from the get-go. Stay up to date with announcements on Discord to learn about any changes to the public relayer's gas enforcement policy.

#### Phase 2 - Enforcing non-zero payments

* Applications that have been moved to their dedicated relayer infrastructure will work with the Hyperlane core team to ensure they have started making interchain gas payments. Once the application is consistently making interchain gas payments as estimated by the SDK, the application-specific relayers will begin to require that a _non-zero_ interchain gas payment has been made for a message to be processed. In other words, application-specific relayers will process all messages whose interchain gas payment is at least 1 wei.
  * While only non-zero payments will be enforced at this point, applications should be accurately estimating required interchain payment amounts using the SDK. See  [gas.md](../building-applications/nodejs-sdk/gas.md "mention") to learn how to estimate interchain gas payments.
  * The intent **** of this phase is to provide a gentle transition to enforcing gas payments before moving onto the next phase.
* The “public” relayer responsible for relaying all other messages will continue to be operated and will also begin enforcing a 1 wei payment.
* **TLDR**:
  * If you have an application-specific relayer, the Hyperlane core team will work with you to start enforcing at least 1 wei in interchain gas payment for messages.
  * If you're currently building on Hyperlane, follow the documentation above and see [gas.md](../building-applications/nodejs-sdk/gas.md "mention") to start paying for interchain gas from the get-go. Stay up to date with announcements on Discord to learn about any changes to the public relayer's gas enforcement policy.

#### Phase 3 - Enforcing accurate payments&#x20;

* Once an application is consistently making accurate interchain gas payments, its application-specific relayer will transition away from the 1-wei minimum, and instead toward full enforcement of accurate interchain gas payments. Messages must use the SDK to estimate sufficient interchain gas payments. The relayer will require these payments to sufficiently cover the costs of processing the message, which is based off current origin and destination native token exchange rates and gas prices.
  * See  [gas.md](../building-applications/nodejs-sdk/gas.md "mention") to learn how to estimate interchain gas payments.
* The public relayer responsible for relaying all other messages will continue to be operated and will eventually also transition to enforcing accurate gas payments.
* **TLDR**:
  * If you have an application-specific relayer, the Hyperlane core team will work with you to start fully enforcing interchain gas payments for messages based off current exchange rates and gas prices.
  * If you're currently building on Hyperlane, follow the documentation above and see [gas.md](../building-applications/nodejs-sdk/gas.md "mention") to start paying for interchain gas from the get-go. Stay up to date with announcements on Discord to learn about any changes to the public relayer's gas enforcement policy.

#### Phase 4 - Moving back to a single common relayer

* Once the public relayer is accurately enforcing gas payments and applications are consistently paying for gas, the Hyperlane core team will transition applications back to the unified relayer. This requires no action on the application’s side and is an implementation detail for how the transition will occur. At this point, all messages sent using Hyperlane will require sufficient interchain gas payment for each message in order to be processed by the relayer.
* **TLDR**:
  * The migration is complete! Expect Discord announcements and documentation changes to reflect the enforcement of interchain gas payments.
