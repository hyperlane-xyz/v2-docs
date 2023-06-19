---
description: Required setup instructions
---

# Guide

## Environments

### Local Setup

{% hint style="warning" %}
**The local setup is only intended for testing or development purposes.**

This is intended to show how you can run a validator on your _**local machine**_, which is only for testing and development purposes. This also means that signatures from local validators are only able to be accessed by locally ran relayers.

For running a validator in a production environment, see the [aws-setup.md](aws-setup.md "mention") guide.
{% endhint %}

#### Create a hexadecimal key for your validator to sign with

{% content-ref url="../agent-keys/hexadecimal-key-setup.md" %}
[hexadecimal-key-setup.md](../agent-keys/hexadecimal-key-setup.md)
{% endcontent-ref %}

#### Create a local directory for your validator's signatures

When running a validator locally, your validator will write its signatures to a local directory. This directory can be named whatever you like, just remember to use this directory when setting your [#configuration](setup.md#configuration "mention").

```sh
# Pick an informative name specific to the chain you're validating
MY_VALIDATOR_SIGNATURES_DIRECTORY=/tmp/hyperlane-validator-signatures-ethereum

# Create the directory
mkdir $MY_VALIDATOR_SIGNATURES_DIRECTORY
```

### Production Setup

For running a validator in a production environment, see the AWS setup guide.

{% content-ref url="aws-setup.md" %}
[aws-setup.md](aws-setup.md)
{% endcontent-ref %}

## Configuration

{% hint style="info" %}
Take a look at the [agent-configuration](../agent-configuration/ "mention") page and the [configuration-reference.md](../agent-configuration/configuration-reference.md "mention") for a full list of configuration possibilities. **The list below is not complete,** however it should be enough to get started.
{% endhint %}

Your validator takes arguments and environment variables as configuration. See below for both the general configurations and those that are specific to the setup instructions you followed.

| Argument                                      | Description                                                                                                                                                                                                                                                                                                                                     |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--reorgPeriod`                               | <p>The number of block confirmations a validator should wait before signing the <code>Mailbox</code> merkle root. Note that signing a root that is later invalidated (i.e. due to a re-org) is considered fraudulent behavior and will eventually be slashable.<br>See <a data-mention href="../../resources/latencies.md">latencies.md</a></p> |
| `--interval`                                  | In seconds, the frequency with which the validator should poll the `Mailbox` merkle root. (Defaults to 5 seconds).                                                                                                                                                                                                                              |
| `--originChainName`                           | The name of the chain being validated (e.g. `ethereum`)                                                                                                                                                                                                                                                                                         |
| `--chains.[origin chain name].connection.url` | <p>The RPC URL of the node for the chain you are validating. Note Polygon mainnet requires an RPC URL of an archive node (see <a data-mention href="./#an-rpc-node">#an-rpc-node</a>for details).<br>e.g. <code>--chains.ethereum.connection.url</code> or <code>--chains.polygon.connection.url</code></p>                                     |

| Environment variable | Description                                                                                                                                                                                                                                                                                                                                                                               |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CONFIG_FILES`       | If you want to add additional configuration files you can add additional paths here as a comma separated list. These files must be accessible within the filesystem your agent has access to. If you're running in Docker, see [#config-files-with-docker](../agent-configuration/#config-files-with-docker "mention") for tips on mounting your config files into your Docker container. |

### Setup-specific configuration

These **required** environment variables differ based on which of the [#environments](setup.md#environments "mention") you set up.

{% tabs %}
{% tab title="Local setup" %}
These are required for the [#local-setup](setup.md#local-setup "mention").

| Argument                  | Description                                                                                                                                                                                                                                                                                                                               |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--validator.type`        | Set to `hexKey`.                                                                                                                                                                                                                                                                                                                          |
| `--validator.key`         | Your validator's private key, which is used to sign merkle roots.                                                                                                                                                                                                                                                                         |
| `--checkpointSyncer.type` | Set to `localStorage`.                                                                                                                                                                                                                                                                                                                    |
| `--checkpointSyncer.path` | <p>The path to your local directory where validator signatures will be written. This should be the value of <code>$MY_VALIDATOR_SIGNATURES_DIRECTORY</code> from the <a data-mention href="setup.md#local-setup">#local-setup</a>.</p><p>Example: <code>--checkpointSyncer.path='/tmp/hyperlane-validator-signatures-ethereum'</code></p> |

{% hint style="warning" %}
Note that relayers **must** be configured with `--allowLocalCheckpointSyncers` to be able to read signatures from this validator.
{% endhint %}
{% endtab %}

{% tab title="Production Setup (AWS)" %}
These are required variables that are specific to the [aws-setup.md](aws-setup.md "mention").

| Argument                    | Description                                                                                                                                                           |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--validator.type`          | Set to the `aws` literal.                                                                                                                                             |
| `--validator.id`            | <p>The alias of your validator's AWS KMS key, prefixed with <code>alias/</code>.<br><em>Example:</em> <code>alias/hyperlane-validator-signer-${chain_name}</code></p> |
| `--validator.region`        | <p>The region of your AWS KMS key.<br><em>Example:</em> <code>us-east-1</code>.</p>                                                                                   |
| `--checkpointSyncer.type`   | Set to `s3`.                                                                                                                                                          |
| `--checkpointSyncer.bucket` | The AWS S3 bucket name.                                                                                                                                               |
| `--checkpointSyncer.region` | <p>The region of your AWS S3 bucket.<br><em>Example:</em> <code>us-east-1</code>.</p>                                                                                 |

| Environment variable    | Description                                             |
| ----------------------- | ------------------------------------------------------- |
| `AWS_ACCESS_KEY_ID`     | The access key ID of your validator's AWS IAM user.     |
| `AWS_SECRET_ACCESS_KEY` | The secret access key of your validator's AWS IAM user. |
{% endtab %}
{% endtabs %}

## Installation

The recommended installation method for a production environment is using a Docker image.

{% tabs %}
{% tab title="Docker" %}
### Docker image

To download the docker image, run:

{% code overflow="wrap" %}
```bash
docker pull gcr.io/abacus-labs-dev/hyperlane-agent:497db63-20230614-174455
```
{% endcode %}
{% endtab %}

{% tab title="Source" %}
### Building from source

First, clone the repo

```sh
git clone git@github.com:hyperlane-xyz/hyperlane-monorepo.git
```

And then follow the [setup instructions](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/rust/README.md#setup) in the `rust` directory
{% endtab %}
{% endtabs %}

## Start Validating

### Running multiple validators

We encourage folks to validate on as many chains as they are interested in supporting. We recommend that resources are not shared between validator instances.

### Running the binary

Refer to the [#installation](setup.md#installation "mention") instructions to access the validator binary.

[#configuration](setup.md#configuration "mention") can be placed in a `validator.env` file, for example:

{% code title="validator.env" overflow="wrap" %}
```sh
# These are example values to roughly illustrate
# what a .env file should look like

HYP_BASE_ORIGINCHAINNAME=ethereum
HYP_BASE_REORGPERIOD=20
# ...
# ...
```
{% endcode %}

To run the validator binary with the environment variables specified in `validator.env`:

{% tabs %}
{% tab title="Using Docker" %}
Find the latest [Docker image](broken-reference) and set it to the environment variable `$DOCKER_IMAGE`.

Using the `--env-file` flag, we can pass in the environment variables to the validator:

{% code overflow="wrap" %}
```sh
docker run -it --env-file validator.env $DOCKER_IMAGE ./validator
```
{% endcode %}

{% hint style="info" %}
If you're specifying a path to your own config file in the `CONFIG_FILES` environment variable, check out the [#config-files-with-docker](../agent-configuration/#config-files-with-docker "mention") section.
{% endhint %}

{% hint style="info" %}
If you're running with a [#local-setup](setup.md#local-setup "mention") validator on the same machine, which requires a locally ran relayer to be able to access these validator signatures, be sure to [mount](https://docs.docker.com/storage/bind-mounts/) your local validator's signature directory on your host machine into your Docker container.

For example, if your local validator is writing signatures to `/tmp/hyperlane-validator-signatures-ethereum`, you should mount a directory for the Docker container. This is the same directory set in the `$HYP_BASE_CHECKPOINTSYNCER_PATH` environment variable.&#x20;

If the command below fails with `docker: invalid reference format`, the whitespaces may have been malformed and you should remove them from the command.

{% code overflow="wrap" %}
```sh
docker run \
    -it \
    --env-file validator.env \
    --mount type=bind,source="$(pwd)"/hyperlane-validator-signatures-ethereum,target=/tmp/hyperlane-validator-signatures-ethereum \
    # you can pass multiple `--mount` flags to mount several directories
    $DOCKER_IMAGE \
    ./validator
```
{% endcode %}
{% endhint %}
{% endtab %}

{% tab title="Without Docker" %}
See these instructions for [building from source](broken-reference).

Using `env` and `xargs`, we can run the built binary from within the `hyperlane-monorepo/rust` directory with the environment variables found in `validator.env`:

{% code overflow="wrap" %}
```sh
env $(cat validator.env | grep -v "#" | xargs) ./target/release/validator
```
{% endcode %}
{% endtab %}
{% endtabs %}

If everything is configured correctly, you should see json files being written to your S3 bucket (if you followed the [aws-setup.md](aws-setup.md "mention")) or to your local signatures directory (if you followed the [#local-setup](setup.md#local-setup "mention")). New json files get written every time a new outbound message is inserted into the [messaging.md](../../protocol/messaging.md "mention").

## Announcing your validator

[relayer.md](../../protocol/agents/relayer.md "mention") need to know where to find your validator's signatures. Your validator will automatically attempt to announce itself by writing to the `ValidatorAnnounce` contract on the chain that you're validating.&#x20;

To do this, your validator must have a small amount of tokens to pay for the gas for this transaction.

If your validator has not yet announced itself, and does not have enough tokens to pay for gas, it will log a message specifying how many tokens are needed.
