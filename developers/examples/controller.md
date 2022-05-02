---
description: An app for executing cross-chain function calls
---

# Controller

The Controller is an Abacus application that allows arbitrary function calls to be executed on remote chains, built according to the [Router](broken-reference) design pattern.

We expect the Controller to be most useful as a tool to extend the reach of a governance protocol to multiple chains. For example, the Controller can allow a DAO deployed on Ethereum to execute transactions on remote chains like Polygon, Avalanche, or Celo.

#### Calls

The primary function of the Controller is to execute calls on remote chains. This can be done by calling `ControllerRouter.callRemote()`, specifying the ID of the remote chain and the calls to make on that chain.&#x20;

This results in a message being dispatched to the corresponding `ControllerRouter` on the remote chain, which executes the calls on that chain.

The `ControllerRouter` can also be directed to execute calls on the local chain by calling `ControllerRouter.call()`.&#x20;

```solidity
struct Call {
  bytes32 to;
  bytes data;
}

/**
  * @notice Dispatch calls on a remote chain via the remote ControllerRouter
  * @param _destination The domain of the remote chain
  * @param _calls The calls
  */
function callRemote(
  uint32 _destination,
  Call[] calldata _calls
) external onlyGovernor onlyNotInRecovery;

/**
  * @notice Handle remote message and execute calls locally
  * @param _msg The message containing the calls to execute
  */
function _handleCall(bytes29 _msg) internal;

/**
  * @notice Execute calls locally
  * @param _calls The calls to execute
  */
function call(Call[] calldata _calls) external onlyOwner;
```

#### Controller

The `controller` is a permissioned role on the `ControllerRouter` that is allowed to dispatch calls to remote chains. Calls to `ControllerRouter.callRemote()` by addresses other than the `controller` will revert.

To use the Controller application to extend the control of a DAO to multiple chains, the `controller` of the `ControllerRouters` should be set to:

* On the DAO chain: The DAO address
* On all other chains: The null address

This gives the DAO the exclusive power to execute calls on remote chains.

#### Recovery

Recovery mode provides a fail-safe mechanism for regaining control in the event of a catastrophic Abacus liveness failure.

Recovery mode can be triggered by the `recoveryManager`, a permissioned role on the `ControllerRouter`, and is subject to a time lock.

When a `ControllerRouter` is in recovery mode, it becomes owned by the `recoveryManager`, which gives the `recoveryManager` permission to trigger function calls on the local chain.&#x20;

```solidity
/**
  * @notice Initiate the recovery timelock
  * @dev callable by the recovery manager iff not in recovery
  */
function initiateRecoveryTimelock() external onlyNotInRecovery onlyRecoveryManager;

/**
  * @notice Exit recovery mode
  * @dev callable by the recovery manager iff in recovery
  */
function exitRecovery() external onlyInRecovery onlyRecoveryManager;
```





