---
description: Configure your validator
---

# Environment variables

Make sure that you have completed [AWS Setup](aws-setup.md)

### Environment variables

Your validator takes as configuration the following environment variables:

| Environment variable                    | Description                                                                                                                                                                                                                                                                                                                                                                               |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `RUN_ENV`                               | <p>Config files containing, among other things, contract addresses, are expected to be located at the relative path <code>./config/$RUN_ENV/$BASE_CONFIG</code>.<br><br>These config files are packaged into the docker image by default at that location. Validators running using the docker image can set this env var to to either <code>testnet2</code> or <code>mainnet</code>.</p> |
| `BASE_CONFIG`                           | <p>The config filename containing, among other things, contract addresses. The config files can be found <a href="https://github.com/abacus-network/abacus-monorepo/tree/main/rust/config/mainnet">here</a>.<br><br>If running using the docker image, should be set to <code>${chain_name}_config.json</code>.</p>                                                                       |
| `AWS_ACCESS_KEY_ID`                     | The access key ID of your validator's AWS IAM user                                                                                                                                                                                                                                                                                                                                        |
| `AWS_SECRET_ACCESS_KEY`                 | The secret access key of your validator's AWS IAM user                                                                                                                                                                                                                                                                                                                                    |
| `ABC_VALIDATOR_VALIDATOR_ID`            | The alias of your validator's AWS KMS key, prefixed with `alias/`, e.g. `alias/abacus-validator-signer-${chain_name}`                                                                                                                                                                                                                                                                     |
| `ABC_BASE_VALIDATOR_REGION`             | The region of the AWS KMS key                                                                                                                                                                                                                                                                                                                                                             |
| `ABC_VALIDATOR_CHECKPOINTSYNCER_BUCKET` | The AWS S3 bucket name                                                                                                                                                                                                                                                                                                                                                                    |
| `ABC_VALIDATOR_CHECKPOINTSYNCER_REGION` | The region of the AWS S3 bucket                                                                                                                                                                                                                                                                                                                                                           |
| `ABC_BASE_OUTBOX_CONNECTION_URL`        | The RPC URL of the node for the chain you are validating                                                                                                                                                                                                                                                                                                                                  |
| `ABC_VALIDATOR_REORGPERIOD`             | <p>The number of blocks confirmations validator should wait before signing the <code>Outbox</code> merkle root. Note that signing a root that is later invalidated (i.e. due to a re-org) is considered fraudulent behavior and will eventually be slashable. </p><p></p><p>Suggestions <a href="environment-variables.md#suggested-reorg-periods">below</a>.</p>                         |
| `ABC_VALIDATOR_INTERVAL`                | <p>In seconds, the frequency with which the validator should poll the <code>Outbox</code> merkle root.</p><p></p><p>Suggestions <a href="environment-variables.md#suggested-reorg-periods">below</a>.</p>                                                                                                                                                                                 |
| `ABC_BASE_VALIDATOR_TYPE`               | Set to `aws`                                                                                                                                                                                                                                                                                                                                                                              |
| `ABC_VALIDATOR_CHECKPOINTSYNCER_TYPE`   | Set to `s3`                                                                                                                                                                                                                                                                                                                                                                               |
| `ABC_BASE_METRICS`                      | Set to `9090`, or any other port number you wish to expose Prometheus metrics on. Not specifying a value will result in metrics not being exposed.                                                                                                                                                                                                                                        |
| `ABC_BASE_TRACING_LEVEL`                | Specifies the log level, set to `info`                                                                                                                                                                                                                                                                                                                                                    |

### Suggested values

| Chain     | Suggested reorg period (blocks) | Suggested polling interval (seconds) |
| --------- | ------------------------------- | ------------------------------------ |
| Arbitrum  | 0                               | 1                                    |
| Avalanche | 3                               | 2                                    |
| BSC       | 15                              | 3                                    |
| Celo      | 0                               | 5                                    |
| Ethereum  | 20                              | 15                                   |
| Optimism  | 0                               | 15                                   |
| Polygon   | 256                             | 2                                    |

