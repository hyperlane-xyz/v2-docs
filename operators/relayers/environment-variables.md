---
description: Configure your relayer
---

# Configuration

Also take a look at the [agent-configuration](../agent-configuration/ "mention") page and the [configuration-reference.md](../agent-configuration/configuration-reference.md "mention") for a full list of configuration possibilities. **The list below is not complete,** however it should be enough to get started.

Your relayer takes as configuration the following environment variables:

| Environment variable                          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CONFIG_FILES`                                | If you want to add additional configuration files (such as those in `hyperlane-monorepo/rust/config`) you can add additional paths here as a comma separated list. These files must be accessible within the filesystem your agent has access to. If you're running in Docker, see [#config-files-with-docker](../agent-configuration/#config-files-with-docker "mention") for tips on mounting your config files into your Docker container.               |
| `HYP_BASE_CHAINS_[chain_name]_CONNECTION_URL` | <p>An RPC url for <code>chain_name</code>.<br><em>Example:</em> <code>HYP_BASE_CHAINS_ETHEREUM_CONNECTION_URL=http://localhost:8545</code><br><br><strong>Relayers must set multiple connection URLs, one for the origin chain and one for each destination chain.</strong><br></p>                                                                                                                                                                         |
| `HYP_BASE_ORIGINCHAINNAME`                    | <p>The name of the origin chain to relay messages from.</p><p><em>Example:</em> <code>ethereum</code></p>                                                                                                                                                                                                                                                                                                                                                   |
| `HYP_BASE_DB`                                 | <p>Path to the database. Defaults to <code>./hyperlane_db</code>.<br><br>If you are using docker you should mount this directory to avoid needing to re-index on restart.</p>                                                                                                                                                                                                                                                                               |
| `HYP_BASE_DESTINATIONCHAINNAMES`              | <p>Comma separated names of the destination chains to relay messages to.<br><em>Example:</em> <code>polygon,avalanche</code></p>                                                                                                                                                                                                                                                                                                                            |
| `HYP_BASE_WHITELIST`                          | <p>An optional whitelist. The relayer will only relay messages that match this whitelist.<br><br>See <a data-mention href="message-filtering.md">message-filtering.md</a>for more info.<br></p>                                                                                                                                                                                                                                                             |
| `HYP_BASE_BLACKLIST`                          | <p>An optional blacklist. The relayer will not relay messages that match this blacklist.<br><br>See <a data-mention href="message-filtering.md">message-filtering.md</a>for more info.</p>                                                                                                                                                                                                                                                                  |
| `HYP_BASE_ALLOWLOCALCHECKPOINTSYNCERS`        | <p>If true, this will allow the relayer to look for validator signatures on the relayer's local filesystem.<br>In a production environment, this should be <code>false</code>.<br>If you're running a validator on the same machine by following the validator <a data-mention href="../validators/setup/local-setup.md">local-setup.md</a> instructions, set this to <code>true</code> so that your relayer can access the local validator signatures.</p> |

#### Key-specific environment variables

These **required** environment variables differ depending on which [setup.md](setup.md "mention") instructions you followed.

{% tabs %}
{% tab title="Hexadecimal keys" %}
If you created [hexadecimal-key-setup.md](../agent-keys/hexadecimal-key-setup.md "mention"), use these environment variables.

| Environment variable                       | Description                                                                                                                                                                                                                                        |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `HYP_BASE_CHAINS_[chain name]_SIGNER_TYPE` | <p>Set to <code>hexKey</code>.</p><p><br><strong>Relayers must set this for each destination chain.</strong><br><em>Example:</em> <code>HYP_BASE_CHAINS_POLYGON_SIGNER_TYPE=hexKey</code></p>                                                      |
| `HYP_BASE_CHAINS_[chain name]_SIGNER_KEY`  | <p>A hexadecimal private key used to sign transactions for <code>chain_name</code>.<br><br><strong>Relayers must set this for each destination chain.</strong><br><em>Example:</em> <code>HYP_BASE_SIGNERS_POLYGON_SIGNER_KEY=123...def</code></p> |
{% endtab %}

{% tab title="AWS KMS keys" %}
If you created [aws-setup.md](../agent-keys/aws-setup.md "mention"), use these environment variables.

| Environment variable                         | Description                                                                                                                                                                                                                                                                   |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `HYP_BASE_CHAINS_[chain name]_SIGNER_TYPE`   | <p>Set to <code>aws</code>.</p><p><br><strong>Relayers must set this for each destination chain.</strong><br><em>Example:</em> <code>HYP_BASE_CHAINS_POLYGON_SIGNER_TYPE=aws</code></p>                                                                                       |
| `HYP_BASE_CHAINS_[chain name]_SIGNER_ID`     | <p>The alias of your validator's AWS KMS key, prefixed with <code>alias/</code>.<br><br><strong>Relayers must set this for each destination chain.</strong><br><em>Example:</em> <code>HYP_BASE_SIGNERS_POLYGON_SIGNER_ID=alias/hyperlane-validator-signer-polygon</code></p> |
| `HYP_BASE_CHAINS_[chain name]_SIGNER_REGION` | <p>The region of your AWS KMS key.<br><br><strong>Relayers must set this for each destination chain.</strong><br><code>HYP_BASE_SIGNERS_POLYGON_SIGNER_REGION=us-east-1</code></p>                                                                                            |
| `AWS_ACCESS_KEY_ID`                          | The access key ID of your relayer's AWS IAM user.                                                                                                                                                                                                                             |
| `AWS_SECRET_ACCESS_KEY`                      | The secret access key of your relayer's AWS IAM user.                                                                                                                                                                                                                         |
{% endtab %}
{% endtabs %}

### Next

After setting up the configuration, if you want to specify which messages are relayed, take a look at [message-filtering.md](message-filtering.md "mention"), otherwise:

{% content-ref url="start-validating.md" %}
[start-validating.md](start-validating.md)
{% endcontent-ref %}
