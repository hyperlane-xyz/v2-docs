---
description: All configuration
---

# Configuration reference

## CONFIG\_FILES

**Description:** (Env only) List of additional configuration file paths to load in order (such as those in `hyperlane-monorepo/rust/config`). They will be merged first to last, so if both the first one and the last one specify a specific config path, the value set in the last file listed will be used.

These files must be accessible within the filesystem your agent has access to. If you're running in Docker, see [#config-files-with-docker](./#config-files-with-docker "mention") for tips on mounting your config files into your Docker container.

**Optional:** Yes

**Agents:** All

**Type:** `string` (Comma separated list of file paths)

{% tabs %}
{% tab title="As Arg" %}
Not supported as an argument
{% endtab %}

{% tab title="As Env" %}
```bash
export CONFIG_FILES='./config/ethereum/my-config.json,./config/ethereum/my-validator-config.json'
```
{% endtab %}

{% tab title="As Config" %}
Not supported in configuration files
{% endtab %}
{% endtabs %}

## chains

**Description:** Configuration for each of the chains that must be used by an agent.

**Optional:** No

**Agents:** All

**Type:** `Map<string, ChainSetup (Object)>` (See `chains.*` for `ChainSetup` values)

{% tabs %}
{% tab title="As Arg" %}
```bash
--chains.${CHAIN_NAME}.*
```
{% endtab %}

{% tab title="As Env" %}
```bash
HYP_BASE_CHAINS_${CHAIN_NAME}_*
HYP_BASE_CHAINS_ETHEREUM_*
```
{% endtab %}

{% tab title="As Config" %}
```json
{
    "chains": {
        "<chain_name>": {},
        "ethereum": {}
    }
}
```
{% endtab %}
{% endtabs %}

## chains.\<chain\_name>.name <a href="#chains.chain_name.name" id="chains.chain_name.name"></a>

**Description:** Name of the domain. Allows specifying a different name for the domain than the chain's true name. This should _almost always_ be the same as `chain_name`.

**Requires:** Alignment with domain id if it is a known domain name.

**Optional:** No

**Agents:** All

**Type:** `string`

{% tabs %}
{% tab title="As Arg" %}
```sh
--chains.${CHAIN_NAME}.name $DOMAIN_NAME
--chains.ethereum.name ethereum
```
{% endtab %}

{% tab title="As Env" %}
```bash
HYP_BASE_CHAINS_${CHAIN_NAME}_NAME="$DOMAIN_NAME"
HYP_BASE_CHAINS_ETHEREUM_NAME="ethereum"
```
{% endtab %}

{% tab title="As Config" %}
```json
{
    "chains": {
        "<chain_name>": {
            "name": "<domain_name>"
        },
        "ethereum": {
            "name": "ethereum"
        }
    }
}
```
{% endtab %}
{% endtabs %}

## chains.\<chain\_name>.domain <a href="#chains.chain_name.domain" id="chains.chain_name.domain"></a>

