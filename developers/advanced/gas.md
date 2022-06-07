---
description: Paying for message costs incurred on the destination chain.
---

# Gas

Abacus allows users to pay for message processing on the destination chain using tokens from the origin chain.

## Overview

In order to simplify the UX for interchain applications, Abacus allows users to pay for transactions on the destination chain using tokens from the origin chain.

This interchain payment protocol is based on a social contract between the a [relayer](../../protocol/agents/relayers.md) and an application developer or user. To pay for their message, anyone can send  tokens on the origin chain to the operator, specifying the index of the message in the [`Outbox's`](../../protocol/messaging-api/outbox.md) merkle tree that they want to be processed. So long as enough tokens were provided on the origin chain given the current token exchange rates and gas prices, the relayer is expected to submit a transaction that processes the message.

### InterchainGasPaymaster.sol

The [`InterchainGasPaymaster`](https://github.com/abacus-network/abacus-monorepo/blob/main/solidity/core/contracts/InterchainGasPaymaster.sol) smart contract is used to help facilitate this social contract. Each  relayer/processor operator can optionally deploy an `InterchainGasPaymaster` instance.

The contract has a single payable function, which takes a message leaf index (which acts as a message UID), and simply emits an event with that UID and the amount of tokens that have been paid to the contract.

```solidity
/**
 * @notice Deposits the msg.value as a payment for the proving & processing
 * of a message on its destination chain.
 * @param _leafIndex The index of the message in the Outbox merkle tree.
 */
function payGasFor(uint256 _leafIndex) external payable;
```

Developers can specify the address of the `InterchainGasPaymaster` that they're using via their [`AbacusConnectionManager`](connection-client.md#abacusconnectionmanager). For convenience, Abacus Works will operate a relayer, and deploy corresponding `AbacusConnectionManager` and `InterchainGasPaymasters` that application developers can point to if they choose.

{% hint style="info" %}
It's recommended to always pay for gas for each dispatched message, otherwise the message may not be relayed destination chain.
{% endhint %}

Applications can use the `InterchainGasCalculator` in the Abacus SDK to estimate how many origin chain native tokens to pay when dispatching a message. See the [example](gas.md#example) below illustrating how to estimate and pay interchain gas payments.

## Example

### Smart Contract

Adapting the simple example from the [Getting started](broken-reference) section, let's have our `HelloWorld` application dispatch a message, pay interchain gas for that message, and create a checkpoint. Note the `HelloWorld` contract now inherits from [Router.sol](router-pattern.md).

We will use the internal function `_dispatchWithGasAndCheckpoint`, which is implemented in [`Router.sol`](router-pattern.md). It will first dispatch a message to a remote router, then pay a specified amount of origin chain native tokens to the `InterchainGasPaymaster` contract that's been set in the `AbacusConnectionManager`, and then create a checkpoint on the `Outbox`. No special handling logic, apart from simply implementing the `handle()` function, is required.

```solidity
import {Router} from "@abacus-network/app/contracts/Router.sol";

contract HelloWorld is Router {
  /**
   * @notice The event we emit when we receive an interchain message.
   */
  event HelloWorld(uint32 indexed origin, address indexed sender, bytes message);

  /**
   * @notice Sends a "hello world" message to an address on a remote chain.
   * @notice Uses any msg.value paid to the function as interchain gas payment.
   * @param _destination The ID of the chain we're sending the message to.
   */
  function sendHelloWorld(uint32 _destination) external payable {
    // The message that we're sending.
    bytes memory _message = "hello world";
    // Send the message, using any msg.value to pay for interchain gas.
    _dispatchWithGas(_destination, _message, msg.value);
  }

  /**
   * @notice Emits a HelloWorld event upon receipt of an interchain message
   * @param _origin The chain ID from which the message was sent
   * @param _sender The address that sent the message
   * @param _message The contents of the message
   */
  function handle(
    uint32 _origin,
    bytes32 _sender,
    bytes memory _message
  ) external onlyInbox {
    emit HelloWorld(_origin, _sender, _message);
  }
}
```

{% hint style="warning" %}
Because a call is made to the `InterchainGasPaymaster` contract, special care should be made by an application to ensure the `InterchainGasPaymaster` contract is trustworthy and does not present a vector for reentrancy.
{% endhint %}

### Estimating interchain gas payment using the SDK

The `InterchainGasCalculator` found in the Abacus SDK can be used to estimate the amount of origin chain native tokens to pay for interchain gas. An interchain gas estimate considers:

1. The cost of relaying a signed checkpoint to the destination.
2. The cost of processing the transaction on the destination chain.
3. A generous buffer to account for changes in native token prices of the origin and destination chains, or changes in the gas price on the destination chain.

Because a checkpoint from an origin chain's Outbox contains a proof of all previously dispatched messages from that Outbox, a relayed signed checkpoint may include more than one newly dispatched messages. At the time of writing, the cost of relaying a signed checkpoint to the destination chain is not amortized among multiple messages included in the checkpoint, but this may be considered in the future.

First, some modest SDK setup is required. We need an `AbacusCore` and a `MultiProvider` containing providers for the origin and destination domains, which are used to create the `InterchainGasCalculator`. In our example, we will estimate interchain gas payment for a message from Kovan to Fuji.

```typescript
import {
  AbacusCore,
  domains,
  InterchainGasCalculator,
} from '@abacus-network/sdk';
import { ethers } from 'ethers';

// Set up a MultiProvider with providers.

// Note: at the time of writing, InterchainGasCalculator is not
// very strongly typed and requires the <any> generic. This is
// a temporary workaround that will be fixed soon as the typing
// is made stronger.
// Provider URLs found from https://rpc.info/
const multiProvider = new MultiProvider<any>({
  kovan: {
    provider: new ethers.providers.JsonRpcProvider('https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'),
  },
  fuji: {
    provider: new ethers.providers.JsonRpcProvider('https://api.avax-test.network/ext/bc/C/rpc'),
  },
});

// Create a new AbacusCore for the testnet environment
const core = AbacusCore.fromEnvironment('testnet', multiProvider);
const kovanDomain = domains.kovan;
const fujiDomain = domains.fuji;

// Create the interchain gas calculator.
const calculator = new InterchainGasCalculator(multiProvider, core);
```

#### Using a static gas amount for message processing

`estimatePaymentForHandleGasAmount` is the most basic method of estimating interchain gas payment. A static amount of gas is passed as a parameter, which is the amount of gas on the destination chain that the message's recipient handler function is expected to use when processing the message. The returned `ethers.BigNumber` amount is the number of origin chain native tokens, in wei, that will cover the gas costs on the destination chain.

The amount of gas passed into `estimatePaymentForHandleGasAmount` does not need to consider the gas required for relaying a signed checkpoint to the destination chain, overhead costs of processing the message like the merkle proof performed in the Inbox, intrinsic gas, or any additional buffer for safety, as these are considered in the implementation of the function.

```typescript
// An example where the message's recipient handler function is
// expected to use 200,000 gas:
const handleGasAmount = ethers.BigNumber.from(
  200_000
);

// Estimate payment for a static amount of destination gas:
const paymentForGasAmount = await calculator.estimatePaymentForHandleGasAmount(
  kovanDomain.id,
  fujiDomain.id,
  handlerGasAmount,
);
console.log('Kovan tokens to pay for 200,000 gas on Fuji:',
  ethers.utils.formatEther(paymentForGasAmount)
);
```

#### Using an estimated gas amount for a message

Using `estimatePaymentForMessage`, an interchain gas payment can also be estimated for a provided message. Internal to the SDK, an `eth_estimateGas` call on the destination chain is performed to estimate the gas required by the message's recipient handler function. The resulting gas estimate is passed into `estimatePaymentForHandleGasAmount`. The returned `ethers.BigNumber` amount is the number of origin chain native tokens, in wei, that will cover the gas costs on the destination chain.

```typescript
import { utils } from '@abacus-network/utils';

// First, create the ParsedMessage.

// A ParsedMessage can also be created from message bytes
// using:
//   import { parseMessage } from '@abacus-network/sdk';
//   const message = parseMessage('0x00..00');

const message: ParsedMessage = {
  origin: kovanDomain.id,
  // The sender's address, represented in 32 bytes
  sender: utils.addressToBytes32('0xc0ffee0000000000000000000000000000000000'), 
  destination: fujiDomain.id,
  // The recipient's address, represented in 32 bytes
  recipient: utils.addressToBytes32('0xbeef000000000000000000000000000000000000'),
  // "hello world" as bytes
  body: ethers.utils.hexlify(ethers.utils.toUtf8Bytes('hello world')),
};

// Estimate payment for the message, which will estimate the gas
// to process the message.
const paymentForMessage =
  await calculator.estimatePaymentForMessage(message);

console.log('Kovan tokens to pay for interchain gas:',
  ethers.utils.formatEther(paymentForMessage)
);
```
