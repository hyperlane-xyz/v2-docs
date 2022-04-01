---
description: The future of decentralized apps
---

# Interchain applications

Interchain applications send cross-chain messages to share state across the different blockchains on which they are deployed.

Developers can build and deploy interchain applications to reach users and assets on all Abacus supported chains, while presenting a single view of their application to end users. Users can interact with interchain applications from any Abacus supported chain.

To build an interchain application, developers must simply implement functions that send and receive cross-chain messages.

```solidity
contract Example {
  address public outbox;
  address public inbox;
  
  event MessageReceived(bytes message);
  
  modifier onlyInbox() {
    require(msg.sender == inbox, "!inbox");
    _;
  }
  
  constructor(address _outbox, address _inbox) {
    outbox = _outbox;
    inbox = _inbox;
  }
  
  function sendMessage(uint32 _destination, bytes32 _recipient) external {
    Outbox.dispatch(_destination, _recipient, "Hello World!");
  }

  function handle(
    uint32 _origin,
    bytes32 _sender,
    bytes memory _message
  ) external onlyInbox {
    emit MessageReceived(_message);
  }
}
```

Abacus provides a number of resources to assist developers in building and deploying interchain applications, including:

* The [`Router`](routers.md) pattern and mix-in contract
* An [SDK](../sdk.md) for testing, deploying, and interacting with interchain applications
* [Example](../examples/) applications that developers can reference
