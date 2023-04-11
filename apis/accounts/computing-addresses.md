# Computing addresses

It may be useful to know the remote address of your ICA before sending a message. For example, you may want to first fund the address with tokens. The `getRemoteInterchainAccount` function can be used to get the address of an ICA given the destination chain and owner address.

An example is included below of a contract precomputing its own remote ICA address.

```solidity
address myRemoteIca = IInterchainAccountRouter(...).getRemoteInterchainAccount(
    destination,
    address(this)
);
```

If you are using [overrides.md](overrides.md "mention") to specify remote chains or [sovereign-consensus](../../protocol/sovereign-consensus/ "mention"), pass those overrides when computing the remote ICA address.

```solidity
address myRemoteIca = IInterchainAccountRouter(...).getRemoteInterchainAccount(
    address(this),
    remoteRouterOverride,
    remoteIsmOverride
);
```
