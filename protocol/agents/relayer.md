# Relayer

The relayer agent takes signed checkpoints from the Validators and submits them to the associated inboxes on the remote chains. It is important to note that the relayer is a permission-less role and thus anyone can run a relayer and relay the checkpoints. Similar to the [Checkpointer](checkpointer.md), relayers will usually consider a trade-off between latency and cost when evaluating whether to relay a particular signed checkpoint. Even at the presence of a more recent signed checkpoints, relayers should not relay them unless said checkpoint actually results in the ability to process additional messages.

At launch, relayers will be able to be configured with a simple "max-latency" policy, but in the future more sophisticated policies can be developed that consider additional data points such as message senders/contents/quantity as well as compensation mechanisms.
