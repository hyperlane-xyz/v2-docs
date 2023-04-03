---
description: Configuring your signing key and where signatures are written
---

# Local setup

{% hint style="warning" %}
#### This guide is for testing purposes only!

This is intended to show how you can run a validator on your _**local machine**_, which is only for testing and development purposes. This also means that signatures from local validators are only able to be accessed by locally ran relayers.

For running a validator in a production environment, see the [aws-setup.md](aws-setup.md "mention") guide.
{% endhint %}

### Create a hexadecimal key for your validator to sign with

{% content-ref url="../../agent-keys/hexadecimal-key-setup.md" %}
[hexadecimal-key-setup.md](../../agent-keys/hexadecimal-key-setup.md)
{% endcontent-ref %}

### Create a local directory for your validator's signatures

When running a validator locally, your validator will write its signatures to a local directory. This directory can be named whatever you like, just remember to use this directory when setting your [environment-variables.md](../environment-variables.md "mention").

```sh
# Pick an informative name specific to the chain you're validating
MY_VALIDATOR_SIGNATURES_DIRECTORY=/tmp/hyperlane-validator-signatures-ethereum

# Create the directory
mkdir $MY_VALIDATOR_SIGNATURES_DIRECTORY
```

### Next

Continue to the [environment-variables.md](../environment-variables.md "mention") section.

{% content-ref url="../environment-variables.md" %}
[environment-variables.md](../environment-variables.md)
{% endcontent-ref %}
