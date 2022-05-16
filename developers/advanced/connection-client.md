---
description: The easiest way to connect your application to Abacus
---

# Connection Client

To send and receive interchain messages, your application will need to be aware of the Abacus contract addresses. Inheriting from [`AbacusConnectionClient`](https://github.com/abacus-network/abacus-monorepo/blob/main/solidity/app/contracts/AbacusConnectionClient.sol) is the easiest way to manage these pointers.

## Abacus Connection Manager

Before diving into `AbacusConnectionClient`, first let's zoom out, and take a look at [`AbacusConnectionManager`](https://github.com/abacus-network/abacus-monorepo/blob/main/solidity/core/contracts/AbacusConnectionManager.sol),  an out-of-the-box solution for managing Abacus contract addresses.

`AbacusConnectionManager` is an `Ownable` contract that manages pointers to the Abacus [`Outbox`](../../protocol/messaging/outbox.md) and [`Inbox`](../../protocol/messaging/inbox.md) contracts, which can be updated by the `owner`.

When sending interchain messages, applications can query an `AbacusConnectionManager` for the address of the Abacus `Outbox`. Similarly, when receiving interchain messages, applications can query an `AbacusConnectionManager` in order to validate that the message was sent via Abacus.

### Upgradability

You might ask, why use an `AbacusConnectionManager` when you can instead hardcode contract addresses in your contract's constructor?

Over time, we expect a number of incremental improvements to the Abacus protocol, some of which may necessitate a new deployment of the protocol, despite remaining API compatible from the perspective of application developers.

Using an `AbacusConnectionManager` allows applications to migrate to a new Abacus deployment with just a few transactions.

## Abacus Connection Client

[`AbacusConnectionClient`](https://github.com/abacus-network/abacus-monorepo/blob/main/solidity/app/contracts/AbacusConnectionClient.sol) is a simple mix-in contract that application developers can inherit from in order to connect to Abacus.

This contract maintains a pointer to an `AbacusConnectionManager`. Application developers can choose to deploy their own connection manager, or point to an existing contract that's managed by an entity they trust.

`AbacusConnectionClient` exposes functions that allow subclasses to easily query the `AbacusConnectionManager` for the addresses of the Abacus contracts that it is currently connected to.

