---
description: Unit test your integration with mock Hyperlane contracts
---

# Unit testing

You can use the  `MockMailbox` contract to unit test your integration with the Hyperlane messaging API.

You simply need to deploy `MockMailbox` contracts in your test environment, and configure your application to send and receive messages using these contracts.

The `MockMailbox` contract reflects the asynchronous nature of interchain messaging. In order to deliver a dispatched message to its recipient, you must call `MockMailbox.processNextPendingMessage()`, as shown in the examples below.

{% tabs %}
{% tab title="Using Foundry" %}
```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import {MockMailbox} from "../src/mocks/MockMailbox.sol";
import {TestRecipient} from "../src/TestRecipient.sol";

contract MailboxTest is Test {
    uint32 constant originDomain = 1000;
    uint32 constant destinationDomain = 2000;
    MockMailbox originMailbox;
    MockMailbox destinationMailbox;

    function setUp() public {
        originMailbox = new MockMailbox(originDomain);
        destinationMailbox = new MockMailbox(destinationDomain);
        originMailbox.addRemoteMailbox(destinationDomain, destinationMailbox);
        destinationMailbox.addRemoteMailbox(originDomain, originMailbox);
    }

    function testExample() public {
        TestRecipient recipient = new TestRecipient();
        bytes memory data = "This is a test message";

        originMailbox.dispatch(destinationDomain, addressToBytes32(address(recipient)), data);
        destinationMailbox.processNextInboundMessage();

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
describe("Hyperlane", function() {
  it("should be able to send a message", async function () {
    const MockMailbox = await ethers.getContractFactory("MockMailbox")
    const TestRecipient = await ethers.getContractFactory("TestRecipient")

    const originDomain = 1000
    const originMailbox = await MockMailbox.deploy(originDomain)
    
    const destinationDomain = 2000
    const destinationMailbox = await MockMailbox.deploy(destinationDomain)
    
    await originMailbox.enrollRemoteMailbox(destinationDomain, destinationMailbox.address)
    await destinationMailbox.enrollRemoteMailbox(originDomain, originMailbox.address)

    const recipient = await TestRecipient.deploy()
    const data = ethers.utils.toUtf8Bytes("This is a test message")
    
    await originMailbox.dispatch(destinationDomain, addressToBytes32(recipient.address), data)
    await destinationMailbox.processNextPendingMessage()

    const dataReceived = await recipient.data()
    expect(dataReceived).to.eql(ethers.utils.hexlify(data))
  })
})
```
{% endtab %}
{% endtabs %}

### MockMailbox source

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

interface IMessageRecipient {
  function handle(
    uint32 _origin,
    bytes32 _sender,
    bytes calldata _message
  ) external;
}

contract MockMailbox {
    // Domain of chain on which the contract is deployed
    uint32 public immutable domain;
    uint32 public immutable version = 0;

    uint256 public outboundNonce = 0;
    uint256 public inboundUnprocessedNonce = 0;
    uint256 public inboundProcessedNonce = 0;
    mapping(uint32 => MockMailbox) public remoteMailboxes;
    mapping(uint256 => Message) public inboundMessages;

    struct Message {
        uint32 origin;
        address sender;
        address recipient;
        bytes body;
    }

    constructor(uint32 _domain) {
        domain = _domain;
    }

    function addRemoteMailbox(uint32 _domain, MockMailbox _mailbox) external {
        remoteMailboxes[_domain] = _mailbox;
    }

    function dispatch(
        uint32 _destinationDomain,
        bytes32 _recipientAddress,
        bytes calldata _messageBody
    ) external returns (bytes32) {
        MockMailbox _destinationMailbox = remoteMailboxes[_destinationDomain];
        require(
            address(_destinationMailbox) != address(0),
            "Missing remote mailbox"
        );
        _destinationMailbox.addInboundMessage(
            domain,
            msg.sender,
            bytes32ToAddress(_recipientAddress),
            _messageBody
        );
        outboundNonce++;
        return bytes32(0);
    }

    function addInboundMessage(
        uint32 _origin,
        address _sender,
        address _recipient,
        bytes calldata _body
    ) external {
        inboundMessages[inboundUnprocessedNonce] = Message(
            _origin,
            _sender,
            _recipient,
            _body
        );
        inboundUnprocessedNonce++;
    }

    function processNextInboundMessage() public {
        Message memory _message = inboundMessages[inboundProcessedNonce];
        IMessageRecipient(_message.recipient).handle(
            _message.origin,
            addressToBytes32(_message.sender),
            _message.body
        );
        inboundProcessedNonce++;
    }

    function bytes32ToAddress(bytes32 _buf) internal pure returns (address) {
        return address(uint160(uint256(_buf)));
    }
  
    function addressToBytes32(address _addr) internal pure returns (bytes32) {
        return bytes32(uint256(uint160(_addr)));
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
