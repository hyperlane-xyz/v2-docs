# Checkpointer

Checkpointers are agents that explicitly call the `checkpoint` function on the Outbox so that Validators can sign them. Checkpointers are permissionless and anyone can run them. Checkpointers will usually consider whether to checkpoint a trade-off between latency and cost. More frequent checkpointing allows the root of the Outbox's merkle tree to be relayed faster at the expense of higher gas consumption.&#x20;

At launch, checkpointers may be run with a simple "max-latency" policy but in the future, more advanced policies can be developed that account for other indicators such as number of messages "waiting to be checkpointed", priorities of specific senders, etc. Having message senders compensate checkpointers is also being considered. In the meantime if an application requires higher latency, it can either run their own checkpointer or even just checkpoint as part of the message dispatch on-chain.
