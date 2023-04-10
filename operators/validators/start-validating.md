---
description: Run your validator
---

# Start validating

### Recommended machine size

1 CPU + 1GiB RAM is sufficient. Validators are very lightweight.

### Monitoring and alerting

Validators expose metrics on the port number specified in the environment variable `HYP_BASE_METRICS`. Port `9090` is recommended, though any valid port can be chosen.

We also provide a mostly-ready-to-go Grafana dashboard to get you started, you can find the source and instructions for importing it under [tools/grafana](https://github.com/hyperlane-xyz/hyperlane-monorepo/tree/main/tools/grafana). If you want to use your own, the `hyperlane_latest_checkpoint` is the most critical metric in both the `phase="validator_observed"` and `phase="validator_processed"` dimension. It should gradually increase and the two should never really be out of sync.

### Running multiple validators

We encourage folks to validate on as many chains as they are interested in supporting. We recommend that resources are not shared between validator instances.&#x20;

### Running the binary

Refer to the [installation.md](installation.md "mention") instructions to access the validator binary.

[environment-variables.md](environment-variables.md "mention") can be placed in a `validator.env` file, for example:

{% code title="validator.env" overflow="wrap" %}
```sh
# These are example values to roughly illustrate
# what a .env file should look like

HYP_VALIDATOR_ORIGINCHAINNAME=ethereum
HYP_VALIDATOR_REORGPERIOD=20
# ...
# ...
```
{% endcode %}

To run the validator binary with the environment variables specified in `validator.env`:

{% tabs %}
{% tab title="Using Docker" %}
Find the latest [Docker image](installation.md#docker-image) and set it to the environment variable `$DOCKER_IMAGE`.

Using the `--env-file` flag, we can pass in the environment variables to the validator:

{% code overflow="wrap" %}
```sh
docker run -it --env-file validator.env $DOCKER_IMAGE ./validator
```
{% endcode %}

{% hint style="info" %}
If you're supporting your own chain that you [permissionlessly deployed](broken-reference) and are specifying a path to your own config file in the `CONFIG_FILES` environment variable, check out the [config files with Docker section](../agent-configuration.md#config-files-with-docker).
{% endhint %}

{% hint style="info" %}
If you're running with a [local-setup.md](setup/local-setup.md "mention") validator on the same machine, which requires a locally ran relayer to be able to access these validator signatures, be sure to [mount](https://docs.docker.com/storage/bind-mounts/) your local validator's signature directory on your host machine into your Docker container.

For example, if your local validator is writing signatures to `/tmp/hyperlane-validator-signatures-ethereum`, you should mount that directory to the same path in the Docker container:

{% code overflow="wrap" %}
```sh
docker run -it --env-file validator.env --mount type=bind,source=/tmp/hyperlane-validator-signatures-ethereum,target=/tmp/hyperlane-validator-signatures-ethereum $DOCKER_IMAGE ./validator
```
{% endcode %}
{% endhint %}
{% endtab %}

{% tab title="Building from source" %}
See these instructions for [building from source](installation.md#building-from-source).

Using `env` and `xargs`, we can run the built binary from within the `hyperlane-monorepo/rust` directory with the environment variables found in `validator.env`:

{% code overflow="wrap" %}
```sh
env $(cat validator.env | grep -v "#" | xargs) ./target/release/validator
```
{% endcode %}
{% endtab %}
{% endtabs %}

If everything is configured correctly, you should see json files being written to your S3 bucket (if you followed the [aws-setup.md](setup/aws-setup.md "mention")) or to your local signatures directory (if you followed the [local-setup.md](setup/local-setup.md "mention")). New json files get written every time a new outbound message is inserted into the [messaging.md](../../protocol/messaging.md "mention").

### Next

You're not done yet! The final step is [announcing-your-validator.md](announcing-your-validator.md "mention"), which involves posting some information about your validator on chain.

{% content-ref url="announcing-your-validator.md" %}
[announcing-your-validator.md](announcing-your-validator.md)
{% endcontent-ref %}
