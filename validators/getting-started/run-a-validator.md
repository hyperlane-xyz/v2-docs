---
description: Set environment variables and run the binary
---

# Run a validator

Make sure that you have completed [AWS Setup](aws-setup.md)

### Environment Variables

The agent will need the following environment variables:

* `OPT_BASE_OUTBOX_CONNECTION_URL` The RPC URL of the node for the chain you are validating
* `BASE_CONFIG` Should be `${chain_name}_config.json`
* `RUN_ENV` is either `testnet` or `mainnet`
* `OPT_VALIDATOR_VALIDATOR_KEY` is the alias of the AWS KMS key
* `OPT_BASE_VALIDATOR_TYPE` is `aws`
* `OPT_BASE_VALIDATOR_REGION`is the aws region of the key
* `OPT_VALIDATOR_REORGPERIOD` is the number of blocks the validator should wait until it considered chain state as final.
* `OPT_VALIDATOR_INTERVAL` how often the validator should poll the chain for new state
* `OPT_VALIDATOR_CHECKPOINTSYNCER_THRESHOLD` should be `1`
* `OPT_VALIDATOR_CHECKPOINTSYNCER_TYPE` should be `s3`
* `OPT_VALIDATOR_CHECKPOINTSYNCER_BUCKET` should be the S3 Bucket name
* `OPT_VALIDATOR_CHECKPOINTSYNCER_REGION` should be the AWS region of the bucket

### Run the agent

Agents can be run via `cargo run --bin validator` in the `rust` folder of the [monorepo](https://github.com/abacus-network/abacus-monorepo) or use the docker image via `docker run -it cr.io/abacus-labs-dev/abacus-agent:sha-7be078e ./validator`
