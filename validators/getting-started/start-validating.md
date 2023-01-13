---
description: Run your validator
---

# Start validating

### Recommended machine size

2 CPU + 2Gb RAM should be sufficient

### Monitoring and alerting

Validators expose metrics on the port number specified in the environment variable `HYP_BASE_METRICS`. Port `9090` is recommended, though any valid port can be chosen.

We also provide a mostly-ready-to-go grafana dashboard to get you started, you can find the source and instructions for importing it under [tools/grafana](https://github.com/abacus-network/abacus-monorepo/tree/main/tools/grafana). If you want to use your own, the `hyperlane_latest_checkpoint` is the most critical metric in both the `phase="validator_observed"` and `phase="validator_processed"` dimension. It should gradually increase and the two should never really be out of sync.

### Running multiple validators

We encourage folks to validate on as many chains as they are interested in supporting. We recommend that resources are not shared between validator instances.&#x20;

### Running the binary

You can run the validator binary by compiling the code directly, or using a docker image provided by Abacus Works.

The validator can be run directly via  `cargo run --bin validator` in the `rust` folder of the [monorepo](https://github.com/abacus-network/abacus-monorepo).

Alternatively, the docker image can be run via `docker run -it gcr.io/abacus-labs-dev/hyperlane-agent:sha-6f9ce82 ./validator`.

{% hint style="warning" %}
Note due to the rebranding away from Abacus to Hyperlane, all environment variables that were previously prefixed with `ABC_` have been changed to use the prefix `HYP_`. If you previously operated a validator with the old environment variable prefix, be sure to change environment variable names before upgrading to the latest image / commit.
{% endhint %}

If everything is configured correctly, you should see json files being written to your S3 bucket.

### Share your signatures

[Relayers](../../protocol/agents/relayer.md) need to know where to find your validator's signatures. Copy your URL by navigating to your S3 bucket in the AWS console, selecting the `checkpoint_latest_index.json` object, and clicking "Copy URL".

Please reach out on #validators on [Discord](https://discord.gg/hyperlane) when you are ready to be added to the validator set.

