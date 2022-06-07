---
description: Send and receive interchain messages using Abacus
---

# Messaging API

The first step in building an interchain application is writing your smart contract(s). Your contracts will send and receive messages to and from other blockchains using the Abacus interchain messaging API.

## Sending messages

Developers can send messages to other chains by calling the `dispatch()` function on the [`Outbox`](../../protocol/messaging/outbox.md) smart contract, specifying as arguments the message contents and destination.

```solidity
import {IOutbox} from "@abacus-network/core/interfaces/IOutbox.sol";

contract HelloWorld {
  IOutbox outbox;
  
  /**
   * @notice Sends a "hello world" message to an address on a remote chain.
   * @param _destination The ID of the chain we're sending the message to.
   * @param _recipient The address of the recipient we're sending the message to.
   */
  function sendHelloWorld(uint32 _destination, address _recipient) external {
    // The message that we're sending.
    bytes memory _message = "hello world";
    // Send the message! 
    outbox.dispatch(_destination, _recipient, _message);
  }
}
```

## Receiving messages

Developers can receive messages from other chains by implementing the `handle()` function. The  [`Inbox`](../../protocol/messaging/inbox.md) contract will call `handle()` on the recipient when processing messages.

```solidity
import {IMessageRecipient} from "@abacus-network/core/interfaces/IMessageRecipient.sol";

contract HelloWorld is IMessageRecipient {
  address inbox;
  
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
  ) external {
    require(msg.sender == inbox, "!inbox");
    emit HelloWorld(_origin, _sender, _message);
  }
}
```
