---
description: Run your relayer
---

# Start relaying

### Recommended machine size

2 CPU + 2Gb RAM + 10Gb disk should be sufficient

### Monitoring and alerting

Coming soon™️

### Running the binary

You can run the relayer binary by compiling the code directly, or using a docker image provided by Abacus Works.

The validator can be run directly via  `cargo run --bin relayer` in the `rust` folder of the [monorepo](https://github.com/hyperlane-xyz/hyperlane-monorepo).

Alternatively, the docker image can be run via `docker run -it gcr.io/abacus-labs-dev/hyperlane-agent:2023-02-01 ./relayer`.

