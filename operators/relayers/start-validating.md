---
description: Run your relayer
---

# Start relaying

### Recommended machine size

2 CPU + 2Gb RAM + 10Gb disk should be sufficient

### Monitoring and alerting

Coming soon™️

### Running the binary

Refer to the [Installation](installation.md) instructions to access the relayer binary.

[Environment variables](environment-variables.md) can be placed in a `relayer.env` file, for example:

{% code title="relayer.env" overflow="wrap" %}
```sh
# These are example values to roughly illustrate
# what a .env file should look like

HYP_RELAYER_ORIGINCHAINNAME=ethereum
HYP_RELAYER_DESTINATIONCHAINNAMES=polygon,avalanche
HYP_RELAYER_GASENFORCEMENTPOLICY='[["type":"none"}]'
# ...
# ...
```
{% endcode %}

To run the relayer binary with the environment variables specified in `relayer.env`:

{% tabs %}
{% tab title="Using Docker" %}
Find the latest [Docker image](installation.md#docker-image) and set it to the environment variable `$DOCKER_IMAGE`.

Using the `--env-file` flag, we can pass in the environment variables to the relayer:

{% code overflow="wrap" %}
```sh
docker run -it --env-file relayer.env $DOCKER_IMAGE ./relayer
```
{% endcode %}

{% hint style="info" %}
If you're supporting your own chain that you [permissionlessly deployed](broken-reference) and are specifying a path to your own config file in the `CONFIG_FILES` environment variable, check out the [config files with Docker section](../agent-configuration.md#config-files-with-docker).
{% endhint %}

{% hint style="info" %}
If you're running a [locally set up validator](../validators/setup/local-setup.md) on the same machine and want the relayer to access these validator signatures, be sure to [mount](https://docs.docker.com/storage/bind-mounts/) your local validator's signature directory into your relayer at the same path that is [announced on chain](../validators/announcing-your-validator.md).

For example, if your local validator is writing signatures to `/tmp/hyperlane-validator-signatures-ethereum`, you should mount that directory to the same path in the Docker container:

{% code overflow="wrap" %}
```sh
docker run -it --env-file relayer.env --mount type=bind,source=/tmp/hyperlane-validator-signatures-ethereum,target=/tmp/hyperlane-validator-signatures-ethereum,readonly $DOCKER_IMAGE ./relayer
```
{% endcode %}
{% endhint %}
{% endtab %}

{% tab title="Building from source" %}
See these instructions for [building from source](installation.md#building-from-source).

We can run the built binary from within the `hyperlane-monorepo/rust` directory with the environment variables found in `relayer.env`:

{% code overflow="wrap" %}
```sh
set -o allexport && source relayer.env && set +o allexport && ./target/release/relayer
```
{% endcode %}
{% endtab %}
{% endtabs %}

Relayers needs to index all historic messages for the origin chain. This information is stored in a local database on disk (set with `db` in the config). This means running a relayer for the first time will take some extra time to catch up with the current state.
