---
description: A list of common terms in Hyperlane systems
---

# Glossary

* **Agent:** The software which Hyperlane network validators run.
* **Chain:** A network (blockchain), identified by a unique chain name.
* **Checkpoint**: A signal to digest messages and package them for delivery.
* **Domain:** Similar to chain, it represents a specific network but it's identified by a unique integer.
* **Inbox / Outbox:** Outbound messages go through outboxes into inboxes, from which they can be delivered.
* **Message**: Data (typically bytestrings) to be moved from an origin chain to destinations.&#x20;
* **Processor:** A service that creates proofs to allow processing of delivered messages.
* **Relayer:** A service that submits signed checkpoints to destination chains.
* **Router:** A contract that can dispatch and receive Hyperlane messages.
* **Validator:** A client on the Hyperlane network, elected by Proof-of-Stake, that helps ensure the security and liveness of the system.
