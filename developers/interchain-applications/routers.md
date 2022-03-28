---
description: A pattern for building interchain applications
---

# Routers

While patterns and best practices will evolve over time, the `Router` pattern has emerged as an early model for building interchain applications.

Developers can build applications following this pattern by inheriting from the `Router` mix-in contract, and implementing functions that send and receive messages to remote and from remote chains.

Developers then deploy their contracts on each chain that they would like their application to support. Each contract must be made aware of their counterparts on all remote chains so that they can authenticate the messages that they send between each other.

```solidity
/**
  * @notice Register the address of a Router contract a remote chain
  * @param _domain The domain of the remote Router
  * @param _router The address of the remote Router
  */
function enrollRemoteRouter(uint32 _domain, bytes32 _router) external onlyOwner;
```
