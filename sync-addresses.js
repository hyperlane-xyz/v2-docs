import { hyperlaneEnvironments, chainMetadata } from "@hyperlane-xyz/sdk";

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
        return [
          capitalize(network),
          `\`${address}\``,
          `[View on ${url.hostname}](${explorer}/address/${address})`,
        ];
      })[0];
    return entries;
  });

  return markdownTable([
    ["Network", "Address", "Explorer"],
    ...entries.filter((x) => x),
  ]);
}

const enviroments = ["mainnet", "testnet"];
const contracts = [
  { name: "mailbox" },
  {
    name: "defaultIsmInterchainGasPaymaster",
    subtitle:
      "Read about this [here](../build-with-hyperlane/guides/developers/paying-for-interchain-gas/which-igp-to-use-and-understanding-gas-amounts.md#when-using-the-default-ism-for-most-applications)",
  },
  {
    name: "interchainGasPaymaster",
    subtitle:
      "Advanced use - [read here](../build-with-hyperlane/guides/developers/paying-for-interchain-gas/which-igp-to-use-and-understanding-gas-amounts.md#when-using-a-custom-ism-advanced)",
  },
  { name: "multisigIsm" },
  { name: "interchainQueryRouter" },
  { name: "interchainAccountRouter" },
  { name: "validatorAnnounce" },
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
    console.log(`### ${capitalize(contract.name)}\n`);
    if (contract.subtitle) {
      console.log(`${contract.subtitle}`);
    }
    console.log(generateTable(contract.name, hyperlaneEnvironments[env]));
    console.log("\n");
  }
  console.log("{% endtab %}");
}
console.log("{% endtabs %}");
