---
description: Getting the validator binary
---

# Installation

The recommended installation method for a production environment is using a Docker image.

## Docker image

The latest Docker image can be found at:

{% code overflow="wrap" %}
```
gcr.io/abacus-labs-dev/hyperlane-agent:a36e464-20230213-160309
```
{% endcode %}

To pull the image, run:

{% code overflow="wrap" %}
```
docker pull gcr.io/abacus-labs-dev/hyperlane-agent:a36e464-20230213-160309
```
{% endcode %}

The validator binary is found at `./validator`:

{% code overflow="wrap" %}
```
docker run -it gcr.io/abacus-labs-dev/hyperlane-agent:a36e464-20230213-160309 ./validator
```
{% endcode %}

## Building from source

First, follow the setup instructions found here: [https://github.com/hyperlane-xyz/hyperlane-monorepo#rust](https://github.com/hyperlane-xyz/hyperlane-monorepo#rust).

```sh
# Clone the repo
git clone git@github.com:hyperlane-xyz/hyperlane-monorepo.git

# cd into the rust directory
cd ./hyperlane-monorepo/rust

# Build the release version of the validator
cargo build --release --bin validator

# The validator binary is found at `./target/release/validator`:
./target/release/validator
```
