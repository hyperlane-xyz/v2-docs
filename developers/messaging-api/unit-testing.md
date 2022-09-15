---
description: Unit test your integration with mock Hyperlane contracts
---

# Unit testing

You can use the  `MockOutbox` and `MockInbox` contracts to unit test your integration with the Hyperlane messaging API.

You simply need to deploy the mock contracts in your test environment, and configure your application to send and receive messages using these mock contracts.

The `MockInbox` contract reflects the asynchronous nature of interchain messaging. In order to deliver a dispatched message to its recipient, you must call `MockInbox.processNextPendingMessage()`, as shown in the examples below.

{% tabs %}
{% tab title="Using Foundry" %}
```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import {MockInbox} from "../src/MockInbox.sol";
import {MockOutbox} from "../src/MockOutbox.sol";
import {TestRecipient} from "../src/TestRecipient.sol";

contract ContractTest is Test {
  MockOutbox outbox;
  MockInbox inbox;

  function setUp() public {
    inbox = new MockInbox();
    outbox = new MockOutbox(address(inbox));
  }

  function testExample() public {
    TestRecipient recipient = new TestRecipient();
    bytes memory data = "This is a test message";

    outbox.dispatch(1, addressToBytes32(address(recipient)), data);
    inbox.processNextPendingMessage();

    assertEq(recipient.data(), data);
  }

  function addressToBytes32(address _addr) internal pure returns (bytes32) {
    return bytes32(uint256(uint160(_addr)));
  }
}

```
{% endtab %}

{% tab title="Using Hardhat" %}
```typescript
describe("Abacus", function() {
  it("should be able to send a message", async function () {
    const MockInbox = await ethers.getContractFactory("MockInbox")
    const MockOutbox = await ethers.getContractFactory("MockOutbox")
    const TestRecipient = await ethers.getContractFactory("TestRecipient")

    const inbox = await MockInbox.deploy()
    const outbox = await MockOutbox.deploy(inbox.address)

    const recipient = await TestRecipient.deploy()
    const data = ethers.utils.toUtf8Bytes("This is a test message")
    
    await outbox.dispatch(1, addressToBytes32(recipient.address), data)
    await inbox.processNextPendingMessage()

    const dataReceived = await recipient.data()
    expect(dataReceived).to.eql(ethers.utils.hexlify(data))
  })
})
```
{% endtab %}
{% endtabs %}

### MockOutbox source

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import { MockInbox } from "./MockInbox.sol";

contract MockOutbox {
  MockInbox inbox;

  constructor(address _inbox) {
    inbox = MockInbox(_inbox);
  }

  function dispatch(
    uint32 _destinationDomain,
    bytes32 _recipientAddress,
    bytes calldata _messageBody
  ) external {
    inbox.addPendingMessage(
      addressToBytes32(msg.sender),
      _recipientAddress,
      _messageBody
    );    
  }

  function addressToBytes32(address _addr) internal pure returns (bytes32) {
    return bytes32(uint256(uint160(_addr)));
  }
}
```

### MockInbox source

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface IMessageRecipient {
  function handle(
    uint32 _origin,
    bytes32 _sender,
    bytes calldata _message
  ) external;
}

contract MockInbox {
  struct PendingMessage {
    bytes32 sender;
    bytes32 recipient;
    bytes messageBody;
  }

  mapping(uint => PendingMessage) pendingMessages;
  uint totalMessages = 0;
  uint messageProcessed = 0;

  function addPendingMessage(
    bytes32 _sender,
    bytes32 _recipient,
    bytes memory _messageBody
  ) external {
    pendingMessages[totalMessages] = PendingMessage(
      _sender,
      _recipient,
      _messageBody
    );
    totalMessages += 1;
  }

  function processNextPendingMessage() public {
    PendingMessage memory pendingMessage = pendingMessages[messageProcessed];

    address recipient = bytes32ToAddress(pendingMessage.recipient);
    
    IMessageRecipient(recipient).handle(
      1,
      pendingMessage.sender,
      pendingMessage.messageBody
    );
    messageProcessed += 1;
  }

  function bytes32ToAddress(bytes32 _buf) internal pure returns (address) {
    return address(uint160(uint256(_buf)));
  }
}
```

### TestRecipient source

```solidity
// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity >=0.8.0;

interface IMessageRecipient {
  function handle(
    uint32 _origin,
    bytes32 _sender,
    bytes calldata _message
  ) external;
}

contract TestRecipient is IMessageRecipient {
  bytes32 public sender;
  bytes public data;
  function handle(
    uint32,
    bytes32 _sender,
    bytes calldata _data
  ) external override {
    sender = _sender;
    data = _data;
  }
}
```
