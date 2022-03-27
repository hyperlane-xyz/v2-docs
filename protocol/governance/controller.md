# Controller

If the first part of Governance is how a DAO comes to a decision, the second part of Governance is how a DAO executes a decision over its domain. Ownership in the context of a blockchain means exclusive power. The Controller Abacus App allows the Abacus DAO that technically lives on a single chain to exercise its will on all Abacus-supported chains and thus makes it a natively cross-chain DAO. That means that the Abacus DAO (like any other address on any Abacus chain) can own smart contracts (i.e. call permissioned functions) and assets (i.e can call `transfer` on `ERC20` token contracts) on any chain. For the Abacus platform, the Abacus DAO's Controller will own:

* All the `Outbox`/`Inbox` smart contracts on all chains
* A reference `AbacusConnectionManager` on all chains that manage an `Outbox`/`Inbox` mapping that application developers can opt into



