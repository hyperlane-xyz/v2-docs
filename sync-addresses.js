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

// Liquidity layer is not yet in the SDK
const extraContracts = ["liquidityLayer"];
const extraAddresses = {
  mainnet: {
    ethereum: {
      liquidityLayer: "0x9954A0d5C9ac7e4a3687f9B08c0FF272f9d0dc71",
    },
    avalanche: {
      liquidityLayer: "0xEff8C988b9F9f606059c436F5C1Cc431571C8B03",
    },
  },
  testnet: {
    goerli: {
      liquidityLayer: "0x2abe0860D81FB4242C748132bD69D125D88eaE26",
    },
    fuji: {
      liquidityLayer: "0x2abe0860D81FB4242C748132bD69D125D88eaE26",
    },
    mumbai: {
      liquidityLayer: "0x2abe0860D81FB4242C748132bD69D125D88eaE26",
    },
    bsctestnet: {
      liquidityLayer: "0x2abe0860D81FB4242C748132bD69D125D88eaE26",
    },
    alfajores: {
      liquidityLayer: "0x2abe0860D81FB4242C748132bD69D125D88eaE26",
    },
  },
};

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

  for (const contract of extraContracts) {
    console.log(`### ${capitalize(contract)}\n`);
    console.log(generateTable(contract, extraAddresses[env]));
    console.log("\n");
  }

  console.log("{% endtab %}");
}
console.log("{% endtabs %}");
