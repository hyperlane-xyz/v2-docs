# Running with docker compose

Sometimes it is nice to not rely on long docker commands. Running with docker compose is very similar to using raw docker and you can find a full specification of the format in the [docker docs](https://docs.docker.com/compose/compose-file/).

This is an example docker-compose file for running a validator that should get you most of the way.

{% code title="ethereum_validator.json" %}
```json
{
  "chains": {
    "ethereum": {
      "connection": {
        "type": "httpQuorum",
        "urls": "https://node1.com,https://node2.com,https://node3.com"
      }
    }
  },
  "originchainname": "ethereum",
  "validator": {
    "id": "alias/validator-signer-ethereum",
    "type": "aws",
    "region": "us-east-1"
  },
  "checkpointsyncer": {
    "bucket": "signatures-ethereum",
    "region": "us-east-1",
    "type": "s3"
  },
  "reorgperiod": 1,
  "interval": 30,
  "metrics": "9090"
}
```
{% endcode %}

{% code title="compose.yml" %}
```yaml
services:
  ethereum-validator:
    image: gcr.io/abacus-labs-dev/hyperlane-agent:497db63-20230614-174455
    command: ./validator
    ports:
      - "9090:9090/tcp"
    environment:
      CONFIG_FILES: /ethereum_validator.json
      AWS_ACCESS_KEY: somesecretkey
      AWS_SECRET_ACCESS_KEY: somesecretkey
    configs:
      - ethereum_validator.json
configs:
  ethereum_validator.json:
    file: ./ethereum_validator.json
```
{% endcode %}

The above has a lot of filler values, you will of course need to update those with real ones.

You can also specify multiple services, so if you are running several validators, you can specify each one under `services`.

To run the compose configuration use `docker compose up` and `docker compose down` to clean up after. Full documentation on the command line can be found on the [docker website](https://docs.docker.com/engine/reference/commandline/compose/).
