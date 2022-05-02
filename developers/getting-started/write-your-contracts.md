---
description: Send and receive interchain messages using Abacus
---

# Write your contracts

The first step in building an interchain application is writing your smart contract(s). Your contracts will send and receive messages to and from other blockchains using the Abacus API.

## Sending messages

Developers can send messages to other chains by calling the `dispatch()` function on the [`Outbox`](../../protocol/messaging/outbox.md) smart contract.

Note that we inherit from [`AbacusConnectionClient`](../advanced/abacusconnectionclient.sol.md), a simple contract that helps us keep track of the Abacus [`Inbox`](../../protocol/messaging/inbox.md) and [`Outbox`](../../protocol/messaging/outbox.md) contracts on our local chain.

```solidity
import {AbacusConnectionClient} from "@abacus-network/app/contracts/AbacusConnectionClient.sol";

contract HelloWorld is AbacusConnectionClient {
  /**
   * @notice Sends a "hello world" message to an address on a remote chain.
   * @param _destination The ID of the chain we're sending the message to.
   * @param _recipient The address of the recipient we're sending the message to.
   */
  function sendHelloWorld(uint32 _destination, address _recipient) external {
    // The message that we're sending.
    bytes memory _message = "hello world";
    // Send the message! 
    _outbox().dispatch(_destination, _recipient, _message);
  }
}
```

## Receiving messages

Developers can receive messages from other chains by implementing the `handle()` function. The Abacus Inbox contract will call `handle()` on the recipient when processing messages.

Note that we guard the `handle()` function with the `onlyInbox` modifier to ensure that we only accept messages that were sent via Abacus.

```solidity
import {AbacusConnectionClient} from "@abacus-network/app/contracts/AbacusConnectionClient.sol";

contract HelloWorld is AbacusConnectionClient {
  /**
   * @notice The event we emit when we receive an interchain message.
   */
  event HelloWorld(uint32 indexed origin, address indexed sender, bytes message);

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

## Try it yourself!

To get started writing your contracts, simply install [@abacus-network/app](https://www.npmjs.com/package/@abacus-network/app) and inherit from [`AbacusConnectionClient`](../advanced/abacusconnectionclient.sol.md).

You can also use the [template repo](https://github.com/abacus-network/abacus-app-template), which has everything you need to write, test, deploy, and interact with, your first interchain application.

Looking to build something a bit more complex? Consider taking a look at the [Router pattern](../advanced/router.sol.md) for interchain applications.

