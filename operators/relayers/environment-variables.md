---
description: Configure your relayer
---

# Environment variables

Your relayer takes as configuration the following environment variables:

| Environment variable                           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CONFIG_FILES`                                 | <p>A comma-separated list of paths for the config files to use. Generally, you will want to use the <a href="https://github.com/hyperlane-xyz/hyperlane-monorepo/tree/main/rust/config">base config file</a> for a given environment which is stored at either <code>./config/testnet3/testnet3_config.json</code> or <code>./config/mainnet2/mainnet2_config.json</code></p><p></p><p>If you want support your own chain that you <a href="broken-reference">permissionlessly deployed</a>, you specify the path to that agent config file here as well.</p> |
| `HYP_BASE_METRICS`                             | Set to `9090`, or any other port number you wish to expose Prometheus metrics on. Not specifying a value will result in metrics not being exposed.                                                                                                                                                                                                                                                                                                                                                                                                            |
| `HYP_BASE_TRACING_LEVEL`                       | Specifies the log level, set to `info`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `HYP_BASE_CHAINS_[chain_name]_CONNECTION_URL`  | <p>An RPC url for <code>chain_name</code>, e.g. <code>HYP_BASE_CHAINS_ETHEREUM_CONNECTION_URL</code><br><br><strong>Relayers must set multiple connection URLs, one for the origin chain and one for each destination chain.</strong><br><strong></strong></p>                                                                                                                                                                                                                                                                                                |
| `HYP_BASE_CHAINS_[chain name]_SIGNER_KEY`      | <p>A hexadecimal private key used to sign transactions for <code>chain_name</code>, e.g. <code>HYP_BASE_SIGNERS_ETHEREUM_KEY</code><br><br><strong>Relayers must set one signing key for each destination chain.</strong></p>                                                                                                                                                                                                                                                                                                                                 |
| `HYP_BASE_CHAINS_[chain name]_SIGNER_TYPE`     | Set to `hexKey`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `HYP_RELAYER_ORIGINCHAINNAME`                  | The name of the origin chain to relay messages from (e.g. `ethereum`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `HYP_RELAYER_DESTINATIONCHAINNAMES`            | Comma separated names of the destination chains to relay messages to (e.g. `polygon,avalanche`)                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `HYP_RELAYER_WHITELIST`                        | <p>An optional whitelist. The relayer will only relay messages that match this whitelist. <br><br>See <a data-mention href="message-filtering.md">message-filtering.md</a>for more info.<br></p>                                                                                                                                                                                                                                                                                                                                                              |
| `HYP_RELAYER_BLACKLIST`                        | <p>An optional blacklist. The relayer will not relay messages that match this blacklist. <br><br>See <a data-mention href="message-filtering.md">message-filtering.md</a>for more info.</p>                                                                                                                                                                                                                                                                                                                                                                   |
| `HYP_RELAYER_GASPAYMENTENFORCEMENTPOLICY_TYPE` | Set to `none`. The relayer will process all messages that fit the filtering criteria.                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
