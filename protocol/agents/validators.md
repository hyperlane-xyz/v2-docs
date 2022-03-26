# Validators

Validators perform a very critical role in the Abacus platform. They observe the Outbox contract for new checkpoints and after accounting for finality, sign the checkpoint and broadcast their signatures so that they can be used for message processing on the associated Inboxes.&#x20;

#### Impact

Improper signatures, i.e. signatures over checkpoints that do not exist on the Outbox, are malicious and could lead to invalid messages being processed on the inbox. Thus validators are responsible for only signing valid checkpoints on the Outbox and ensure their operational security.

#### Operations

Running a Validator compared to other protocols is operationally quite simple:

* Run the validator agent itself
* Configure the agent with a signer
* Configure the agent with an RPC node which itself can be a light client
* Configure the agent with a storage modality for the signatures

It's worth noting that Validators do not have to write to any blockchain and thus can sign all checkpoints they encounter with no operational marginal cost.

#### Roadmap

At launch, the validator agent will support the following configuration:

* Signer
  * [AWS KMS](https://aws.amazon.com/kms/)
  * Plaintext private keys
  * Coming soon: [GCP Cloud HSM](https://cloud.google.com/kms/docs/hsm)
  * Considering: Physical HSMs
* Storage
  * [AWS S3](https://aws.amazon.com/s3)
  * Coming soon: [GCP Cloud Storage](https://cloud.google.com/storage)
  * Considering: Decentralized storage networks

