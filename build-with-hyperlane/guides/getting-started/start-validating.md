---
description: Run your validator
---

# Start validating

### Recommended machine size

2 CPU + 2Gb RAM should be sufficient

### Monitoring and alerting

Validators expose metrics on the port number specified in the environment variable `HYP_BASE_METRICS`. Port `9090` is recommended, though any valid port can be chosen.

We also provide a mostly-ready-to-go grafana dashboard to get you started, you can find the source and instructions for importing it under [tools/grafana](https://github.com/hyperlane-xyz/hyperlane-monorepo/tree/main/tools/grafana). If you want to use your own, the `hyperlane_latest_checkpoint` is the most critical metric in both the `phase="validator_observed"` and `phase="validator_processed"` dimension. It should gradually increase and the two should never really be out of sync.

### Running multiple validators

We encourage folks to validate on as many chains as they are interested in supporting. We recommend that resources are not shared between validator instances.&#x20;

### Running the binary

You can run the validator binary by compiling the code directly, or using a docker image provided by Abacus Works.

The validator can be run directly via  `cargo run --bin validator` in the `rust` folder of the [monorepo](https://github.com/hyperlane-xyz/hyperlane-monorepo).

Alternatively, the docker image can be run via `docker run -it gcr.io/abacus-labs-dev/hyperlane-agent:sha-6f9ce82 ./validator`.

{% hint style="warning" %}
Note due to the rebranding away from Abacus to Hyperlane, all environment variables that were previously prefixed with `ABC_` have been changed to use the prefix `HYP_`. If you previously operated a validator with the old environment variable prefix, be sure to change environment variable names before upgrading to the latest image / commit.
{% endhint %}

If everything is configured correctly, you should see json files being written to your S3 bucket.

### Announce your validator

[Relayers](../../../protocol/agents/relayer.md) need to know where to find your validator's signatures. You can make relayers aware of your validator by writing to the `ValidatorAnnounce` contract on the chain that you're validating.

First, find the signed announcement JSON object written by your validator by navigating to your S3 bucket in the AWS console, selecting the `announcement.json` object, and clicking on the "Object URL".

You should see a JSON object that looks like this:

```json
{
  "value": {
    "validator": "0xe6072396568e73ce6803b12b7e04164e839f1e54",
    "mailbox_address": "0x000000000000000000000000cc737a94fecaec165abcf12ded095bb13f037685",
    "mailbox_domain": 44787,
    "storage_location": "s3://hyperlane-testnet3-alfajores-validator-0/us-east-1"
  },
  "signature": {
    "r": "0xe8bdb71521ca4737a30eb4f8c12094768b1c0cc5f9405e879d91066bff5cf02c",
    "s": "0x1f41b8b6edfc7a1c5ffd0d3a216b2b56c5796b5a00cb686f896dac325d8cfa61",
    "v": 28
  }
}
```

Then, navigate to the `ValidatorAnnounce` page on etherscan for your chain. You can find a link in [addresses.md](../../../resources/addresses.md "mention").

Click on the "Contract" tab, and the "Write Contract" button, and click the dropdown on "announce".

Fill in the `_validator`, `_storageLocation`, and `_signature` arguments.

* Set `_validator` to `value.validator` from your JSON announcement
* Set `_storageLocation` to `value.storage_location` from your JSON announcement
* Set `_signature` to the concatenation of `signature.r`, `signature.s`, and the hexidecimal representation of `signature.v` (`0x1C` for 28 and `0x1B` for 27). Make sure that you remove the `0x` prefixes.

<figure><img src="../../../.gitbook/assets/Screen Shot 2023-01-30 at 4.30.00 PM.png" alt=""><figcaption><p>Example input</p></figcaption></figure>

Once you see that your transaction has succeeded, relayers will automatically be made aware of your validator!&#x20;