**Description:** Hyperplane domain id to uniquely identify the domain. See also: [Domain Identifiers](../../resources/domains.md#mainnet).

**Requires:** Alignment with domain name if it is a known domain.

**Optional:** No

**Agents:** All

**Type:** `Numeric (string | number)`

{% tabs %}
{% tab title="As Arg" %}
```bash
--chains.${CHAIN_NAME}.domain $DOMAIN_ID
--chains.ethereum.domain 1
```
{% endtab %}

{% tab title="As Env" %}
```sh
export HYP_BASE_CHAINS_${CHAIN_NAME}_DOMAIN="$DOMAIN_NAME"
export HYP_BASE_CHAINS_ETHEREUM_DOMAIN=1
```
{% endtab %}

{% tab title="As Config" %}
```json
{
    "chains": {
        "<chain_name>": {
            "domain": "<domain_id>"
        },
        "ethereum": {
            "domain": 1
        }
    }
}
```
{% endtab %}
{% endtabs %}

## chains.\<chain\_name>.finalityBlocks <a href="#chains.chain_name.finalityblocks" id="chains.chain_name.finalityblocks"></a>

**Description:** Number of blocks to wait before considering the blockchain state to be final. See also [latencies](../../resources/latencies.md) for help choosing an appropriate finality.

**Optional:** Defaults to `0`

**Agents:** All

**Type:** `Numeric (string | number)`

{% tabs %}
{% tab title="As Arg" %}
```bash
--chains.${CHAIN_NAME}.finalityBlocks $FINALITY_BLOCKS
--chains.ethereum.finalityBlcoks 20
```
{% endtab %}

{% tab title="As Env" %}
```sh
export HYP_BASE_CHAINS_${CHAIN_NAME}_FINALITY_BLOCKS="$FINALITY_BLOCKS"
export HYP_BASE_CHAINS_ETHEREUM_FINALITY_BLOCKS=20
```
{% endtab %}

{% tab title="As Config" %}
```json
{
    "chains": {
        "<chain_name>": {
            "finalityBlocks": "<finality_blocks>"
        },
        "ethereum": {
            "finalityBlocks": 20
        }
    }
}
```
{% endtab %}
{% endtabs %}

## chains.\<chain\_name>.addresses.mailbox <a href="#chains.chain_name.addresses.mailbox" id="chains.chain_name.addresses.mailbox"></a>

**Description:** Address of the mailbox contract on the chain. See also [contract addresses](../../resources/addresses.md).

**Optional:** No

**Agents:** All

**Type:** `Hash (string)`

{% tabs %}
{% tab title="As Arg" %}
```bash
--chains.${CHAIN_NAME}.addresses.mailbox "$MAILBOX_ADDRESS"
--chains.ethereum.addresses.mailbox "0x35231d4c2D8B8ADcB5617A638A0c4548684c7C70"
```
{% endtab %}

{% tab title="As Env" %}
```sh
export HYP_BASE_CHAINS_${CHAIN_NAME}_ADDRESSES_MAILBOX="$MAILBOX_ADDRESS"
export HYP_BASE_CHAINS_ETHEREUM_ADDRESSES_MAILBOX="0x35231d4c2D8B8ADcB5617A638A0c4548684c7C70"
```
{% endtab %}

{% tab title="As Config" %}
```json
{
    "chains": {
        "<chain_name>": {
            "addresses": {
                "mailbox": "<mailbox_address>"
            }
        },
        "ethereum": {
            "addresses": {
                "mailbox": "0x35231d4c2D8B8ADcB5617A638A0c4548684c7C70"
            }
        }
    }
}
```
{% endtab %}
{% endtabs %}

## chains.\<chain\_name>.addresses.interchainGasPaymaster <a href="#chains.chain_name.addresses.interchaingaspaymaster" id="chains.chain_name.addresses.interchaingaspaymaster"></a>

**Description:** Address of the interchain gas paymaster contract on the chain. See also [contract addresses](../../resources/addresses.md).

**Optional:** No

**Agents:** All

**Type:** `Hash (string)`

{% tabs %}
{% tab title="As Arg" %}
```bash
--chains.${CHAIN_NAME}.addresses.interchainGasPaymaster "$IGP_ADDRESS"
--chains.ethereum.addresses.interchainGasPaymaster "0x6cA0B6D22da47f091B7613223cD4BB03a2d77918"
```
{% endtab %}

{% tab title="As Env" %}
```sh
export HYP_BASE_CHAINS_${CHAIN_NAME}_ADDRESSES_INTERCHAIN_GAS_PAYMASTER="$IGP_ADDRESS"
export HYP_BASE_CHAINS_ETHEREUM_ADDRESSES_INTERCHAIN_GAS_PAYMASTER="0x6cA0B6D22da47f091B7613223cD4BB03a2d77918"
```
{% endtab %}

{% tab title="As Config" %}
```json
{
    "chains": {
        "<chain_name>": {
            "addresses": {
                "interchainGasPaymaster": "<igp_address>"
            }
        },
        "ethereum": {
            "addresses": {
                "interchainGasPaymaster": "0x6cA0B6D22da47f091B7613223cD4BB03a2d77918"
            }
        }
    }
}
```
{% endtab %}
{% endtabs %}

## chains.\<chain\_name>.addresses.validatorAnnounce <a href="#chains.chain_name.addresses.validatorannounce" id="chains.chain_name.addresses.validatorannounce"></a>

**Description:** Address of the validator announce contract on the chain. See also [contract addresses](../../resources/addresses.md).

**Optional:** No

**Agents:** All

**Type:** `Hash (string)`

{% tabs %}
{% tab title="As Arg" %}
```bash
--chains.${CHAIN_NAME}.addresses.validatorAnnounce "$VALIDATOR_ANNOUNCE_ADDRESS"
--chains.ethereum.addresses.validatorAnnounce "0x9bBdef63594D5FFc2f370Fe52115DdFFe97Bc524"
```
{% endtab %}

{% tab title="As Env" %}
```sh
export HYP_BASE_CHAINS_${CHAIN_NAME}_ADDRESSES_VALIDATOR_ANNOUNCE="$VALIDATOR_ANNOUNCE_ADDRESS"
export HYP_BASE_CHAINS_ETHEREUM_ADDRESSES_VALIDATOR_ANNOUNCE="0x9bBdef63594D5FFc2f370Fe52115DdFFe97Bc524"
```
{% endtab %}

{% tab title="As Config" %}
```json
{
    "chains": {
        "<chain_name>": {
            "addresses": {
                "validatorAnnounce": "<validator_announce_address>"
            }
        },
        "ethereum": {
            "addresses": {
                "validatorAnnounce": "0x9bBdef63594D5FFc2f370Fe52115DdFFe97Bc524"
            }
        }
    }
}
```
{% endtab %}
{% endtabs %}

## chains.\<chain\_name>.signer <a href="#chains.chain_name.signer" id="chains.chain_name.signer"></a>

**Description:** The signer that should be used this chain

**Optional:** Yes (Will use `defaultsigner` if not specified)

**Agents:** All

**Type:** `SignerConf (Object)`

{% tabs %}
{% tab title="As Arg" %}
```bash
--chains.${CHAIN_NAME}.signer.*
```
{% endtab %}

{% tab title="As Env" %}
```bash
HYP_BASE_CHAINS_${CHAIN_NAME}_SIGNER_*
```
{% endtab %}

{% tab title="As Config" %}
```json
{
    "chains": {
        "<chain_name>": {
            "signer": {}
        },
        "ethereum": {
            "signer": {}
        }
    }
}
```
{% endtab %}
{% endtabs %}

## chains.\<chain\_name>.signer.type <a href="#chains.chain_name.signer.type" id="chains.chain_name.signer.type"></a>

**Description:** The type of signer that is defined. A `HexKey` signer uses a private key, an `Aws` signer uses an AWS based KMS, and `Node` assumes the local node will sign RPC calls.

**Optional:** Yes; Defaults to `node` unless a `key` is specified in which case it defaults to `hexKey`

**Agents:** All

**Type:** `Enum ("hexKey" | "aws" | "node")`

{% tabs %}
{% tab title="As Arg" %}
```bash
--chains.${CHAIN_NAME}.signer.type hexKey
--chains.ethereum.signer.type node
```
{% endtab %}

{% tab title="As Env" %}
```bash
export HYP_BASE_CHAINS_${CHAIN_NAME}_SIGNER_TYPE="hexKey"
```
{% endtab %}

{% tab title="As Config" %}
```json
{
    "chains": {
        "<chain_name>": {
            "signer": {
                "type": "hexKey"
            }
        },
        "ethereum": {
            "signer": {
                "type": "node"
            }
        }
    }
}
```
{% endtab %}
{% endtabs %}

## chains.\<chain\_name>.signer.key <a href="#chains.chain_name.signer.key" id="chains.chain_name.signer.key"></a>

**Description:** A local hex key. The hex string of a private key.

**Requires:** `chains.<chain_name>.signer.type = "hexKey" | undefined`

**Optional:** No (iff requirements are met)

**Agents:** All

**Type:** `string`

{% tabs %}
{% tab title="As Arg" %}
```bash
--chains.${CHAIN_NAME}.signer.key "8166f546bab6da521a8369cab06c5d2b9e46670292d85c875ee9ec20e84ffb61"
```
{% endtab %}

{% tab title="As Env" %}
```bash
export HYP_BASE_CHAINS_${CHAIN_NAME}_SIGNER_KEY="8166f546bab6da521a8369cab06c5d2b9e46670292d85c875ee9ec20e84ffb61"
```
{% endtab %}

{% tab title="As Config" %}
```json
{
    "chains": {
        "<chain_name>": {
            "signer": {
                "key": "<key_in_hex>"
            }
        },
        "ethereum": {
            "signer": {
                "key": "8166f546bab6da521a8369cab06c5d2b9e46670292d85c875ee9ec20e84ffb61"
            }
        }
    }
}
```
{% endtab %}
{% endtabs %}

## chains.\<chain\_name>.signer.id <a href="#chains.chain_name.signer.id" id="chains.chain_name.signer.id"></a>

**Description:** The UUID identifying the AWS KMS key

**Requires:** `chains.<chain_name>.signer.type = "aws"`

**Optional:** No (iff requirements are met)

**Agents:** All

**Type:** `string`

{% tabs %}
{% tab title="As Arg" %}
```bash
--chains.ethereum.signer.type "alias/validator-signer-ethereum"
```
{% endtab %}

{% tab title="As Env" %}
```bash
export HYP_BASE_CHAINS_${CHAIN_NAME}_SIGNER_ID="alias/validator-signer-ethereum"
```
{% endtab %}

{% tab title="As Config" %}
```json
{
    "chains": {
        "ethereum": {
            "signer": {
                "type": "aws",
                "id": "alias/validator-signer-ethereum"
            }
        }
    }
}
```
{% endtab %}
{% endtabs %}

## chains.\<chain\_name>.signer.region <a href="#chains.chain_name.signer.region" id="chains.chain_name.signer.region"></a>

**Description:** The AWS region

**Requires:** `chains.<chain_name>.signer.type = "aws"`

**Optional:** No (iff requirements are met)

**Agents:** All

**Type:** `string`

{% tabs %}
{% tab title="As Arg" %}
```bash
--chains.${CHAIN_NAME}.signer.region us-east-1
```
{% endtab %}

{% tab title="As Env" %}
```bash
export HYP_BASE_CHAINS_${CHAIN_NAME}_SIGNER_REGION="us-east-1"
```
{% endtab %}

{% tab title="As Config" %}
```json
{
    "chains": {
        "<chain_name>": {
            "signer": {
                "type": "aws",
                "region": "us-east-1"
            }
        }
    }
}
```
{% endtab %}
{% endtabs %}

## chains.\<chain\_name>.protocol <a href="#chains.chain_name.protocol" id="chains.chain_name.protocol"></a>

**Description:** Connection protocol to use.

**Optional:** Defaults to `"ethereum"`

**Agents:** All

**Type:** `Enum ("ethereum" | "fuel")`

{% tabs %}
{% tab title="As Arg" %}
```bash
--chains.${CHAIN_NAME}.protocol ethereum
--chains.ethereum.protocol ethereum
```
{% endtab %}

{% tab title="As Env" %}
```sh
export HYP_BASE_CHAINS_${CHAIN_NAME}_PROTOCOL="ethereum"
export HYP_BASE_CHAINS_ARBITRUM_PROTOCOL="ethereum"
```
{% endtab %}

{% tab title="As Config" %}
```json
{
    "chains": {
        "<chain_name>": {
            "protocol": "<protocol>"
        },
        "arbitrum": {
            "protocol": "ethereum"
        }
    }
}
```
{% endtab %}
{% endtabs %}

## chains.\<chain\_name>.connectionType <a href="#chains.chain_name.connectiontype" id="chains.chain_name.connectiontype"></a>

**Description:** How to communicate with the provider

* `"http"` uses a basic http connection
* `"ws"` uses a basic websocket connection
* `"httpFallback"` will try the first URL and then automatically "fall back" on a connection or other provider failure to the next provider; this should only retry calls which fail due to the provider and not the call itself such; an insufficient gas error for instance would not fall back.
* `"httpQuorum"` requires a majority of the URLs to agree with the exception of submitting transactions; it will automatically coordinate the "latest" block if not specified to reduce sync errors.

**Requires:** `chains.<chain_name>.protocol = "ethereum" | undefined`

**Optional:** Defaults to `"http"`

**Agents:** All

**Type:** `Enum ("http", "ws", "httpFallback", "httpQuorum")`

{% tabs %}
{% tab title="As Arg" %}
```bash
--chains.${CHAIN_NAME}.connectionType http
```
{% endtab %}

{% tab title="As Env" %}
```sh
export HYP_BASE_CHAINS_${CHAIN_NAME}_CONNECTION_TYPE="url"
export HYP_BASE_CHAINS_ETHEREUM_CONNECTION_TYPE="httpFallback"
```
{% endtab %}

{% tab title="As Config" %}
```json
{
    "chains": {
        "<chain_name>": {
            "connectionType": "http"
        },
        "ethereum": {
            "connectionType": "httpFallback"
        }
    }
}
```
{% endtab %}
{% endtabs %}

## chains.\<chain\_name>.url <a href="#chains.chain_name.url" id="chains.chain_name.url"></a>

**Description:** Url to connect to

**Requires:**

```
((chains.<chain_name>.protocol = "ethereum" | undefined)
    AND (chains.<chain_name>.connectionType = "http" | "ws" | undefined)
) OR chains.<chain_name>.protocol = "fuel"
```

**Optional:** No (iff requirements are met)

**Agents:** All

**Type:** `string`

{% tabs %}
{% tab title="As Arg" %}
```bash
--chains.${CHAIN_NAME}.url "$CONNECTION_URL"
--chains.ethereum.url "http://127.0.0.1:8545"
```
{% endtab %}

{% tab title="As Env" %}
```sh
export HYP_BASE_CHAINS_${CHAIN_NAME}_URL="$CONNECTION_URL"
export HYP_BASE_CHAINS_ETHEREUM_URL="http://127.0.0.1:8545"
```
{% endtab %}

{% tab title="As Config" %}
```json
{
    "chains": {
        "<chain_name>": {
            "url": "<connection_url>"
        },
        "ethereum": {
            "url": "http://127.0.0.1:8545"
        }
    }
}
```
{% endtab %}
{% endtabs %}

## chains.\<chain\_name>.urls <a href="#chains.chain_name.urls" id="chains.chain_name.urls"></a>

**Description:**

**Requires:**

```
(chains.<chain_name>.protocol = "ethereum" | undefined)
    AND (chains.<chain_name>.connectionType = "httpFallback" | "httpQuorum")
```

**Optional:** No (iff requirements are met)

**Agents:**

**Type:** `string` (comma separated list of urls without spaces)

{% tabs %}
{% tab title="As Arg" %}
```bash
--chains.${CHAIN_NAME}.urls "$CONNECTION_URLS"
--chains.ethereum.urls "http://127.0.0.1:8545,http://127.0.0.1:8546,http://127.0.0.1:8547"
```
{% endtab %}

{% tab title="As Env" %}
```sh
export HYP_BASE_CHAINS_${CHAIN_NAME}_URLS="$CONNECTION_URLS"
export HYP_BASE_CHAINS_ETHEREUM_URLS="http://127.0.0.1:8545,http://127.0.0.1:8546,http://127.0.0.1:8547"
```
{% endtab %}

{% tab title="As Config" %}
```json
{
    "chains": {
        "<chain_name>": {
            "urls": "<connection_urls>"
        },
        "ethereum": {
            "urls": "http://127.0.0.1:8545,http://127.0.0.1:8546,http://127.0.0.1:8547"
        }
    }
}
```
{% endtab %}
{% endtabs %}

## chains.\<chain\_name>.index.from <a href="#chains.chain_name.index.from" id="chains.chain_name.index.from"></a>

**Description:** Height at which to start indexing contracts.

**Optional:** Defaults to `0`

**Agents:** Relayer & Scraper

**Type:** `Numeric (string | number)`

{% tabs %}
{% tab title="As Arg" %}
```bash
--chains.${CHAIN_NAME}.index.from 0
--chains.ethereum.index.from 16271503
```
{% endtab %}

{% tab title="As Env" %}
```sh
export HYP_BASE_CHAINS_${CHAIN_NAME}_INDEX_FROM=0
export HYP_BASE_CHAINS_ETHEREUM_INDEX_FROM=16271503
```
{% endtab %}

{% tab title="As Config" %}
```json
{
    "chains": {
        "<chain_name>": {
            "index": {
                "from": 0
            }
        },
        "ethereum": {
            "index": {
                "from": 16271503
            }
        }
    }
}
```
{% endtab %}
{% endtabs %}

## chains.\<chain\_name>.index.chunk <a href="#chains.chain_name.index.chunk" id="chains.chain_name.index.chunk"></a>

**Description:** Number of blocks to query at once when indexing contracts. Note that the configured providers must support whatever value is set. The default should work with nearly all providers.

**Optional:** Defaults to `1999`

**Agents:** Relayer & Scraper

**Type:** `Numeric (string | number)`

{% tabs %}
{% tab title="As Arg" %}
```bash
--chains.${CHAIN_NAME}.index.chunk 1999
--chains.ethereum.index.chunk 1999
```
{% endtab %}

{% tab title="As Env" %}
```sh
export HYP_BASE_CHAINS_${CHAIN_NAME}_INDEX_CHUNK=1999
export HYP_BASE_CHAINS_ETHEREUM_INDEX_CHUNK=1999
```
{% endtab %}

{% tab title="As Config" %}
```json
{
    "chains": {
        "<chain_name>": {
            "index": {
                "chunk": 1999
            }
        },
        "ethereum": {
            "index": {
                "chunk": 1999
            }
        }
    }
}
```
{% endtab %}
{% endtabs %}

## defaultsigner

**Description:** The default signer that should be used for all chains which did not specify their own.

**Optional:** Yes

**Agents:** All

**Type:** `SignerConf (Object)`

{% tabs %}
{% tab title="As Arg" %}
```
--defaultSigner.*
```
{% endtab %}

{% tab title="As Env" %}
```bash
HYP_BASE_DEFAULTSIGNER_*
```
{% endtab %}

{% tab title="As Config" %}
```json
{
    "defaultsigner": {}
}
```
{% endtab %}
{% endtabs %}

## defaultsigner.type

**Description:** The type of signer that is defined. A `HexKey` signer uses a private key, an `Aws` signer uses an AWS based KMS, and `Node` assumes the local node will sign RPC calls.

**Optional:** Yes; Defaults to `node` unless a `key` is specified in which case it defaults to `hexKey`

**Agents:** All

**Type:** `Enum ("hexKey" | "aws" | "node")`

{% tabs %}
{% tab title="As Arg" %}
```
--defaultSigner.type hexKey
```
{% endtab %}

{% tab title="As Env" %}
```bash
export HYP_BASE_DEFAULTSIGNER_TYPE="hexKey"
```
{% endtab %}

{% tab title="As Config" %}
```json
{
    "defaultsigner": {
        "type": "hexKey"
    }
}
```
{% endtab %}
{% endtabs %}

## defaultsigner.key

**Description:** A local hex key. The hex string of a private key.

**Requires:** `defaultsigner.type = "hexKey" | undefined`

**Optional:** No (iff requirements are met)

**Agents:** All

**Type:** `string`

{% tabs %}
{% tab title="As Arg" %}
```bash
--defaultSigner.key "8166f546bab6da521a8369cab06c5d2b9e46670292d85c875ee9ec20e84ffb61"
```
{% endtab %}

{% tab title="As Env" %}
```bash
export HYP_BASE_DEFAULTSIGNER_KEY="8166f546bab6da521a8369cab06c5d2b9e46670292d85c875ee9ec20e84ffb61"
```
{% endtab %}

{% tab title="As Config" %}
```json
{
    "defaultsigner": {
        "type": "hexKey",
        "key": "8166f546bab6da521a8369cab06c5d2b9e46670292d85c875ee9ec20e84ffb61"
    }
}
```
{% endtab %}
{% endtabs %}

## defaultsigner.id

**Description:** The UUID identifying the AWS KMS key

**Requires:** `defaultsigner.type = "aws"`

**Optional:** No (iff requirements are met)

**Agents:** All

**Type:** `string`

{% tabs %}
{% tab title="As Arg" %}
```bash
--defaultSigner.id "alias/validator-signer-ethereum"
```
{% endtab %}

{% tab title="As Env" %}
```bash
export HYP_BASE_DEFAULTSIGNER_ID="alias/validator-signer-ethereum"
```
{% endtab %}

{% tab title="As Config" %}
```json
{
    "defaultsigner": {
        "type": "aws",
        "id": "alias/validator-signer-ethereum"
    }
}
```
{% endtab %}
{% endtabs %}

## defaultsigner.region

**Description:** The AWS region

**Requires:** `defaultsigner.type = "aws"`

**Optional:** No (iff requirements are met)

**Agents:** All

**Type:** `string`

{% tabs %}
{% tab title="As Arg" %}
```bash
--defaultSigner.region us-east-1
```
{% endtab %}

{% tab title="As Env" %}
```bash
export HYP_BASE_DEFAULTSIGNER_REGION="us-east-1"
```
{% endtab %}

{% tab title="As Config" %}
```json
{
    "defaultsigner": {
        "type": "aws",
        "region": "us-east-1"
    }
}
```
{% endtab %}
{% endtabs %}

## metrics

**Description:** Port to expose prometheus metrics on

**Optional:** Defaults to `9090`

**Agents:** All

**Type:** `Numeric (string | number)`

{% tabs %}
{% tab title="As Arg" %}
```bash
--metrics 9090
```
{% endtab %}

{% tab title="As Env" %}
```sh
export HYP_BASE_METRICS=9090
```
{% endtab %}

{% tab title="As Config" %}
```json
{
    "metrics": 9090
}
```
{% endtab %}
{% endtabs %}

## tracing.fmt

**Description:** Configuration for the tracing module. This controls logging.

**Optional:** Defaults to `pretty`

**Agents:** All

**Type:** `Enum ("pretty" | "json" | "full" | "compact")`

{% tabs %}
{% tab title="As Arg" %}
```bash
--tracing.fmt pretty
```
{% endtab %}

{% tab title="As Env" %}
```bash
export HYP_BASE_TRACING_FMT="pretty"
```
{% endtab %}

{% tab title="As Config" %}
```json
{
    "tracing": {
        "fmt": "pretty"
    }
}
```
{% endtab %}
{% endtabs %}

## tracing.level

**Description:** Configuration for the tracing module. This controls logging.

**Optional:** Defaults to `info`

**Agents:** All

**Type:** `Enum ("trace" | "debug" | "info" | "warn" | "error" | "off")`

{% tabs %}
{% tab title="As Arg" %}
```bash
--tracing.level info
```
{% endtab %}

{% tab title="As Env" %}
```bash
HYP_BASE_TRACING_LEVEL="info"
```
{% endtab %}

{% tab title="As Config" %}
```json
{
    "tracing": {
        "level": "info"
    }
}
```
{% endtab %}
{% endtabs %}

## originchainname

**Description:** Name of the chain a validator should validate for and name of the chain a relayer should relayer messages from. **Deprecated for Relayers, use** [#relaychains](configuration-reference.md#relaychains "mention") **instead.**

**Optional:** No - Validators; Yes - Relayers

**Agents:** Validator & Relayer&#x20;

**Type:** `string`

{% tabs %}
{% tab title="As Arg" %}
```bash
--originChainName ethereum
```
{% endtab %}

{% tab title="As Env" %}
```sh
export HYP_BASE_ORIGINCHAINNAME="ethereum"
```
{% endtab %}

{% tab title="As Config" %}
```json
{
    "originchainname": "ethereum"
}
```
{% endtab %}
{% endtabs %}

## validator

**Description:** The signer that should be used by the validator.

**Optional:** Yes

**Agents:** All

**Type:** `SignerConf (Object)`

{% tabs %}
{% tab title="As Arg" %}
```bash
--validator.*
```
{% endtab %}

{% tab title="As Env" %}
```bash
HYP_BASE_VALIDATOR_*
```
{% endtab %}

{% tab title="As Config" %}
```json
{
    "validator": {}
}
```
{% endtab %}
{% endtabs %}

## validator.type

**Description:** The type of signer that is defined. A `HexKey` signer uses a private key, an `Aws` signer uses an AWS based KMS, and `Node` assumes the local node will sign RPC calls.

**Optional:** Yes; Defaults to `node` unless a `key` is specified in which case it defaults to `hexKey`

**Agents:** All

**Type:** `Enum ("hexKey" | "aws" | "node")`

{% tabs %}
{% tab title="As Arg" %}
```bash
--validator.type hexKey
```
{% endtab %}

{% tab title="As Env" %}
```bash
export HYP_BASE_VALIDATOR_TYPE="hexKey"
```
{% endtab %}

{% tab title="As Config" %}
```json
{
    "validator": {
        "type": "hexKey"
    }
}
```
{% endtab %}
{% endtabs %}

## validator.key

**Description:** A local hex key. The hex string of a private key.

**Requires:** `validator.type = "hexKey" | undefined`

**Optional:** No (iff requirements are met)

**Agents:** All

**Type:** `string`

{% tabs %}
{% tab title="As Arg" %}
```bash
--validator.key 8166f546bab6da521a8369cab06c5d2b9e46670292d85c875ee9ec20e84ffb61
```
{% endtab %}

{% tab title="As Env" %}
```bash
export HYP_BASE_VALIDATOR_KEY="8166f546bab6da521a8369cab06c5d2b9e46670292d85c875ee9ec20e84ffb61"
```
{% endtab %}

{% tab title="As Config" %}
```json
{
    "validator": {
        "type": "hexKey",
        "key": "8166f546bab6da521a8369cab06c5d2b9e46670292d85c875ee9ec20e84ffb61"
    }
}
```
{% endtab %}
{% endtabs %}

## validator.id

**Description:** The UUID identifying the AWS KMS key

**Requires:** `validator.type = "aws"`

**Optional:** No (iff requirements are met)

**Agents:** All

**Type:** `string`

{% tabs %}
{% tab title="As Arg" %}
```bash
--validator.id "alias/validator-signer-ethereum"
```
{% endtab %}

{% tab title="As Env" %}
```bash
export HYP_BASE_VALIDATOR_ID="alias/validator-signer-ethereum"
```
{% endtab %}

{% tab title="As Config" %}
```json
{
    "validator": {
        "type": "aws",
        "id": "alias/validator-signer-ethereum"
    }
}
```
{% endtab %}
{% endtabs %}

## validator.region

**Description:** The AWS region

**Requires:** `validator.type = "aws"`

**Optional:** No (iff requirements are met)

**Agents:** All

**Type:** `string`

{% tabs %}
{% tab title="As Arg" %}
```bash
--validator.region us-east-1
```
{% endtab %}

{% tab title="As Env" %}
```bash
export HYP_BASE_VALIDATOR_REGION="us-east-1"
```
{% endtab %}

{% tab title="As Config" %}
```json
{
    "validator": {
        "type": "aws",
        "region": "us-east-1"
    }
}
```
{% endtab %}
{% endtabs %}

## checkpointsyncer.type

**Description:** Defines the method of syncing checkpoints

**Optional:** No

**Agents:** Validator

**Type:** `Enum ("localStorage" | "s3")`

{% tabs %}
{% tab title="As Arg" %}
```bash
--checkpointSyncer.type localStorage
```
{% endtab %}

{% tab title="As Env" %}
```sh
export HYP_BASE_CHECKPOINTSYNCER_TYPE="localStorage"
```
{% endtab %}

{% tab title="As Config" %}
```json
{
    "checkpointsyncer": {
        "type": "localStorage"
    }
}
```
{% endtab %}
{% endtabs %}

## checkpointsyncer.path

**Description:** Path on the local disk of a local storage type checkpoint syncer configuration.

**Requires:** `checkpointsyncer.type = "localStorage"`

**Optional:** No (iff conditions are met)

**Agents:** Validator

**Type:** `string`

{% tabs %}
{% tab title="As Arg" %}
```bash
--checkpointSyncer.path "/tmp/syncer"
```
{% endtab %}

{% tab title="As Env" %}
```sh
export HYP_BASE_CHECKPOINTSYNCER_PATH="/tmp/syncer"
```
{% endtab %}

{% tab title="As Config" %}
```json
{
    "checkpointsyncer": {
        "type": "localStorage",
        "path": "/tmp/syncer"
    }
}
```
{% endtab %}
{% endtabs %}

## checkpointsyncer.bucket

**Description:** S3 bucket name

**Requires:** `checkpointsyncer.type = "s3"`

**Optional:** No (iff conditions are met)

**Agents:** Validator

**Type:** `string`

{% tabs %}
{% tab title="As Arg" %}
```bash
--checkpointSyncer.bucket signatures-ethereum
```
{% endtab %}

{% tab title="As Env" %}
```sh
export HYP_BASE_CHECKPOINTSYNCER_BUCKET="signatures-ethereum"
```
{% endtab %}

{% tab title="As Config" %}
```json
{
    "checkpointsyncer": {
        "type": "s3",
        "bucket": "signatures-ethereum"
    }
}
```
{% endtab %}
{% endtabs %}

## checkpointsyncer.region

**Description:** S3 bucket region

**Requires:** `checkpointsyncer.type = "s3"`

**Optional:** No (iff conditions are met)

**Agents:** Validator

**Type:** `string`

{% tabs %}
{% tab title="As Arg" %}
```bash
--checkpointSyncer.region us-east-1
```
{% endtab %}

{% tab title="As Env" %}
```sh
export HYP_BASE_CHECKPOINTSYNCER_REGION="us-east-1"
```
{% endtab %}

{% tab title="As Config" %}
```json
{
    "checkpointsyncer": {
        "type": "s3",
        "region": "us-east-1"
    }
}
```
{% endtab %}
{% endtabs %}

## interval

**Description:** How frequently to check for new checkpoints in seconds. See also [latencies](../../resources/latencies.md).

**Optional:** No

**Agents:** Validator

**Type:** `Numeric (string | number)`

{% tabs %}
{% tab title="As Arg" %}
```bash
--interval 30
```
{% endtab %}

{% tab title="As Env" %}
```sh
export HYP_BASE_INTERVAL=30
```
{% endtab %}

{% tab title="As Config" %}
```json
{
    "interval": 30
}
```
{% endtab %}
{% endtabs %}

## db

**Description:** This is a local filesystem path to where the agents store relevant data on disk. **This must be unique per agent!** Multiple agents must have different paths. The path is relative to the current working directory if it does not start with a system defined root path such as `/` on unix. When using docker images, ensure that this folder gets persisted across runs.

For the scraper, this is the connection string to a postgresql database.

**Optional:** For validators and relayers it is optional and defaults to a path in the current working directory which includes the `originchainname`. For the scraper it is required.

**Agents:** All

**Type:** `string`

{% tabs %}
{% tab title="As Arg" %}
```bash
# Validator
--db "/tmp/hyp/validator/ethereum-cache"

# Relayer
--db "/tmp/hyp/relayer/ethereum-cache"

# Scraper
--db "postgresql://postgres:password@localhost:5432/dbname"
```
{% endtab %}

{% tab title="As Env" %}
```sh
# Validator
export HYP_BASE_DB="/tmp/hyp/validator/ethereum-cache"

# Relayer
export HYP_BASE_DB="/tmp/hyp/relayer/ethereum-cache"

# Scraper
export HYP_BASE_DB="postgresql://postgres:password@localhost:5432/dbname"
```
{% endtab %}

{% tab title="As Config" %}
For the validator:

```json
{
    "db": "/tmp/hyp/validator/ethereum-cache"
}
```

For the relayer:

```json
{
    "db": "/tmp/hyp/relayer/ethereum-cache"
}
```

For the scraper:

```json
{
    "db": "postgresql://postgres:password@localhost:5432/dbname"
}
```
{% endtab %}
{% endtabs %}

## relaychains

**Description:** List of chains to deliver messages between.

**Optional:** No

**Agents:** Relayer

**Type:** `string` (comma separated list)

{% tabs %}
{% tab title="As Arg" %}
```bash
--relayChains "arbitrum,ethereum,bsc"
```
{% endtab %}

{% tab title="As Env" %}
```sh
export HYP_BASE_RELAYCHAINS="arbitrum,ethereum,bsc"
```
{% endtab %}

{% tab title="As Config" %}
```json
{
    "relaychains": "arbitrum,ethereum,bsc"
}
```
{% endtab %}
{% endtabs %}

## destinationchainnames

**Description:** List of chains to deliver messages to. **Deprecated, use** [#relaychains](configuration-reference.md#relaychains "mention") **instead.**

**Optional:** Yes

**Agents:** Relayer

**Type:** `string` (comma separated list)

{% tabs %}
{% tab title="As Arg" %}
```bash
--destinationChainNames "arbitrum,ethereum,bsc"
```
{% endtab %}

{% tab title="As Env" %}
```sh
export HYP_BASE_DESTINATIONCHAINNAMES="arbitrum,ethereum,bsc"
```
{% endtab %}

{% tab title="As Config" %}
```json
{
    "destinationchainnames": "arbitrum,ethereum,bsc"
}
```
{% endtab %}
{% endtabs %}

## gaspaymentenforcement

**Description:** JSON stringified array of gas payment enforcement configurations sorted by highest priority first. The last policy should be a catch-all and handle any messages that did not match a previous policy.

**Optional:** Defaults to no enforcement (`[{"type": "none"}]`)

**Agents:** Relayer

**Type:** `JSON (string)`

```typescript
type gaspaymentenforcement = Array<GasPaymentEnforcementPolicy>;

type GasPaymentEnforcementPolicy =
( // fields specific to each type...
    // No requirements - all messages are processed regardless of gas payment
    { type: "none" }
    // Messages that have paid a minimum amount will be processed
  & { type: "minimum", payment: U256 }
    // Required amount of gas on the foreign chain has been paid according
    // to on-chain fee quoting. `gasfraction` defaults to "1 / 2".
  & { type: "onChainFeeQuoting", gasfraction?: GasFraction }
) | { // all types have the following fields...
    // If a message matches, this policy will be used.
    // If no matching list is specified, all messages will match.
    matchingList?: MatchingList
};

// A list of matching rules. A message matches if any of the list
// elements matches the message.
type MatchingList = Array<MatchingListElement>;

// Matches a message if any of the provided values matches.
interface MatchingListElement {
    originDomain?: NumericFilter
    senderAddress?: HashFilter
    destinationDomain?: NumericFilter
    recipientAddress?: HashFilter
}

type NumericFilter = Wildcard | U32 | Array<U32>;
type HashFilter = Wildcard | H256 | Array<H256>;

// 32-bit unsigned integer
type U32 = number | string;
// 256-bit unsigned integer; Note: `number` type has limited precision.
type U256 = string | number;
// 256-bit hash (can also be less) encoded as hex
type H256 = string;
// Matches anything
type Wildcard = "*";
// A numeric string in the form `{numerator} / {denominator}`, e.g. "1 / 2"
type GasFraction = string;
```

{% tabs %}
{% tab title="As Arg" %}
```bash
--gasPaymentEnforcement '[{"type": "none", "matchingList": [{"senderAddress": "0xa441b15fe9a3cf56661190a0b93b9dec7d041272"}]}, {"type": "minimum", "payment": 100000}]'
```
{% endtab %}

{% tab title="As Env" %}
```sh
export HYP_BASE_GASPAYMENTENFORCEMENT='[{"type": "none", "matchingList": [{"senderAddress": "0xa441b15fe9a3cf56661190a0b93b9dec7d041272"}]}, {"type": "minimum", "payment": 100000}]'
```
{% endtab %}

{% tab title="As Config" %}
```json
{
    "gaspaymentenforcement": "[{\"type\": \"none\", \"matchingList\": [{\"senderAddress\": \"0xa441b15fe9a3cf56661190a0b93b9dec7d041272\"}]}, {\"type\": \"minimum\", \"payment\": 100000}]"
}
```
{% endtab %}
{% endtabs %}

## whitelist

**Description:** A matching list to define what messages should be allowed. Any messages which do not match this list will not be relayed. If no whitelist is supplied all messages will be allowed.

See also [message-filtering.md](../relayers/message-filtering.md "mention")

**Optional:** Yes

**Agents:** Relayer

**Type:** `JSON (string)`

<pre class="language-typescript"><code class="lang-typescript"><strong>type whitelist = MatchingList | undefined;
</strong>
// A list of matching rules. A message matches if any of the list
// elements matches the message.
type MatchingList = Array&#x3C;MatchingListElement>;

// Matches a message if any of the provided values matches.
interface MatchingListElement {
    originDomain?: NumericFilter
    senderAddress?: HashFilter
    destinationDomain?: NumericFilter
    recipientAddress?: HashFilter
}

type NumericFilter = Wildcard | U32 | Array&#x3C;U32>;
type HashFilter = Wildcard | H256 | Array&#x3C;H256>;

// 32-bit unsigned integer
type U32 = number | string;
// 256-bit hash (can also be less) encoded as hex
type H256 = string;
// Matches anything
type Wildcard = "*";
</code></pre>

{% tabs %}
{% tab title="As Arg" %}
```bash
--whitelist '[{"senderAddress": "0xa441b15fe9a3cf56661190a0b93b9dec7d041272", "originDomain": [1, 42]}, {"destinationDomain": 1}]'
```
{% endtab %}

{% tab title="As Env" %}
```sh
export HYP_BASE_WHITELIST='[{"senderAddress": "0xa441b15fe9a3cf56661190a0b93b9dec7d041272", "originDomain": [1, 42]}, {"destinationDomain": 1}]'
```
{% endtab %}

{% tab title="As Config" %}
```json
{
    "whitelist": "[{\"senderAddress\": \"0xa441b15fe9a3cf56661190a0b93b9dec7d041272\", \"originDomain\": [1, 42]}, {\"destinationDomain\": 1}]"
}
```
{% endtab %}
{% endtabs %}

## blacklist

**Description:** A matching list to define what messages should be ignored. Any messages which match this list will not be relayed. If no blacklist is supplied all messages will be allowed.

See also [message-filtering.md](../relayers/message-filtering.md "mention")

**Optional:** Yes

**Agents:** Relayer

**Type:** `JSON (string)`

```typescript
type blacklist = MatchingList | undefined;

// A list of matching rules. A message matches if any of the list
// elements matches the message.
type MatchingList = Array<MatchingListElement>;

// Matches a message if any of the provided values matches.
interface MatchingListElement {
    originDomain?: NumericFilter
    senderAddress?: HashFilter
    destinationDomain?: NumericFilter
    recipientAddress?: HashFilter
}

type NumericFilter = Wildcard | U32 | Array<U32>;
type HashFilter = Wildcard | H256 | Array<H256>;

// 32-bit unsigned integer
type U32 = number | string;
// 256-bit hash (can also be less) encoded as hex
type H256 = string;
// Matches anything
type Wildcard = "*";
```

{% tabs %}
{% tab title="As Arg" %}
```bash
--blacklist '[{"senderAddress": "0xa441b15fe9a3cf56661190a0b93b9dec7d041272", "originDomain": [1, 42]}, {"destinationDomain": 1}]'
```
{% endtab %}

{% tab title="As Env" %}
```sh
export HYP_BASE_BLACKLIST='[{"senderAddress": "0xa441b15fe9a3cf56661190a0b93b9dec7d041272", "originDomain": [1, 42]}, {"destinationDomain": 1}]'
```
{% endtab %}

{% tab title="As Config" %}
```json
{
    "blacklist": "[{\"senderAddress\": \"0xa441b15fe9a3cf56661190a0b93b9dec7d041272\", \"originDomain\": [1, 42]}, {\"destinationDomain\": 1}]"
}
```
{% endtab %}
{% endtabs %}

## transactiongaslimit

**Description:** The max allowable gas to relay a transaction.

**Optional:** Defaults to no limit

**Agents:** Relayer

**Type:** `Numeric (string | number)`

{% tabs %}
{% tab title="As Arg" %}
```bash
--transactionGasLimit 250000000
```
{% endtab %}

{% tab title="As Env" %}
```sh
export HYP_BASE_TRANSACTIONGASLIMIT="250000000"
```
{% endtab %}

{% tab title="As Config" %}
```json
{
    "transactiongaslimit": "250000000"
}
```
{% endtab %}
{% endtabs %}

## skiptransactiongaslimitfor

**Description:** List of domain ids to skip applying the `transactiongaslimit` for.

**Optional:** Defaults to using the `transactiongaslimit` for all domains

**Agents:** Relayer

**Type:** `string` (comma separated list of domain ids)

{% tabs %}
{% tab title="As Arg" %}
```bash
--skipTransactionGasLimitFor "43114,10,42220"
```
{% endtab %}

{% tab title="As Env" %}
```sh
export HYP_BASE_SKIPTRANSACTIONGASLIMITFOR="43114,10,42220"
```
{% endtab %}

{% tab title="As Config" %}
```json
{
    "skiptransactiongaslimitfor": "43114,10,42220"
}
```
{% endtab %}
{% endtabs %}

## allowlocalcheckpointsyncers

**Description:** Whether to allow local `checkpointsyncer` types, if `false` it will ignore them.

**Optional:** Defaults to `false`

**Agents:** Relayer

**Type:** `boolean`

{% tabs %}
{% tab title="As Arg" %}
```bash
--allowLocalCheckpointSyncers false
```
{% endtab %}

{% tab title="As Env" %}
```sh
export HYP_BASE_ALLOWLOCALCHECKPOINTSYNCERS=false
```
{% endtab %}

{% tab title="As Config" %}
```json
{
    "allowlocalcheckpointsyncers": false
}
```
{% endtab %}
{% endtabs %}

## AWS\_ACCESS\_KEY\_ID

**Description:** (Env only) The access key ID of your validator's AWS IAM user.

**Optional**: Required if any signer configuration uses `aws`

**Agents:** Relayer & Validator

**Type:** `string`

{% tabs %}
{% tab title="As Arg" %}
Not supported as an argument
{% endtab %}

{% tab title="As Env" %}
```bash
export AWS_ACCESS_KEY_ID="AKIAIOSFODNN7EXAMPLE"
```
{% endtab %}

{% tab title="As Config" %}
Not supported in configuration files
{% endtab %}
{% endtabs %}

## AWS\_SECRET\_ACCESS\_KEY

**Description:** (Env only) The secret access key of your validator's AWS IAM user.

**Optional:** Required if any signer configuration uses `aws`

**Agents:** Relayer & Validator

**Type:** `string`

{% tabs %}
{% tab title="As Arg" %}
Not supported as an argument
{% endtab %}

{% tab title="As Env" %}
```bash
export AWS_SECRET_ACCESS_KEY="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
```
{% endtab %}

{% tab title="As Config" %}
Not supported in configuration files
{% endtab %}
{% endtabs %}
