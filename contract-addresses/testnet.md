# Testnet

Essentially taken from [https://github.com/abacus-network/abacus-monorepo/blob/main/typescript/sdk/src/core/environments/testnet.ts](https://github.com/abacus-network/abacus-monorepo/blob/main/typescript/sdk/src/core/environments/testnet.ts) and [https://github.com/abacus-network/abacus-monorepo/blob/main/typescript/sdk/src/domains.ts](https://github.com/abacus-network/abacus-monorepo/blob/main/typescript/sdk/src/domains.ts)

```json
[
  {
    origin: 'alfajores',
    domainId: 1000,
    abacusConnectionManager: '0x433f7d6d0cB9eb8FF2902Ad01C1BEd6C09934a33',
    interchainGasPayMaster: '0x28B02B97a850872C4D33C3E024fab6499ad96564',
    inboxes: [
      {
        remote: 'kovan',
        domainId: 3000,
        validatorManager: '0x1b33611fCc073aB0737011d5512EF673Bff74962',
        inbox: '0x783c4a0bB6663359281aD4a637D5af68F83ae213'
      },
      {
        remote: 'fuji',
        domainId: 43113,
        validatorManager: '0x66b71A4e18FbE09a6977A6520B47fEDdffA82a1c',
        inbox: '0xae7a78916Ba4c507aCB2F0e474ace545Ff4bF841'
      },
      {
        remote: 'mumbai',
        domainId: 80001,
        validatorManager: '0x04438ef7622f5412f82915F59caD4f704C61eA48',
        inbox: '0xFCc63b537e70652A280c4E7883C5BB5a1700e897'
      },
      {
        remote: 'bsctestnet',
        domainid: 1651715444,
        validatorManager: '0xb94F96D398eA5BAB5CA528EE9Fdc19afaA825818',
        inbox: '0x51A0a100e7BC63Ea7821A3a023B6F17fb94FF011'
      },
      {
        remote: 'arbitrumrinkeby',
        domainId: 1634872690,
        validatorManager: '0xB057Fb841027a8554521DcCdeC3c3474CaC99AB5',
        inbox: '0xe0B988062A0C6492177d64823Ab95a9c256c2a5F'
      },
      {
        remote: 'optimismkovan',
        domainId: 1869622635,
        validatorManager: '0xA2cf52064c921C11adCd83588CbEa08cc3bfF5d8',
        inbox: '0x628BC518ED1e0E8C6cbcD574EbA0ee29e7F6943E'
      }
    ]
  },
  {
    origin: 'kovan',
    domainId: 3000,
    abacusConnectionManager: '0xF7561c34f17A32D5620583A3397C304e7038a7F6',
    interchainGasPayMaster: '0x07009DA2249c388aD0f416a235AfE90D784e1aAc',
    inboxes: [
      {
        remote: 'alfajores',
        domainId: 1000,
        validatorManager: '0x5CE550e14B82a9F32A0aaF9eFc4Fce548D8A0B3e',
        inbox: '0x68311418D79fE8d96599384ED767d225635d88a8'
      },
      {
        remote: 'fuji',
        domainId: 43113,
        validatorManager: '0x863E8c26621c52ACa1849C53500606e73BA272F0',
        inbox: '0x6b1bb4ce664Bb4164AEB4d3D2E7DE7450DD8084C'
      },
      {
        remote: 'mumbai',
        domainId: 80001,
        validatorManager: '0xAb9B273366D794B7F80B4378bc8Aaca75C6178E2',
        inbox: '0x86fb9F1c124fB20ff130C41a79a432F770f67AFD'
      },
      {
        remote: 'bsctestnet',
        domainid: 1651715444,
        validatorManager: '0x19Be55D859368e02d7b9C00803Eb677BDC1359Bd',
        inbox: '0x5821f3B6eE05F3dC62b43B74AB1C8F8E6904b1C8'
      },
      {
        remote: 'arbitrumrinkeby',
        domainId: 1634872690,
        validatorManager: '0xc756cFc1b7d0d4646589EDf10eD54b201237F5e8',
        inbox: '0xD0680F80F4f947968206806C2598Cbc5b6FE5b03'
      },
      {
        remote: 'optimismkovan',
        domainId: 1869622635,
        validatorManager: '0x433f7d6d0cB9eb8FF2902Ad01C1BEd6C09934a33',
        inbox: '0x75f3E2a4f424401195A5E176246Ecc9f7e7680ff'
      }
    ]
  },
  {
    origin: 'fuji',
    domainId: 43113,
    abacusConnectionManager: '0xF7561c34f17A32D5620583A3397C304e7038a7F6',
    interchainGasPayMaster: '0x07009DA2249c388aD0f416a235AfE90D784e1aAc',
    inboxes: [
      {
        remote: 'alfajores',
        domainId: 1000,
        validatorManager: '0x5CE550e14B82a9F32A0aaF9eFc4Fce548D8A0B3e',
        inbox: '0x68311418D79fE8d96599384ED767d225635d88a8'
      },
      {
        remote: 'kovan',
        domainId: 3000,
        validatorManager: '0x863E8c26621c52ACa1849C53500606e73BA272F0',
        inbox: '0x6b1bb4ce664Bb4164AEB4d3D2E7DE7450DD8084C'
      },
      {
        remote: 'mumbai',
        domainId: 80001,
        validatorManager: '0xAb9B273366D794B7F80B4378bc8Aaca75C6178E2',
        inbox: '0x86fb9F1c124fB20ff130C41a79a432F770f67AFD'
      },
      {
        remote: 'bsctestnet',
        domainid: 1651715444,
        validatorManager: '0x19Be55D859368e02d7b9C00803Eb677BDC1359Bd',
        inbox: '0x5821f3B6eE05F3dC62b43B74AB1C8F8E6904b1C8'
      },
      {
        remote: 'arbitrumrinkeby',
        domainId: 1634872690,
        validatorManager: '0xc756cFc1b7d0d4646589EDf10eD54b201237F5e8',
        inbox: '0xD0680F80F4f947968206806C2598Cbc5b6FE5b03'
      },
      {
        remote: 'optimismkovan',
        domainId: 1869622635,
        validatorManager: '0x433f7d6d0cB9eb8FF2902Ad01C1BEd6C09934a33',
        inbox: '0x75f3E2a4f424401195A5E176246Ecc9f7e7680ff'
      }
    ]
  },
  {
    origin: 'mumbai',
    domainId: 80001,
    abacusConnectionManager: '0x46f7C5D896bbeC89bE1B19e4485e59b4Be49e9Cc',
    interchainGasPayMaster: '0xB08d78F439e55D02C398519eef61606A5926245F',
    inboxes: [
      {
        remote: 'alfajores',
        domainId: 1000,
        validatorManager: '0x304cAb315c93B87AAdb2B826A791b2c1Bf749996',
        inbox: '0x1D5EbC3e15e9ECDe0e3530C85899556797eeaea5'
      },
      {
        remote: 'kovan',
        domainId: 3000,
        validatorManager: '0xfc8d0D2E15A36f1A3F3aE3Cb127B706c1f23Aadc',
        inbox: '0x0526E47C49742C15F8817ef8cf0d8FFc72139D4F'
      },
      {
        remote: 'fuji',
        domainId: 43113,
        validatorManager: '0x666a24F62f7A97BA33c151776Eb3D9441a059eB8',
        inbox: '0xef48bd850E5827B96B55C4D28FB32Bbaa73616F2'
      },
      {
        remote: 'bsctestnet',
        domainid: 1651715444,
        validatorManager: '0x7914A3349107A7295Bbf2374db5A973d73D1b324',
        inbox: '0x3C5154a193D6e2955650f9305c8d80c18C814A68'
      },
      {
        remote: 'arbitrumrinkeby',
        domainId: 1634872690,
        validatorManager: '0x5d56B8a669F50193b54319442c6EEE5edD662381',
        inbox: '0x05Ea36Caee7d92C173334C9D97DcD39ABdCB2b69'
      },
      {
        remote: 'optimismkovan',
        domainId: 1869622635,
        validatorManager: '0x58483b754Abb1E8947BE63d6b95DF75b8249543A',
        inbox: '0x679Dc08cC3A4acFeea2f7CAFAa37561aE0b41Ce7'
      }
    ]
  },
  {
    origin: 'bsctestnet',
    domainid: 1651715444,
    abacusConnectionManager: '0xC2E36cd6e32e194EE11f15D9273B64461A4D49A2',
    interchainGasPayMaster: '0x44b764045BfDC68517e10e783E69B376cef196B2',
    inboxes: [
      {
        remote: 'alfajores',
        domainId: 1000,
        validatorManager: '0x589C201a07c26b4725A4A829d772f24423da480B',
        inbox: '0xB08d78F439e55D02C398519eef61606A5926245F'
      },
      {
        remote: 'kovan',
        domainId: 3000,
        validatorManager: '0x833Dad7FF66884389D5F0cEcba446ffaa7d2837e',
        inbox: '0xD3d062a5dcBA85ae863618d4c264d2358300c283'
      },
      {
        remote: 'fuji',
        domainId: 43113,
        validatorManager: '0x7d498740A4572f2B5c6b0A1Ba9d1d9DbE207e89E',
        inbox: '0x7FE7EA170cf08A25C2ff315814D96D93C311E692'
      },
      {
        remote: 'mumbai',
        domainId: 80001,
        validatorManager: '0xF7F0DaB0BECE4498dAc7eb616e288809D4499371',
        inbox: '0xfc8d0D2E15A36f1A3F3aE3Cb127B706c1f23Aadc'
      },
      {
        remote: 'arbitrumrinkeby',
        domainId: 1634872690,
        validatorManager: '0xd785272D240B07719e417622cbd2cfA0E584d1bd',
        inbox: '0x666a24F62f7A97BA33c151776Eb3D9441a059eB8'
      },
      {
        remote: 'optimismkovan',
        domainId: 1869622635,
        validatorManager: '0x598facE78a4302f11E3de0bee1894Da0b2Cb71F8',
        inbox: '0x7914A3349107A7295Bbf2374db5A973d73D1b324'
      }
    ]
  },
  {
    origin: 'arbitrumrinkeby',
    domainId: 1634872690,
    abacusConnectionManager: '0xC2E36cd6e32e194EE11f15D9273B64461A4D49A2',
    interchainGasPayMaster: '0x44b764045BfDC68517e10e783E69B376cef196B2',
    inboxes: [
      {
        remote: 'alfajores',
        domainId: 1000,
        validatorManager: '0x589C201a07c26b4725A4A829d772f24423da480B',
        inbox: '0xB08d78F439e55D02C398519eef61606A5926245F'
      },
      {
        remote: 'kovan',
        domainId: 3000,
        validatorManager: '0x833Dad7FF66884389D5F0cEcba446ffaa7d2837e',
        inbox: '0xD3d062a5dcBA85ae863618d4c264d2358300c283'
      },
      {
        remote: 'fuji',
        domainId: 43113,
        validatorManager: '0x7d498740A4572f2B5c6b0A1Ba9d1d9DbE207e89E',
        inbox: '0x7FE7EA170cf08A25C2ff315814D96D93C311E692'
      },
      {
        remote: 'mumbai',
        domainId: 80001,
        validatorManager: '0xF7F0DaB0BECE4498dAc7eb616e288809D4499371',
        inbox: '0xfc8d0D2E15A36f1A3F3aE3Cb127B706c1f23Aadc'
      },
      {
        remote: 'bsctestnet',
        domainid: 1651715444,
        validatorManager: '0xd785272D240B07719e417622cbd2cfA0E584d1bd',
        inbox: '0x666a24F62f7A97BA33c151776Eb3D9441a059eB8'
      },
      {
        remote: 'optimismkovan',
        domainId: 1869622635,
        validatorManager: '0x598facE78a4302f11E3de0bee1894Da0b2Cb71F8',
        inbox: '0x7914A3349107A7295Bbf2374db5A973d73D1b324'
      }
    ]
  },
  {
    origin: 'optimismkovan',
    domainId: 1869622635,
    abacusConnectionManager: '0xC2E36cd6e32e194EE11f15D9273B64461A4D49A2',
    interchainGasPayMaster: '0x44b764045BfDC68517e10e783E69B376cef196B2',
    inboxes: [
      {
        remote: 'alfajores',
        domainId: 1000,
        validatorManager: '0x589C201a07c26b4725A4A829d772f24423da480B',
        inbox: '0xB08d78F439e55D02C398519eef61606A5926245F'
      },
      {
        remote: 'kovan',
        domainId: 3000,
        validatorManager: '0x833Dad7FF66884389D5F0cEcba446ffaa7d2837e',
        inbox: '0xD3d062a5dcBA85ae863618d4c264d2358300c283'
      },
      {
        remote: 'fuji',
        domainId: 43113,
        validatorManager: '0x7d498740A4572f2B5c6b0A1Ba9d1d9DbE207e89E',
        inbox: '0x7FE7EA170cf08A25C2ff315814D96D93C311E692'
      },
      {
        remote: 'mumbai',
        domainId: 80001,
        validatorManager: '0xF7F0DaB0BECE4498dAc7eb616e288809D4499371',
        inbox: '0xfc8d0D2E15A36f1A3F3aE3Cb127B706c1f23Aadc'
      },
      {
        remote: 'bsctestnet',
        domainid: 1651715444,
        validatorManager: '0xd785272D240B07719e417622cbd2cfA0E584d1bd',
        inbox: '0x666a24F62f7A97BA33c151776Eb3D9441a059eB8'
      },
      {
        remote: 'arbitrumrinkeby',
        domainId: 1634872690,
        validatorManager: '0x598facE78a4302f11E3de0bee1894Da0b2Cb71F8',
        inbox: '0x7914A3349107A7295Bbf2374db5A973d73D1b324'
      }
    ]
  }
]
```

&#x20;
