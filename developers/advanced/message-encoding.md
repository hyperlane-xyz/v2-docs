---
description: Recommended approaches for encoding and decoding messages
---

# Message encoding

Abacus cross-chain messages are encoded as raw byte arrays. In order to send and receive messages, developers should implement functions for encoding and decoding cross-chain messages.&#x20;

In this section, we describe two recommended approaches and their trade-offs.

### General

In most cases, we expect that developers are sending cross-chain messages in order to call a function on a contract on remote chain. For that, it is necessary to encode and decode raw bytes to an equivalent of a function call with arguments.

#### ABI Encoding

Abacus developers can encode and decode data according to the [Application Binary Interface](https://docs.soliditylang.org/en/v0.8.11/abi-spec.html) (ABI). Developers can use built-in functions like `abi.encodeWithSelector` to easily encode function calls as raw byte arrays.

```solidity
bytes memory _msg = abi.encodeWithSelector(
  this._setRouter.selector,
  _destination,
  _recipient
);
_dispatchToRemoteRouter(_destination, _msg);
```

Developers can leverage Solidity's built-in ABI decoder to translate encoded messages back into function calls.&#x20;

```solidity
function handle(
  uint32 _origin,
  bytes32 _sender,
  bytes memory _msg
)
  external
  onlyInbox
{
  address(this).call(_msg);
}
```

This approach has the advantage of being very simple to implement, but may not easily extend to non-EVM chains that Abacus may support in the future, as those chains may not offer native support ABI encoding and decoding.

#### TypedMemView

The native Abacus contracts have been built using the [`TypedMemView`](https://github.com/summa-tx/memview-sol) library, which allows developers to build a custom, typed, non EVM-specific message format. `TypedMemView` offers developers a solution for chain-agnostic message encoding and decoding, at the expense of greater complexity of implementation.
