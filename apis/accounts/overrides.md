---
description: Use interchain accounts with any chain and any security model
---

# Overrides

The interchain accounts API allows developers to override the default chains and security models configured in the `InterchainAccountRouter`.

This can be useful for developers who wish to:

* Call an ICA on a chain that was not explicitly added by the `InterchainAccountRouter` owner, or
* Secure their ICA(s) using different [sovereign-consensus](../../protocol/sovereign-consensus/ "mention") than the defaults configured in the `InterchainAccountRouter`

## Interface

{% hint style="warning" %}
The address of a remote ICA will vary with the `_router` and `_ism` overrides used
{% endhint %}

The `callRemoteWithOverrides` function looks similar to the `callRemote` function, but takes two additional arguments.

First, developers can override `_router`, the address of the `InterchainAccountRouter` on the remote chain. This allows developers to control an ICA on remote chains that have not been configured on the local `InterchainAccountRouter`.

Second, developers can override `_ism`, the address of the remote interchain security module (ISM) used to secure their ICA. This ISM will be used to verify the interchain messages passed between the local and remote `InterchainAccountRouters`. This allows developers to use a custom security model that best suits their needs.

Read more about [sovereign-consensus](../../protocol/sovereign-consensus/ "mention").

```solidity
    /**
     * @notice Dispatches a sequence of remote calls to be made by an owner's
     * interchain account on the destination domain
     * @dev Recommend using CallLib.build to format the interchain calls
     * @param _destination The remote domain of the chain to make calls on
     * @param _router The remote router address
     * @param _ism The remote ISM address
     * @param _calls The sequence of calls to make
     * @return The Hyperlane message ID
     */
    function callRemoteWithOverrides(
        uint32 _destination,
        bytes32 _router,
        bytes32 _ism,
        CallLib.Call[] calldata _calls
    ) public returns (bytes32) 
```
