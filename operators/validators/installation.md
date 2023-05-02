---
description: Getting the validator binary
---

# Installation

The recommended installation method for a production environment is using a Docker image.

## Docker image

To run the validator in docker, run:

{% code overflow="wrap" %}
```bash
docker run -it gcr.io/abacus-labs-dev/hyperlane-agent:debafb9-20230414-183521 ./validator
```
{% endcode %}

## Building from source

First, clone the repo

```sh
git clone git@github.com:hyperlane-xyz/hyperlane-monorepo.git
```

And then follow the [setup instructions](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/rust/README.md#setup) in the `rust` directory

### Next

Now that you have a way to run the validator, continue to the setup.

{% content-ref url="setup/" %}
[setup](setup/)
{% endcontent-ref %}
