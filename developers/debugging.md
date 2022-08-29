---
description: Why didn't my interchain message get delivered?
---

# Debugging

When you [send](messaging-api/send.md) an interchain message, there are a few message relay failure modes that you should be aware of.

### Invalid Destination

If the destination domain identifier (`uint32`) is not known to relay clients they will have no way to deliver your message. Refer to the [domain identifiers](domains.md) docs for Abacus Works supported domains and the canonical identifiers to use when sending messages to these destinations.

### Invalid Recipient

If the recipient address (`bytes32`) is not a contract address that implements the [receive interface](messaging-api/receive.md) (`IMessageRecipient`) on the destination domain, relay clients will have no way to deliver your message. EVM addresses (`address`) must be left-padded with zeroes to be compliant. Refer to the [send encoding](messaging-api/send.md#encoding) section for details and a `pure addressToBytes32` utility function.&#x20;

### Unprocessable

An unprocessable message implies the account [receiving the message](messaging-api/receive.md) (via `IMessageRecipient.handle`) is always reverting (according to the [`eth_estimateGas`](https://ethereum.github.io/execution-apis/api-documentation/)RPC). The relayer client will continue to evaluate messages for potential state changes which affect revert conditions, but the relayer will never submit a transaction which it expects will revert.

{% hint style="info" %}
This conservative behavior is intended to prevent users from losing funds on the source chain unnecessarily. It is subject to change and if you have a use case which is not accommodated by this behavior, **please reach out** to the [Abacus Works team on Discord](https://discord.com/invite/KBD3aD78Bb).&#x20;
{% endhint %}

### Underfunded

{% hint style="danger" %}
Users are **not currently required** to pay relaying fees but eventually this will be necessary for the economic sustainability of the protocol.
{% endhint %}

An underfunded message implies the [gas paid](messaging-api/gas.md) for message relay is insufficient. The relayer registered on the gas paymaster can [`claim`](https://github.com/abacus-network/abacus-monorepo/blob/main/solidity/core/contracts/InterchainGasPaymaster.sol#L62) these fees to compensate for gas costs incurred on the destination chain. The relayer client uses the [`eth_estimateGas`](https://ethereum.github.io/execution-apis/api-documentation/)RPC on the destination chain to determine the absolute cost of relaying a message, uses the [CoinGecko API](https://www.coingecko.com/en/api) to calculate the exchange rate between the two chains native assets, and will only pay for message processing if the message relay was funded appropriately on the source chain's paymaster (within some acceptable price deviation).

### Repl.it Debugger

You can use [this repl.it snippet](https://abacus-message-debugger.namchu2.repl.co/) to debug message delivery. It will check for possible issues as listed above.
