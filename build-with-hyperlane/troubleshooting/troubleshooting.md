---
description: Some common issues when running the off-chain agents
---

# Troubleshooting

#### missing field `name`

Most likely indicates that you have an environment variable that implies the existence of a chain, but said chain does not existing in the config files. Either you fat-fingered the ENV name (i.e. You meant to specify `HYP_BASE_CHAINS_GOERLI_CONNECTION_URL but specified HYP_BASE_CHAINS_GORLI_CONNECTION_URL`or you specified a new chain but forgot to include to load the respective config file.
