---
description: Manage your application's connection to Abacus
---

# AbacusConnectionManager

[`AbacusConnectionManagers`](https://github.com/abacus-network/abacus-monorepo/blob/main/solidity/core/contracts/AbacusConnectionManager.sol) connect [`AbacusConnectionClients`](abacusconnectionclient.md) to the Abacus `Outbox` and `Inbox` contracts.

`ApplicationConnectionClients` send messages to the [`Outbox`](../../protocol/messaging/outbox.md) contract address stored in the `AbacusConnectionManager.`

Similarly, `ApplicationConnectionClients` query the `AbacusConnectionManager` when receiving messages, to ensure that messages are being delivered by an [`Inbox`](../../protocol/messaging/inbox.md) contract.

The `Outbox` and `Inbox` addressed stored by the `AbacusConnectionManager` can be updated by the contract's `owner`, allowing clients using that connection manager to easily migrate to newer versions of the Abacus protocol.

```solidity
 interface IAbacusConnectionManager {
    /**
     * @notice Returns the address of the Outbox.
     * @return The address of the outbox.
     */ 
    function outbox() external view returns (IOutbox);
    
    /**
     * @notice Allow owner to enroll Inbox contract
     * @param _domain the remote domain of the Outbox contract for the Inbox
     * @param _inbox the address of the Inbox
     */
    function enrollInbox(uint32 _domain, address _inbox) external onlyOwner;
    
    /**
     * @notice Allow owner to set the address of the local Outbox contract.
     * @dev Changing the Outbox and not the Interchain Gas Paymaster may result in
     * using an Interchain Gas Paymaster that expects messages to be dispatched via
     * a different outbox. Use `setOutboxAndInterchainGasPaymaster` to change both
     * atomically.
     * @param _outbox The address of the new local Outbox contract.
     */
    function setOutbox(address _outbox) external onlyOwner;
}
```

Applications can deploy their own `AbacusConnectionManagers` if they want their connection to Abacus to be controlled by their own governance protocol.

Abacus Works will deploy and maintain a public `AbacusConnectionManager` that all are welcome to use.
