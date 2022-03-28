# Controller

Once the DAO comes to a decision, it is usually unable to exert its will outside the boundaries of the chain it lives on and relies on associated multisigs to execute transactions on remote chains. With the [`Controller` Abacus App](../../developers/examples/controller.md), any DAO, including the Abacus DAO, is able to own contracts on remote chains and call them from its home chain.

The Abacus DAO's `Controller` contracts on all remote chains effectively act as a proxy for the Abacus DAO, which can call the `callRemote` function on the home chain's `Controller` contract which will use the Abacus Relay itself to issue the permissioned calls from the `Controller` on the remote chain.

Thus, the Abacus DAO's `Controller` contracts own all the core Abacus smart contracts which include:

* All the `Outbox`/`Inbox` smart contracts on all chains
* A reference `AbacusConnectionManager` on all chains that manage an `Outbox`/`Inbox` mapping that application developers can opt into
