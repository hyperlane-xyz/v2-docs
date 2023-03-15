---
description: Moving to IGPs with on-chain fee quoting
---

# Migrating to Enforced Interchain Gas Payments

{% hint style="info" %}
Keep up to date with [Discord](https://discord.gg/VK9ZUy3aTV) announcements to stay in the loop as the migration plan progresses.
{% endhint %}

Previously, interchain gas payments were not enforced by the relayer that's operated by the core team. The migration process toward enforcing accurate interchain gas payments has begun, and it involves some changes that apps should be aware of.

**TLDR:**

* Interchain gas payments are starting to be enforced using on-chain fee quoting
* The old IGP contracts have been deprecated, and there are new IGP contract addresses that apps must move to
* Read the entire [Paying For Interchain Gas](../developers/paying-for-interchain-gas/) section for details on how to correctly pay interchain gas
* A new SDK version `1.1.0` has been released with the relevant changes to gas payments. Be sure to use this version or newer.
* See "What's Next" to understand what the current phase of the rollout is.

### Overview of Changes

Previously, a single `InterchainGasPaymaster` contract address was provided. This contract didn't do much-- it would accept any payment and emit an event indicating that a gas payment was made, but it didn't require specific payment amounts.

The best current source of information for paying for gas can be found in the [Paying For Interchain Gas](../developers/paying-for-interchain-gas/) section.

#### On-chain fee quoting

The provided IGP contracts are moving to on-chain fee quoting (spec [here](https://github.com/hyperlane-xyz/hips/pull/3)). This involves `payForGas` calls specifying an amount of destination gas that will be used by their message, which is used to quote and enforce a required gas payment on the origin chain. If enough origin chain native tokens have not been paid to cover interchain gas costs, the `payForGas` call reverts. This provides apps and users confidence that their messages will be delivered as long as their transaction on the origin chain doesn't revert and sufficient payment as been made.

To begin with, the IGP contracts are only enforcing that _some_ payment has been made. In the future, the implementation of the IGP contracts will change such that token exchange rates and gas prices are considered to correctly quote interchain gas payments.

See [Paying the Correct Amount](paying-the-correct-amount.md) to understand how this looks in practice.

#### IGP contract address changes

The previous IGP contract address has been deprecated. Instead, two different IGP contracts are taking its place: the `DefaultIsmInterchainGasPaymaster` ([mainnet addresses](../../../resources/addresses.md#defaultisminterchaingaspaymaster)), and the `InterchainGasPaymaster` ([mainnet addresses](../../../resources/addresses.md#interchaingaspaymaster)).

See [Which IGP To Use & Understanding Gas Amounts](../developers/paying-for-interchain-gas/which-igp-to-use-and-understanding-gas-amounts.md) to understand which IGP contract your app should be using. Apps should move over to the appropriate IGP contract as soon as possible.

### What's Next

The full migration toward enforced and accurate on-chain gas payments is happening in a few phases. The first phase just happened.

1. &#x20;**Phase 1: New IGP contracts that charge interchain gas payments on the origin chain** (Completed)
   1. At this point, new IGP contracts are provided for applications to start using. These addresses are not expected to change in the future. The IGP contracts quote a non-zero interchain gas payment that's enforced, but the quoted payments don't yet use destination token exchange rates or gas prices to quote an accurate payment. Gas amounts are also not strictly enforced by the relayer.
2. **Phase 2: Only messages that have been paid for via the new IGPs are relayed** (Completed)
   1. At this point, the relayer operated by the core team will only process messages that have made a corresponding `payForGas` call to one of the new IGP contracts. This requires applications to have moved over to the new IGP contracts.
3. **Phase 3: Quoting fully accurate interchain gas payments.** (Completed)
   1. At this point, the IGP contracts will use on-chain token exchange rates and destination chain gas prices to provide accurate quotes for messages.
4. **Phase 4: Gas amounts become enforced by the relayer.** (Completed on testnet, up next on mainnet)
   1. At this point, the relayer operated by the core team will process messages that have specified the accurate amount of gas in the interchain gas payment.

### FAQ

**Are there any changes to the `IInterchainGasPaymaster` interface?**

No. The interface is exactly the same, just the IGP contract addresses have changed.

#### How do I know how much gas to use as the `_gasAmount` parameter when using the IGP?

See [Which IGP To Use & Understanding Gas Amounts](../developers/paying-for-interchain-gas/which-igp-to-use-and-understanding-gas-amounts.md) to understand how this may differ if you're using the default Interchain Security Module.

Generally, this would involve estimating an upper bound amount of gas that your messages use on the destination.

**When is Phase 4 going into effect?**

Gas amounts will be enforced on testnet on March 15, 2023. Enforcement on mainnet will be a fast follow. Expect an announcement on Discord.

**Is this relevant for V1 or V2?**

This is only relevant for V2.

**What can I expect from future changes to IGPs?**

Future changes won't involve new IGP contract addresses to switch over to. The new provided IGP contracts are upgradeable, so as long as you migrate now to the new IGP contracts, start [paying for interchain gas](paying-the-correct-amount.md) based off what the IGP contract quotes, and are specifying correct gas amounts for your messages, no future action is required.

**How do I pay for gas with middlewares, like Interchain Accounts, Interchain Queries, and the Liquidity Layer?**

APIs like the [Liquidity Layer API](../../../apis/token-bridge-api.md), the [Accounts API](../../../apis/accounts.md), and the [Queries API](../../../apis/query.md) are sometimes called "middlewares." Just like all Hyperlane messages that wish to be delivered by a relayer, messages sent via these middlewares must have interchain gas paid for. See our entry on [Middleware APIs](middleware-apis.md) for more details.&#x20;

**This may break some of my existing mainnet contracts that are live on v2.**

While this is mostly backward compatible due to the IGP interface being the exact same, we understand these changes may still pose issues. Please reach out to us either directly or on Discord!
