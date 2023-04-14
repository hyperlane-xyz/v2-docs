---
description: Run your relayer
---

# Start relaying

### Recommended machine size

2 CPU + 2Gb RAM + 10Gb disk should be sufficient

### Monitoring and alerting

Coming soon™️

### Running the binary

Refer to the [installation.md](installation.md "mention") instructions to access the relayer binary.

[environment-variables.md](environment-variables.md "mention") can be placed in a `relayer.env` file, for example:

{% code title="relayer.env" overflow="wrap" %}
```sh
# These are example values to roughly illustrate
# what a .env file should look like

HYP_RELAYER_ORIGINCHAINNAME=ethereum
HYP_RELAYER_DESTINATIONCHAINNAMES=polygon,avalanche
# Note that the single quotes pose issues when using Docker's --env-file
# flag, so they must be removed
HYP_RELAYER_GASENFORCEMENTPOLICY='[["type":"none"}]'
# ...
# ...
```
{% endcode %}

To run the relayer binary with the environment variables specified in `relayer.env`:

{% tabs %}
{% tab title="Using Docker" %}
Find the latest [#docker-image](installation.md#docker-image "mention")and set it to the environment variable `$DOCKER_IMAGE`.

Using the `--env-file` flag, we can pass in the environment variables to the relayer:

{% code overflow="wrap" %}
```sh
docker run -it --env-file relayer.env $DOCKER_IMAGE ./relayer
```
{% endcode %}

{% hint style="info" %}
If you're supporting your own chain that via [Broken link](broken-reference "mention") and are specifying a path to your own config file in the `CONFIG_FILES` environment variable, check out [#config-files-with-docker](../agent-configuration/#config-files-with-docker "mention").
{% endhint %}

{% hint style="info" %}
If you're running validator with [local-setup.md](../validators/setup/local-setup.md "mention") on the same machine and want the relayer to access these validator signatures, be sure to [mount](https://docs.docker.com/storage/bind-mounts/) your local validator's signature directory into your relayer at the same path that you used when [announcing-your-validator.md](../validators/announcing-your-validator.md "mention").

For example, if your local validator is writing signatures to `/tmp/hyperlane-validator-signatures-ethereum`, you should mount that directory to the same path in the Docker container:

{% code overflow="wrap" %}
```sh
docker run -it --env-file relayer.env --mount type=bind,source=/tmp/hyperlane-validator-signatures-ethereum,target=/tmp/hyperlane-validator-signatures-ethereum,readonly $DOCKER_IMAGE ./relayer
```
{% endcode %}
{% endhint %}
{% endtab %}

{% tab title="Building from source" %}
See these instructions for [#building-from-source](installation.md#building-from-source "mention").

We can run the built binary from within the `hyperlane-monorepo/rust` directory with the environment variables found in `relayer.env`:

{% code overflow="wrap" %}
```sh
set -o allexport && source relayer.env && set +o allexport && ./target/release/relayer
```
{% endcode %}
{% endtab %}
{% endtabs %}

Relayers needs to index all historic messages for the origin chain. This information is stored in a local database on disk (set with `db` in the config). This means running a relayer for the first time will take some extra time to catch up with the current state.
