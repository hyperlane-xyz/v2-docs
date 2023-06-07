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

### Environment variables

Your validator takes environment variables as configuration. See below for these environment variables & those that are specific to the setup instructions you followed.

| Environment variable                                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `CONFIG_FILES`                                       | If you're supporting your own chain that you [permissionlessly deployed](broken-reference/) (including a local testnet), you must specify a path to your own config file via this environment variable. You can add additional paths here as a comma separated list. These files must be accessible within the filesystem your agent has access to. If you're running in Docker, see [#config-files-with-docker](../agent-configuration/#config-files-with-docker "mention") for tips on mounting your config files into your Docker container.                                                                                                                                                              |
| `HYP_BASE_ORIGINCHAINNAME`                           | The name of the chain being validated (e.g. `ethereum`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `HYP_BASE_CHAINS_[origin chain name]_CONNECTION_URL` | <p>The RPC URL of the node for the chain you are validating. Notes:</p><ul><li>Polygon mainnet requires an RPC URL of an archive node (see <a data-mention href="./#an-rpc-node">#an-rpc-node</a>for details).<br>e.g. <code>HYP_BASE_CHAINS_ETHEREUM_CONNECTION_URL</code> or <code>HYP_BASE_CHAINS_POLYGON_CONNECTION_URL</code></li><li>If deploying via Docker and running a chain locally (e.g. anvil), you must use <code>http://host.docker.internal</code> as the host instead of <code>http://127.0.01</code> . See more details in <a href="https://stackoverflow.com/questions/24319662/from-inside-of-a-docker-container-how-do-i-connect-to-the-localhost-of-the-mach">this</a> post.</li></ul> |
| `HYP_BASE_REORGPERIOD`                               | <p>The number of block confirmations a validator should wait before signing the <code>Mailbox</code> merkle root. Note that signing a root that is later invalidated (i.e. due to a re-org) is considered fraudulent behavior and will eventually be slashable.<br>See <a data-mention href="../../resources/latencies.md">latencies.md</a></p>                                                                                                                                                                                                                                                                                                                                                              |

#### Setup-specific environment variables

These **required** environment variables differ based on which of the [#environments](setup.md#environments "mention") you set up.

{% tabs %}
{% tab title="Local setup" %}
These are required environment variables that are specific to the [#local-setup](setup.md#local-setup "mention").

| Environment variable             | Description                                                                                                                                                                                                                                                                                                     |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `HYP_BASE_VALIDATOR_TYPE`        | Set to the `hexKey` literal.                                                                                                                                                                                                                                                                                    |
| `HYP_BASE_VALIDATOR_KEY`         | Your validator's private key, which is used to sign merkle roots.                                                                                                                                                                                                                                               |
| `HYP_BASE_CHECKPOINTSYNCER_TYPE` | Set to `localStorage`.                                                                                                                                                                                                                                                                                          |
| `HYP_BASE_CHECKPOINTSYNCER_PATH` | <p>The path to your local directory where validator signatures will be written. This should be the value of <code>$MY_VALIDATOR_SIGNATURES_DIRECTORY</code> from the <a data-mention href="setup.md#local-setup">#local-setup</a>.</p><p>Example: <code>/tmp/hyperlane-validator-signatures-ethereum</code></p> |

{% hint style="warning" %}
Note that relayers **must** be configured with`HYP_BASE_ALLOWLOCALCHECKPOINTSYNCERS` to be able to read signatures from this validator.
{% endhint %}
{% endtab %}

{% tab title="Production setup (AWS)" %}
These are required environment variables that are specific to the [aws-setup.md](aws-setup.md "mention").

| Environment variable               | Description                                                                                                                                                           |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `HYP_BASE_VALIDATOR_TYPE`          | Set to the `aws` literal.                                                                                                                                             |
| `HYP_BASE_VALIDATOR_ID`            | <p>The alias of your validator's AWS KMS key, prefixed with <code>alias/</code>.<br><em>Example:</em> <code>alias/hyperlane-validator-signer-${chain_name}</code></p> |
| `HYP_BASE_VALIDATOR_REGION`        | <p>The region of your AWS KMS key.<br><em>Example:</em> <code>us-east-1</code>.</p>                                                                                   |
| `HYP_BASE_CHECKPOINTSYNCER_TYPE`   | Set to `s3`.                                                                                                                                                          |
| `HYP_BASE_CHECKPOINTSYNCER_BUCKET` | The AWS S3 bucket name.                                                                                                                                               |
| `HYP_BASE_CHECKPOINTSYNCER_REGION` | <p>The region of your AWS S3 bucket.<br><em>Example:</em> <code>us-east-1</code>.</p>                                                                                 |
| `AWS_ACCESS_KEY_ID`                | The access key ID of your validator's AWS IAM user.                                                                                                                   |
| `AWS_SECRET_ACCESS_KEY`            | The secret access key of your validator's AWS IAM user.                                                                                                               |
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
docker pull gcr.io/abacus-labs-dev/hyperlane-agent:debafb9-20230414-183521
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

[relayer.md](../../protocol/agents/relayer.md "mention") need to know where to find your validator's signatures. You can make relayers aware of your validator by writing to the `ValidatorAnnounce` contract on the chain that you're validating.

### Getting your validator's signed announcement

First, find the signed announcement JSON object automatically created by your validator. This is an attestation made by your validator indicating where its signatures can be found.

{% tabs %}
{% tab title="Local validators" %}
If you followed the [#local-setup](setup.md#local-setup "mention") instructions, you can find your signed announcement by running:

{% code overflow="wrap" %}
```sh
cat $HYP_VALIDATOR_CHECKPOINTSYNCER_PATH/announcement.json
```
{% endcode %}
{% endtab %}

{% tab title="AWS S3 validators" %}
If you followed the [aws-setup.md](aws-setup.md "mention") instructions, to find your signed announcement:

1. Navigate to your S3 bucket in the AWS console.
2. Select the `announcement.json` object.
3. Click on "Object URL"
{% endtab %}
{% endtabs %}

Your signed `announcement.json` should look something like this. Local validators will have a `storage_location` prefixed with `file://`.

```json
{
  "value": {
    "validator": "0xf43fbd072fd38e1121d4b3b0b8a35116bbb01ea9",
    "mailbox_address": "0x000000000000000000000000cc737a94fecaec165abcf12ded095bb13f037685",
    "mailbox_domain": 5,
    "storage_location": "s3://hyperlane-testnet3-goerli-validator-0/us-east-1"
  },
  "signature": {
    "r": "0x2c23ffdc7173019fe2255fddbfa027dc99d5812b7c6595303792efe145c7f2cb",
    "s": "0x229da4a683f4785a766cd8fce668741b78acaa7eed95eea9d09b14883de51b83",
    "v": 27
  },
  "serialized_signature": "0x2c23ffdc7173019fe2255fddbfa027dc99d5812b7c6595303792efe145c7f2cb229da4a683f4785a766cd8fce668741b78acaa7eed95eea9d09b14883de51b831b"
}
```

### Submitting your validator's announcement

Now you can submit your signed announcement to the `ValidatorAnnounce` smart contract. Instructions for doing this either with Etherscan or Cast are provided.

{% tabs %}
{% tab title="Etherscan" %}
1. Navigate to the `ValidatorAnnounce` page on etherscan for the chain you're validating. You can find a link in [addresses.md](../../resources/addresses.md "mention").
2. Click on the "Contract" tab, and the "Write Contract" button, and click the dropdown on "announce".
3. Fill in the `_validator`, `_storageLocation`, and `_signature` arguments.
   1. Set `_validator` to `value.validator` from your JSON announcement
   2. Set `_storageLocation` to `value.storage_location` from your JSON announcement
   3. Set `_signature` to the `serialized_signature` from your JSON announcement.
      1. Older validator versions don't have the `serialized_signature` field. If this is the case for your validator, consider upgrading your validator to the latest version, or you may instead specify the concatenation of `signature.r`, `signature.s`, and the hexadecimal representation of `signature.v` (`0x1C` for 28 and `0x1B` for 27). Make sure that you remove the `0x` prefixes.

<figure><img src="../../.gitbook/assets/Screen Shot 2023-01-30 at 4.30.00 PM.png" alt=""><figcaption><p>Example input</p></figcaption></figure>

4. Click "Write" and submit the transaction.
{% endtab %}

{% tab title="Cast (Foundry)" %}
1. Announce your validator by running the following command, filling in the following variables:
   1. Set `$VALIDATOR_ANNOUNCE_ADDRESS` to the address of the `ValidatorAnnounce` contract for your origin chain. You can find addresses for existing deployments here: [addresses.md](../../resources/addresses.md "mention")
   2. Set `$VALIDATOR` to `value.validator` from your JSON announcement
   3. Set `$STORAGE_LOCATION` to `value.storage_location` from your JSON announcement
   4. Set `$SIGNATURE` to the `serialized_signature` from your JSON announcement.
      1. Older validator versions don't have the `serialized_signature` field. If this is the case for your validator, consider upgrading your validator to the latest version, or you may instead specify the concatenation of `signature.r`, `signature.s`, and the hexadecimal representation of `signature.v` (`0x1C` for 28 and `0x1B` for 27). Make sure that you remove the `0x` prefixes.
   5. Set `$RPC_URL` to an RPC URL that can be used to submit transactions
   6. Set `$PRIVATE_KEY` to a hexadecimal private key that can be used to submit transactions

<pre class="language-bash"><code class="lang-bash"><strong>cast send $VALIDATOR_ANNOUNCE_ADDRESS \
</strong>  "announce(address, string calldata, bytes calldata)(bool)" \
  $VALIDATOR $STORAGE_LOCATION $SIGNATURE \
  --rpc-url $RPC_URL --private-key $PRIVATE_KEY
</code></pre>

{% hint style="info" %}
Some chains don't support EIP-1559, which is the default transaction mode used by cast. If `cast` gives an error along the lines of `custom error: EIP-1559 not activated`, try running the command again with the `--legacy` flag.
{% endhint %}
{% endtab %}
{% endtabs %}

Once you see that your transaction has succeeded, relayers will automatically be made aware of your validator! Your validator is now completely set up.
