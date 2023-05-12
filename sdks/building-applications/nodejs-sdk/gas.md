---
description: Pay for message delivery on the origin chain
---

# Quoting gas payments

Applications can use the `HyperlaneIgp` in the Hyperlane SDK to quote [Broken link](broken-reference "mention") when dispatching a message. See the example below illustrating how to estimate and pay interchain gas payments.

### Getting a quote Using the SDK

An interchain gas payment quote will call the `quoteGasPayment` function on an Interchain Gas Paymaster contract.

In this example, we'll get an interchain gas payment quote for a message from Avalanche to Polygon.

First, let's create the `HyperlaneIgp` instance. See [multiprovider.md](multiprovider.md "mention") for creating a `MultiProvider` with your own RPC providers.

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

// Create the HyperlaneIgp instance.
const igp = HyperlaneIgp.fromEnvironment(
  'mainnet',
  multiProvider,
);
```

There are two functions that can be used to quote interchain gas payment. See [which-igp-to-use-and-understanding-gas-amounts.md](../../../build-with-hyperlane/guides/which-igp-to-use-and-understanding-gas-amounts.md "mention") to understand which IGP contract you should be using and to get more information on gas amounts.

| Function                          | IGP contract                                                                | Gas amount                                                                           |
| --------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `quoteGasPaymentForDefaultIsmIgp` | The provided `DefaultIsmInterchainGasPayaster` for use with the default ISM | The gas amount used by the message's recipient `handle` function                     |
| `quoteGasPayment`                 | The provided `InterchainGasPaymaster`                                       | All gas required to process the message, which includes the cost of ISM verification |

Now, we can use the `HyperlaneIgp` to find how much AVAX should be paid for our message from Avalanche to Polygon that we expect to consume 200,000 gas in the recipient contract's `handle` function.

```typescript
// Calculate the AVAX payment to send from Avalanche to Polygon,
// with the recipient's `handle` function consuming 200,000 gas.
const avaxPayment = await igp.quoteGasPaymentForDefaultIsmIgp(
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
