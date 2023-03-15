---
description: Getting the relayer binary
---

# Installation

The recommended installation method for a production environment is using a Docker image.

## Docker image

The latest Docker image can be found at:

{% code overflow="wrap" %}
```
gcr.io/abacus-labs-dev/hyperlane-agent:1cbe5fd-20230309-202035
```
{% endcode %}

To pull the image, run:

{% code overflow="wrap" %}
```
docker pull gcr.io/abacus-labs-dev/hyperlane-agent:1cbe5fd-20230309-202035
```
{% endcode %}

The relayer binary is found at `./relayer`:

{% code overflow="wrap" %}
```
docker run -it gcr.io/abacus-labs-dev/hyperlane-agent:1cbe5fd-20230309-202035 ./relayer
```
{% endcode %}

## Building from source

First, follow the setup instructions found here: [https://github.com/hyperlane-xyz/hyperlane-monorepo#rust](https://github.com/hyperlane-xyz/hyperlane-monorepo#rust).

```sh
# Clone the repo
git clone git@github.com:hyperlane-xyz/hyperlane-monorepo.git

# cd into the rust directory
cd ./hyperlane-monorepo/rust

# Build the release version of the relayer
cargo build --release --bin relayer

# The relayer binary is found at `./target/release/relayer`:
./target/release/relayer
```
