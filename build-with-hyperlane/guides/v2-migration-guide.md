# V2 migration guide

An **API compatible** V2 of Hyperlane is currently under development. This page outlines some of the changes users can expect in V2 so they can prepare accordingly. More extensive documentation will be available prior to testnet launch.

The latest code can be found on the is on the main [branch of the monorepo](https://github.com/hyperlane-xyz/hyperlane-monorepo/tree/v2).

## Summary of changes

A high level overview of some of the changes in V2.

### Unified mailboxes

Hyperlane V2 will have one `Mailbox` contract per chain, as opposed to one `Outbox` and several `Inboxes`. This allows applications to specify a single address from which they send and receive messages. ConnectionManager contracts can still be used but are less useful as there are no longer many `Inbox` contracts to aggregate.

### Sovereign consensus

Hyperlane V2 adopts sovereign consensus, as outlined in the sovereign consensus [HIP](https://github.com/hyperlane-xyz/hips/pull/1). More work is needed in order for the relayer to automatically recognize anything other than the default `InterchainSecurityModule`. Until then, V2 will look similar to V1 from a security perspective.

### Changing domain IDs

User feedback has indicated that the difference between Hyperlane domain IDs, and EIP-155 chain IDs. In V2, Hyperlane domain IDs will be changed to match EIP-155 chain IDs.

## Migration guide for apps using V1

If you're building on Hyperlane V1 using an `AbacusConnectionManager`, you will be able to migrate from V1 to V2 by:\
1\. Calling `abacusConnectionManager.setOutbox(v2MailboxAddress)`\
2\. Calling `abacusConnectionManager.enrollInbox(v2DomainId, v2MailboxAddress)`\
3\. Eventually, calling `abacusConnectionManager.unenrollInbox(v1InboxAddress)` for each V1 `Inbox`\


## Using V2 API on V1

You can use the `V2CompatibilityRouter`(`0x1d3aAC239538e6F1831C8708803e61A9EA299Eec`) on all chains that v1 is on to be able to use the V2 interface (i.e. function signatures and chain IDs instead of domain IDs) and when v2 launches, you can easily change the mailboxes to the actual v2 maiboxes.













