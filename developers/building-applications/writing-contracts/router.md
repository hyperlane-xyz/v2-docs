---
description: A write-once deploy-everywhere pattern for interchain applications
---

# Router

Application developers looking to write their contracts once and deploy them on multiple chains should consider building with the [`Router`](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/solidity/contracts/Router.sol) pattern.

In this pattern, an instance of the application's contracts is deployed on each application-supported chain. Each instance is made aware of the addresses of instances on other chains. These instances use Hyperlane to communicate information and state to and from instances on remote chains.

Developers using this pattern can inherit from the `Router` mix-in contract. `Router` is an [`AbacusConnectionClient`](abacusconnectionclient.md) that tracks the addresses of other `Router` contract addresses on remote chains. This allows `Routers` to send messages directly to others without having to specify addresses. It also allows `Routers` to reject messages sent from other untrusted senders.

```solidity
 interface IRouter {
    /**
     * @notice Register the address of a Router contract for the same
     * Application on a remote chain.
     * @param _domain The domain of the remote Application Router
     * @param _router The address of the remote Application Router
     */
    function enrollRemoteRouter(uint32 _domain, bytes32 _router)
        external
        onlyOwner;

    /**
     * @notice Dispatches a message to an enrolled router via the local
     * router's Outbox.
     * @dev Reverts if there is no enrolled router for _destinationDomain.
     * @param _destinationDomain The domain of the chain to which to send the message.
     * @param _msg The message to dispatch.
     */
    function _dispatch(uint32 _destinationDomain, bytes memory _msg)
        internal
        returns (uint256);
 
    /**
     * @notice Handles an incoming message
     * @param _origin The origin domain
     * @param _sender The sender address
     * @param _message The message
     */
    function handle(
        uint32 _origin,
        bytes32 _sender,
        bytes memory _message
    ) external onlyInbox onlyRemoteRouter(_origin, _sender);
}
```
