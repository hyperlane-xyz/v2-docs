---
description: Configure your validator
---

# Environment variables

Make sure that you have completed [local-setup.md](setup/local-setup.md "mention") or [aws-setup.md](setup/aws-setup.md "mention")

Also take a look at the [agent-configuration.md](../agent-configuration.md "mention") page.

### Environment variables

Your validator takes environment variables as configuration. See below for these environment variables & those that are specific to the setup instructions you followed.

| Environment variable                                 | Description                                                                                                                                                                                                                                                                                                                                                 |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CONFIG_FILES`                                       | If you want support your own chain that you [permissionlessly deployed](broken-reference), you specify the path to that agent config file here as well.                                                                                                                                                                                                     |
| `HYP_VALIDATOR_ORIGINCHAINNAME`                      | The name of the chain being validated (e.g. `ethereum`)                                                                                                                                                                                                                                                                                                     |
| `HYP_VALIDATOR_REORGPERIOD`                          | <p>The number of block confirmations a validator should wait before signing the <code>Mailbox</code> merkle root. Note that signing a root that is later invalidated (i.e. due to a re-org) is considered fraudulent behavior and will eventually be slashable.</p><p>Suggestions <a href="environment-variables.md#suggested-reorg-periods">below</a>.</p> |
| `HYP_VALIDATOR_INTERVAL`                             | <p>In seconds, the frequency with which the validator should poll the <code>Mailbox</code> merkle root.</p><p>Suggestions <a href="environment-variables.md#suggested-reorg-periods">below</a>.</p>                                                                                                                                                         |
| `HYP_BASE_CHAINS_[origin chain name]_CONNECTION_URL` | <p>The RPC URL of the node for the chain you are validating. Note Polygon mainnet requires an RPC URL of an archive node (see <a data-mention href="./#an-rpc-node">#an-rpc-node</a>for details).<br>e.g. <code>HYP_BASE_CHAINS_ETHEREUM_CONNECTION_URL</code> or <code>HYP_BASE_CHAINS_POLYGON_CONNECTION_URL</code></p>                                   |
| `HYP_BASE_METRICS`                                   | Set to `9090`, or any other port number you wish to expose Prometheus metrics on. Not specifying a value will result in metrics not being exposed.                                                                                                                                                                                                          |
| `HYP_BASE_TRACING_LEVEL`                             | Specifies the log level, set to `info`                                                                                                                                                                                                                                                                                                                      |
| `HYP_BASE_TRACING_FMT`                               | Specifies the format of the logs, set it to either `pretty` or `json`                                                                                                                                                                                                                                                                                       |

#### Setup-specific environment variables

These **required** environment variables differ based on which [setup](setup/) instructions you followed.

{% tabs %}
{% tab title="AWS setup" %}
These are required environment variables that are specific to the [aws-setup.md](setup/aws-setup.md "mention").

| Environment variable                    | Description                                                                                                                                                           |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `HYP_VALIDATOR_VALIDATOR_TYPE`          | Set to `aws`.                                                                                                                                                         |
| `HYP_VALIDATOR_VALIDATOR_ID`            | <p>The alias of your validator's AWS KMS key, prefixed with <code>alias/</code>.<br><em>Example:</em> <code>alias/hyperlane-validator-signer-${chain_name}</code></p> |
| `HYP_VALIDATOR_VALIDATOR_REGION`        | <p>The region of your AWS KMS key.<br><em>Example:</em> <code>us-east-1</code>.</p>                                                                                   |
| `HYP_VALIDATOR_CHECKPOINTSYNCER_TYPE`   | Set to `s3`.                                                                                                                                                          |
| `HYP_VALIDATOR_CHECKPOINTSYNCER_BUCKET` | The AWS S3 bucket name.                                                                                                                                               |
| `HYP_VALIDATOR_CHECKPOINTSYNCER_REGION` | <p>The region of your AWS S3 bucket.<br><em>Example:</em> <code>us-east-1</code>.</p>                                                                                 |
| `AWS_ACCESS_KEY_ID`                     | The access key ID of your validator's AWS IAM user.                                                                                                                   |
| `AWS_SECRET_ACCESS_KEY`                 | The secret access key of your validator's AWS IAM user.                                                                                                               |
{% endtab %}

{% tab title="Local setup" %}
These are required environment variables that are specific to the [local-setup.md](setup/local-setup.md "mention").

| Environment variable                  | Description                                                                                                                                                                                                                                                                                                       |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `HYP_VALIDATOR_VALIDATOR_TYPE`        | Set to `hexKey`.                                                                                                                                                                                                                                                                                                  |
| `HYP_VALIDATOR_VALIDATOR_KEY`         | Your validator's private key, which is used to sign merkle roots.                                                                                                                                                                                                                                                 |
| `HYP_VALIDATOR_CHECKPOINTSYNCER_TYPE` | Set to `localStorage`.                                                                                                                                                                                                                                                                                            |
| `HYP_VALIDATOR_CHECKPOINTSYNCER_PATH` | <p>The path to your local directory where validator signatures will be written. This should be the value of <code>$MY_VALIDATOR_SIGNATURES_DIRECTORY</code> from the <a data-mention href="setup/local-setup.md">local-setup.md</a>.</p><p>Example: <code>/tmp/hyperlane-validator-signatures-ethereum</code></p> |
{% endtab %}
{% endtabs %}

### Suggested Reorg Periods

{% content-ref url="../../resources/latencies.md" %}
[latencies.md](../../resources/latencies.md)
{% endcontent-ref %}

### Next

Next, in the [Start validating](start-validating.md) section we will get the validator up and running.

{% content-ref url="start-validating.md" %}
[start-validating.md](start-validating.md)
{% endcontent-ref %}
