---
description: A pattern for building interchain applications
---

# Router Pattern

While patterns and best practices will evolve over time, the Router pattern has emerged as a useful model for building interchain applications.

The Router pattern allows developers to write application logic once while deploying it to many networks. Developers can leverage this pattern by inheriting from the [`Router.sol` mix-in contract](https://github.com/abacus-network/abacus-monorepo/blob/main/solidity/app/contracts/Router.sol), and implementing functions that send and receive messages to and from remote chains.

Developers then deploy their contracts on each chain that they would like their application to support. Each contract must be made aware of their counterparts on all remote chains so that they can authenticate the messages that they send between each other.

```solidity
/**
  * @notice Register the address of a Router contract a remote chain
  * @param _domain The domain of the remote Router
  * @param _router The address of the remote Router
  */
function enrollRemoteRouter(uint32 _domain, bytes32 _router) external onlyOwner;
```
