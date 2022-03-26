# Abacus Apps

Abacus Apps are applications that can natively synchronize state across their "shards" on various blockchains and as such are natively cross-chain. Abacus Apps are able to allow users to interact with them from any Abacus supported chain. While the specific patterns and best practices of how to develop such an application may still evolve over time, a common pattern that is used among current Abacus Apps is the Router pattern. It contains the following parts:

#### 1. Abacus Platform authentication

To use the Abacus Platform, Abacus Apps need to maintain the relevant \`Outbox\` and \`Inbox\` contracts for the remote chains and then

1. authenticate that a call to the `handle` function came from an authorized `Inbox`
2. dispatch a message on an authorized `Outbox`

#### 2. Router authentication

Each router needs to know the addresses of all the other routers on the remote chains so that&#x20;

1. when a message is called on the `handle` function of the Abacus App via the `Inbox` contract, the sender included in the request can be authenticated
2. when a message needs to be sent to a different domain, the relevant recipient can be included in the call to the `Outbox`

#### 3. Message formatting

Routers can synchronize by sending and receiving messages from each other. At the Abacus platform level, messages are just raw bytes, and thus Abacus Apps need to define a common messaging format to translate them into semantically meaningful entities such as commands or function arguments. Read more under [Message encoding](../developers/message-encoding.md).



To follow this pattern, an abstract `Router.sol` contract is provided that Abacus apps can subclass from, which helps implement the Router pattern in the following ways:

* it has a `mapping(uint32 => bytes32) public routers`  mapping that maps domains to the addresses of the routers on those domains. The `internal` `enrollRemoteRouter` function can be called to add a router. The `handle` function can then use the `onlyRemoteRouter` modifier to authenticate received messages
* `Router.sol` uses the `XappConnectionClient.sol` which itself points to an instance of a `XappConnectionManager` which maintains a mapping of domains to `Outboxes` and `Inboxes.`Thus Abacus Apps can then just use the `onlyInbox` modify on their `handle` function as well as call `_dispatchToRemoteRouter(uint32 destination)`to ensure proper interaction with the Abacus Platform.
