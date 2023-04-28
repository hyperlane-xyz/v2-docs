import {
  MultiProvider,
  defaultMultisigIsmConfigs,
  hyperlaneEnvironments,
  chainMetadata,
} from "@hyperlane-xyz/sdk";

import {
  Mailbox__factory,
  ValidatorAnnounce__factory,
} from "@hyperlane-xyz/core";

import { markdownTable } from "markdown-table";

const homepages = {
  dsrv: "https://www.dsrvlabs.com/",
  abacus: "https://www.hyperlane.xyz/crew",
  everstake: "https://everstake.one/",
  "zee prime": "https://zeeprime.capital/",
  staked: "https://staked.us/",
  zkv: "https://zkvalidator.com/",
};

// TODO: add to storage modality
export const multisigConfigNames = {
  celo: {
    names: ["abacus", "dsrv", "everstake", "zee prime", "staked", "zkv"],
  },
  ethereum: {
    names: ["abacus", "dsrv", "everstake", "zee prime", "staked", "zkv"],
  },
  avalanche: {
    names: ["abacus", "dsrv", "everstake", "zee prime", "staked", "zkv"],
  },
  polygon: {
    names: ["abacus", "dsrv", "everstake", "zee prime", "staked", "zkv"],
  },
  bsc: {
    names: ["abacus", "dsrv", "everstake", "zee prime", "staked", "zkv"],
  },
  arbitrum: {
    names: ["abacus", "dsrv", "everstake", "zee prime", "staked", "ZKV"],
  },
  optimism: {
    names: ["abacus", "dsrv", "everstake", "zee prime", "staked", "ZKV"],
  },
  moonbeam: {
    names: ["abacus", "dsrv", "everstake", "staked"],
  },
  gnosis: {
    names: ["abacus", "dsrv", "everstake", "staked"],
  },
};

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

console.log(`---
description: Mailbox default security settings
---

# Mailbox default security settings
`);

const multiProvider = new MultiProvider();

const environments = ["mainnet"];
for (const env of environments) {
  const addresses = hyperlaneEnvironments[env];

  const networks = Object.keys(addresses);

  for (const network of networks) {
    const config = defaultMultisigIsmConfigs[network];

    console.log(`## ${capitalize(network)}\n`);

    const contracts = addresses[network];
    const provider = multiProvider.getProvider(network);

    const validatorAnnounce = ValidatorAnnounce__factory.connect(
      contracts.validatorAnnounce,
      provider
    );

    const names = multisigConfigNames[network].names;

    const storageLocations =
      await validatorAnnounce.getAnnouncedStorageLocations(config.validators);

    const storageUrls = storageLocations.map((sl) => {
      const [modality, , bucket, region] = sl[0].split("/");
      if (!modality.includes("s3")) {
        throw new Error("Unknown modality");
      }
      const url = `https://${bucket}.s3.${region}.amazonaws.com`;
      return url;
    });

    const validatorEntries = [
      ["Validator", "Address", "Storage Location"],
      ...config.validators.map((address, i) => {
        const name = names[i];
        const homepage = homepages[name];
        return [`[${name}](${homepage})`, `\`${address}\``, `[View on S3](${storageUrls[i]})`];
      }),
    ];

    console.log(`### Validators\n`);
    console.log(markdownTable(validatorEntries));
    console.log();

    let ismEntries = [
      ["Destination", "Threshold", "Address", "View on Explorer"],
    ];
    for (const remote of networks.filter((n) => n !== network)) {
      const remoteProvider = multiProvider.getProvider(remote);

      const mailbox = Mailbox__factory.connect(
        addresses[remote].mailbox,
        remoteProvider
      );
      const ism = await mailbox.defaultIsm();

      const explorer = chainMetadata[remote].blockExplorers[0].url;
      const url = new URL(explorer);

      ismEntries.push([
        capitalize(remote),
        `${config.threshold} / ${config.validators.length}`,
        `\`${ism}\``,
        `[View on ${url.hostname}](${explorer}/address/${ism})`,
      ]);
    }

    console.log(`### Multisig ISM\n`);
    console.log(markdownTable(ismEntries));
    console.log();
  }
}
