import { coreEnvironments, chainMetadata } from "@hyperlane-xyz/sdk";

import { markdownTable } from "markdown-table";

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function generateTable(contract, addresses) {
  const entries = Object.entries(addresses).map(([network, contracts]) => {
    const explorer = chainMetadata[network].blockExplorers[0].url;
    const url = new URL(explorer);
    const entries = Object.entries(contracts)
      .filter(([candidate]) => candidate === contract)
      .map(([_, addressObject]) => {
        const address = addressObject.proxy ?? addressObject;
        return [capitalize(network), `\`${address}\``, `[\`${url.hostname}/${address.slice(0, 4)}...\`](${explorer}/address/${address})`]
      })[0];
    return entries;
  });
  return markdownTable([
    ["Network", "Address", "Explorer"], 
    ...entries
  ]);
}

const enviroments = [
  'mainnet',
  'testnet',
]
const contracts = [
  "mailbox",
  "interchainGasPaymaster",
  "multisigIsm",
  "defaultIsmInterchainGasPaymaster",
  "interchainQueryRouter",
  "interchainAccountRouter",
  "create2Factory",
];

console.log(`---
description: Hyperlane core contract addresses
---

# Contract addresses

{% tabs %}
`);
for (const env of enviroments) {
  console.log(`{% tab title="${capitalize(env)}" %}`);
  for (const contract of contracts) {
    console.log(`## ${capitalize(contract)}\n`);
    console.log(generateTable(contract, coreEnvironments[env]));
    console.log("\n");
  }
  console.log("{% endtab %}");  
}
console.log("{% endtabs %}");
