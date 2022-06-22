---
description: The easiest way to integrate with Abacus
---

# AbacusConnectionClient

Inheriting from [`AbacusConnectionClient`](https://github.com/abacus-network/abacus-monorepo/blob/main/solidity/app/contracts/AbacusConnectionClient.sol) is a simple way to ensure your contract knows where to send or receive interchain messages to or from.

This mix-in contract maintains a pointer to an [`AbacusConnectionManager`](abacusconnectionmanager.md). Application developers can choose to deploy their own connection manager, or point to an existing contract that's managed by an entity they trust.

`AbacusConnectionClient` exposes functions that allow subclasses to easily send messages to the `Outbox` via the `_outbox()` view function, and permission message delivery via the `onlyInbox` modifier.

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
  ) external override onlyInbox {
    emit HelloWorld(_origin, _sender, _message);
  }
}
```
