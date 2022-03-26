# Processor

Once a relayer relayed a signed checkpoint, the processor agent is able to construct a merkle proof for the processing of a message included in that checkpoint and submit such on-chain. Processing of a message is completely permission-less. On the testnets, developers can expect messages to be processed for them. At mainnet launch, there will be an adjacent protocol for allowing users to pay on the source chain for the processing of their messages on the remote chain and developers can opt into it. Otherwise, application developers (or anyone else) can also just run processors themselves.

#### Error Handling

If the recipient of a message reverts, the processor agent may be configured to retry the processing of the message at a later time. However after a maximum amount of retries, the processor will no longer attempt to process the message. Developers should be mindful of this possibility and possibly consider monitoring of their application's messages and require manual processing.
