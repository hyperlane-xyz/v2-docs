---
description: Paying for message costs incurred on the destination chain.
---

# Interchain Gas Quotes

Applications can use the `InterchainGasCalculator` in version `1.1.0` or later of the Hyperlane SDK to estimate how many origin chain native tokens to pay as [interchain gas payment](broken-reference) when dispatching a message. See the example below illustrating how to estimate and pay interchain gas pa yments.

### Getting an Interchain Gas Payment Quote Using the SDK

An interchain gas payment quote will call the [`quoteGasPayment`](broken-reference) function on an Interchain Gas Paymaster contract. &#x20;

In this example, we'll get an interchain gas payment quote for a message from Avalanche to Polygon.

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

There are three functions that can be used to quote interchain gas payment. The function to use depends on which IGP contract your application is using. See [Which IGP To Use & Understanding Gas Amounts](broken-reference) to understand which IGP contract you should be using and to get more information on gas amounts:

| IGP contract                                                                                    | Function                          | Gas amount                                                             |
| ----------------------------------------------------------------------------------------------- | --------------------------------- | ---------------------------------------------------------------------- |
| The provided [DefaultIsmInterchainGasCalculator](broken-reference) for use with the default ISM | `quoteGasPaymentForDefaultIsmIgp` | The gas amount used by the message's recipient `handle` function       |
| The provided [InterchainGasPaymaster](broken-reference) for use with a custom ISM               | `quoteGasPayment`                 | All gas required to process the message, including Mailbox and ISM gas |

Now, we can use the `quoteGasPaymentForDefaultIsmIgp` function to find how much AVAX should be paid for our message from Avalanche to Polygon that we expect to consume 200,000 gas in the recipient contract's `handle` function.

```typescript
// Calculate the AVAX payment to send from Avalanche to Polygon,
// with the recipient's `handle` function consuming 200,000 gas.
const avaxPayment = await calculator.quoteGasPaymentForDefaultIsmIgp(
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
