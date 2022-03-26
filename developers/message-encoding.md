# Message encoding

At its core, the Abacus Platform is a messaging layer for applications and similar to "traditional" transport layers like TCP, developers will likely want to create higher level abstractions in their applications instead of raw bytes. In this section, we outline various options and their trade-offs.

### General

We expect that Abacus Apps generally want to do the equivalent of call functions on a router on a local chain from another router on a remote chain. For that, it is necessary to encode and decode raw bytes to an equivalent of a function call with parameters in it.

#### ABI Encoding

Solidity developers should already be familiar with the EVM's Application Binary Interface (ABI). The spec can be found [here](https://docs.soliditylang.org/en/v0.8.11/abi-spec.html). Conventional function calls are encoded via function selectors. Solidity exposes functions like `abi.encodeWithSelector` so that developers can encode a function call with relative ease.

```solidity
bytes memory _msg = abi.encodeWithSelector(
  this._setRouter.selector,
  _domain,
  _router
);
_dispatchToRemoteRouter(_destination, _msg);
```

The `handle` function would then simplify to:

```solidity
function handle(
     uint32 _origin,
     bytes32 _sender,
     bytes memory _message
 )
     external
     onlyInbox
     onlyRouter(_origin, TypeCasts.bytes32ToAddress(_sender))
{
     address(this).call(_message);
}
```

While this approach is very simple, it has the following drawbacks:

* Any router needs to be "equally permissioned" in this application, as a remote router can call any function on the local router, including privileged ones.
* This approach requires that routers on non-EVM chains (when added in the future) to have implemented ABI encoding/decoding for function dispatch.

#### TypedMemView

Both the `GovernanceRouter` and the `BridgeRouter` applications have been built with the `TypedMemView` library which allows developers to build a custom, typed, non EVM-specific message format at a higher complexity. You can find more info [here](https://github.com/summa-tx/memview-sol) and how it is used in [`GovernanceMessage`](https://github.com/abacus-network/abacus-monorepo/blob/main/solidity/apps/contracts/governance/GovernanceMessage.sol) and [`BridgeMessage`](https://github.com/abacus-network/abacus-monorepo/blob/main/solidity/apps/contracts/bridge/BridgeMessage.sol).
