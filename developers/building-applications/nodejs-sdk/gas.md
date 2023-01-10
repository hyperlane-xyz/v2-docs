---
description: Paying for message costs incurred on the destination chain.
---

# Interchain Gas Estimation

{% hint style="info" %}
Note the details of gas estimation may change in future SDK versions as the [migration toward enforcing gas payments](../../messaging-api/gas.md#migrating-toward-enforcing-gas-payments) is put into effect.
{% endhint %}

Applications can use the `InterchainGasCalculator` in the Hyperlane SDK to estimate how many [origin chain native tokens to pay](../../messaging-api/gas.md) when dispatching a message. See the example below illustrating how to estimate and pay interchain gas payments.

### Estimating interchain gas payment using the SDK

An interchain gas estimate considers the cost of processing the transaction on the destination chain, including a buffer to account for changes in native token prices of the origin and destination chains, or changes in the gas price on the destination chain.

In this example, we will estimate interchain gas payment for a message from Avalanche to Polygon.

First, let's create the `InterchainGasCalculator`. See [multiprovider.md](multiprovider.md "mention") for creating a `MultiProvider` with your own RPC providers.

```typescript
import {
  chainConnectionConfigs,
  InterchainGasCalculator,
  MultiProvider
} from "@hyperlane-xyz/sdk";
import { ethers } from "ethers";

// Set up a MultiProvider with the default providers.
const multiProvider = new MultiProvider({
  avalanche: chainConnectionConfigs.avalanche,
  polygon: chainConnectionConfigs.polygon,
});

// Create the calculator.
const calculator = InterchainGasCalculator.fromEnvironment(
  'mainnet',
  multiProvider,
);

```

Now, we can use the `estimatePaymentForHandleGas` function to find how much AVAX should be paid for our message from Avalanche to Polygon that we expect to consume 200,000 gas in the recipient contract's `handle` function. &#x20;

```typescript
// Calculate the AVAX payment to send from Avalanche to Polygon,
// with the recipient's `handle` function consuming 200,000 gas.
const avaxPayment = await calculator.estimatePaymentForHandleGas(
  'avalanche',
  'polygon',
  ethers.BigNumber.from(200_000),
);

console.log('Avalanche -> Polygon payment for 200k handle gas on destination:');
console.log(`${ethers.utils.formatEther(avaxPayment)} AVAX`);

// At the time of writing, this outputs:

// Avalanche -> Polygon payment for 200k handle gas on destination:
// 0.00071510955746088 AVAX
```
