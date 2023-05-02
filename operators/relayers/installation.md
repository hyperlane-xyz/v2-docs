---
description: Getting the relayer binary
---

# Installation

The recommended installation method for a production environment is using a Docker image.

## Docker image

To run the relayer in docker, run:

{% code overflow="wrap" %}
```bash
docker run -it gcr.io/abacus-labs-dev/hyperlane-agent:40cc4a6-20230420-080111 ./relayer
```
{% endcode %}

## Building from source

First, clone the repo

```sh
git clone git@github.com:hyperlane-xyz/hyperlane-monorepo.git
```

And then follow the [setup instructions](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/rust/README.md#setup) in the `rust` directory

### Next

Now that you have a way to run the relayer, continue to the setup.

{% content-ref url="setup.md" %}
[setup.md](setup.md)
{% endcontent-ref %}
