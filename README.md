# ethereum-smart-contracts
Ethereum-Smart-contracts using Solidity is a traning exercise in order to understand basic of smart contract and their working in distributed environment.
You must have Metamask extension installed in your chrome browser. Also, use Geth for creating a private chain.
Setting up Dev ENV on MAC:


  1: install xcode
  2: xcode-select --install
  3: install Homebre
  $ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
  4: install nodejs (follow instrunctions on google to install nom)

5: GETH - Go-Ethrem

   5.1: Add ethereum to Source list using following command
        -> $ brew tap ethereum/ethereum     Than
  5.2-> $ brew install ethereum

6: Install Test RPC (It simulate ethrem node it’s not a real node, u can consider it as test node and install test smartcontract) Every time you restart test RPC you need to redeploy smart contracts.
-> $ npm install -g ethereumjs-testrpc

7: Install Truffle Ethereum development framework

→ npm install -g truffle@3.4.11

8: ATOM IDE for etherem development it includes ethereum plugins and we can configure other ethreum plugin in this IDE as well

Download Atom here  https://atom.io/

9: install language package for atom to edit ethereum smart contracts (apm == atom package manager)

→ apm install language-ethereum


	

That’s all about dev env setup


=======

Setting up a private ethereum node using GETH:

1: mkdir -p ~/ChainSkills/private
2: create genesis.json file for genesis block under ‘private’

We need genesis.json that should have following component in it.




Genesis.json

{
 "nonce": "0x0000000000000042",
 "mixhash": "0x0000000000000000000000000000000000000000000000000000000000000000",
 "difficulty": "0x400",
 "alloc": {},
 "coinbase": "0x0000000000000000000000000000000000000000",
 "timestamp": "0x0",
 "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
 "extraData": "0x",
 "gasLimit": "0xffffffff",
 "config": {
    "chainId": 4224,
    "homesteadBlock": 0,
    "eip155Block": 0,
    "eip158Block": 0
 }
}


=======

3: Link/associate genesis block with test ethereum node using GETH

-> $ geth --datadir ~/ChainSkills/private init genesis.json  (This command will create diffirent files see files that created under folder ‘private’ of this application)

4: Creating Accouts

We will create 3 accounts using Geth (Run following command 3 times, each time command run successfully it will return an address)

1: Account where mining fee will go

2:  geth --datadir ~/ChainSkills/private account new

It will ask for a password so use :      pass123


Sample Out put:
➜  private git:(master) ✗ geth --datadir ~/ChainSkills/private account new      
WARN [11-02|17:43:22] No etherbase set and no accounts found as default 
Your new account is locked with a password. Please give a password. Do not forget this password.
Passphrase: 
Repeat passphrase: 
Address: {c49d1d4ae4a58a42387ba36d485de2444ab3e33a}
➜  private git:(master) ✗ geth --datadir ~/ChainSkills/private account new
Your new account is locked with a password. Please give a password. Do not forget this password.
Passphrase: 
Repeat passphrase: 
Address: {5572f2ebd7df39248c0151198e1396a813bd49d7}
➜  private git:(master) ✗ geth --datadir ~/ChainSkills/private account new
Your new account is locked with a password. Please give a password. Do not forget this password.
Passphrase: 
Repeat passphrase: 
Address: {f75b015d66a0eb25bbc64737a0175db05b980b5f}
➜  private git:(master) ✗ 
===============


List Ethereum Account:

➜  private git:(master) ✗ geth --datadir ~/ChainSkills/private account list

Account #0: {c49d1d4ae4a58a42387ba36d485de2444ab3e33a} keystore:///Users/naveedanwar/ChainSkills/private/keystore/UTC--2017-11-02T12-44-11.486711416Z--c49d1d4ae4a58a42387ba36d485de2444ab3e33a
Account #1: {5572f2ebd7df39248c0151198e1396a813bd49d7} keystore:///Users/naveedanwar/ChainSkills/private/keystore/UTC--2017-11-02T12-44-52.945205630Z--5572f2ebd7df39248c0151198e1396a813bd49d7
Account #2: {f75b015d66a0eb25bbc64737a0175db05b980b5f} keystore:///Users/naveedanwar/ChainSkills/private/keystore/UTC--2017-11-02T12-45-00.553080843Z--f75b015d66a0eb25bbc64737a0175db05b980b5f
=================



Setting up private network and connecting to ethereum node:

$ ./startnode.sh 
$ geth attach  ~/ChainSkills/private/geth.ipc       (in new terminal for inspecting our etherem test node, might no need, geth attach should work)

Content of startnode.sh 

geth --networkid 4224 --mine --datadir "~/ChainSkills/private" --ipcpath "~/Library/Ethereum/geth.ipc" --nodiscover --rpc --rpcport "8545"
--port "30303" --rpccorsdomain "*" --nat "any" --rpcapi eth,web3,personal,net --unlock 0
--password ~/ChainSkills/private/password.sec

======

Note: ipcpath "~/Library/Ethereum/geth.ipc"  should be library/Etherum for Mac, other wise shutdown private node start mist and let not  connect to kainchain and let download few blocks than disconnect and run private network again and than start mist.



==========

Geth attach also open geth console and we can use following commands

Like

1: miner.stop
2: miner.start
3: net.version
4: eth.accounts

Get balance of firstaccount (coinbase)

$: web3.fromWei(eth.getBalance(eth.coinbase),'ether')

You can get account balance for other accounts if address is valid

Like

$: web3.fromWei(eth.getBalance(eth.accounts[1]),'ether')



Sending Ether from one account to another  Account

$: You will need to unlock the account you wish to send money from, if you dont do this you will get following error

> eth.sendTransaction({from: eth.coinbase, to: eth.accounts[1], value: web3.toWei(100, 'ether')})

Error: authentication needed: password or unlock
    at web3.js:3143:20
    at web3.js:6347:15
    at web3.js:5081:36
    at <anonymous>:1:1

> 

Unlock an account before you send money from it

$: personal.unlockAccount(eth.coinbase, 'pass123',300)
$  personal.unlockAccount(eth.accounts[1], 'pass123',300)

Now Run previous command for sedning ether from account.coinbase to account[1]

$ > eth.sendTransaction({from: eth.coinbase, to: eth.accounts[1], value: web3.toWei(100, 'ether')})
\"0xa6d7b7a3f2d51da668face0078f6b1a131a93067b5d9ce9f7b8fa0f7243c4c40"

Check balance in accounts[1]

$: web3.fromWei(eth.getBalance(eth.accounts[1]),'ether')

Section 5, Lecture 23

Installing MIST:

There are better ways to connect to Ethereum node rather than geth console. So, here the mist comes which is a special etherum based distributed browser that can be used to connect to ethereum node.

So first thing is we need to get Mist, so go here

https://github.com/ethereum/mist/releases/

Mist have 2 componenets:

1: distributed Browser application
2: Full ethereum node or ability to connect to an existing ethereum node.

Mist —> development and help channel is Gitter: https://gitter.im/ethereum/mist


Install MetaMasK: Another app to communicate with your local node or main ethernet.etc..

1: https://metamask.io/
2: install metamask extension on chrome.



Lecture 24 First Smart Contract:

Step 1: Create a Folder under project directory 

$ mkdir  /chainskills/Training/Greetings

Step 2: initialize  NPM  
$ cd /Users/naveedanwar/ChainSkills/Training/Greetings
$ npm (Accpet default by hittinh Enter, than in the end , type ‘yes’)

NPM command will create a package.json file for handling dependencies, We need few dependencies like a solidity compiler(solc &web3) etc…

$ npm install web3@0.20.0 solc  (version 0.20.0 is important)

SOLC is solidity compiler. That will compile code into EVM byte code that we will deploy on different ethereum nodes.

Web3: it will interact with our smart contract after a smart contract is deployed on node.


Create  solidity file here https://github.com/chainskills/greetings-web3/blob/master/Greetings.sol

$ cd /Users/naveedanwar/ChainSkills/Training/Greetings
Create file Greetings.sol

Content of Greetings.sol

-========
pragma solidity ^0.4.11;
contract Greetings{
  string message;
  function Greetings(){
    message = 'i'm ready'
  }

  function setGreetings(string _message) public{
    message = _message
  }

  function getGreetings() constant returns(string){
    return messgae;
  }
}

==========

Now under Greetings folder start testrpc  for testing our contrct, in test RPC transactions are minded automatically.

$: cd /chainskills/Training/Greetings
$ testrpc

Output of above command:

EthereumJS TestRPC v4.1.3 (ganache-core: 1.1.3)

Available Accounts
==================
(0) 0xbc15cfda42b64265e079d9338c871f4d5d4692ad
(1) 0x6774077b8306e8574e9c4ad566bf8870b0135345
(2) 0xdf56ab94192318c73d0f46e1d30b1e25fea832f0
(3) 0x20d89c78bd86a2e98e866775debd59924a12132a
(4) 0x15769abbcb195cb6e4f70b396b6dd4156a1928b2
(5) 0x1e329ef11877e5b49a94b274d0aaf9b6f4aaaf20
(6) 0x8904d7dfa74d0178ce01db0e9dd31993b37e3212
(7) 0x06dcaff23e32ef98dda16f63232885299916af40
(8) 0x2ddebfc414cf61c5d92ec6cffc0baee512ab70aa
(9) 0x5636e80e31932ede3d5eef82fdc92c4a58520ccd

Private Keys
==================
(0) d7c66727456ecfd592c0df50e503d168bb3181610d8021d933935c45552aa7ff
(1) c9710ed86a37ecf440ca5b7d58f5c20ae097acdc37d749ccdab6b067fa3ac522
(2) e1bfac187399c3bf800950a97e8cb7b5da578a7d3b0cdf201c459fb51b184c1c
(3) a40a77276c626c4e1007213f2212d88156919c016cc41d430a55150e81280e21
(4) a738cb78e162abbc7397cbdfa8df3290849df14a3d5dc6008e0ad52ebbaa15df
(5) 55cc4b22f5cf1d0587d9b177a9e4f47d4b0dc566f62fd488df0f665b73637187
(6) 6fd6884fc3d77db446537adfa212a0edb5e0ab92e0f227bcc570d8833cac8660
(7) 38f817003d26336ae32a6848958dc29e790e125141c5d42a1bff0f4305942662
(8) 40b7c21635158f8c0e1092ca69de35f02eaec7015ec484c1022df6958827287a
(9) 2747b77c76ec2a3e054304c5a1e8c996ec95625953d17ddc8e2b8ae314d0afe2

HD Wallet
==================
Mnemonic:      sting obscure veteran flock romance garage swing dismiss ball mind machine matrix
Base HD Path:  m/44'/60'/0'/0/{account_index}

Listening on localhost:8545
=================

Ok as testrpc node has been started now lets compile our code

Step 1: cd /chainskills/Training/Greetings
Step 2: $ node    (it will open nodejs console)
Step3: Web3 = require('web3')
Step4: web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

Now you have web3 object and you can interact with testrpc

$ web3.eth.accounts

Step 5: solc = require('solc')     require solidity compiler
Step 6: sourceCode = fs.readFileSync('Greetings.sol').toString()    // Read file source code

Output:
'pragma solidity ^0.4.11;\n\ncontract Greetings {\n     string message;\n\n     function Greetings() {\n          message = "I am ready!";\n     }\n\n     function setGreetings(string _message) public {\n          message = _message;\n     }\n\n     function getGreetings() constant returns (string) {\n          return message;\n     }\n}\n'


Step 7:

$ compileCode = solc.compile(sourceCode)      //compilesource code written in Greetings.sol
It returs a json object and we will get some data from this. Compile code attached at the end of this file.

Things to get from this json object:



Step 8: Application Binary interface (ABI)
$ contractABI = JSON.parse(compileCode.contracts[':Greetings'].interface)

Output:
[ { constant: false,
    inputs: [ [Object] ],
    name: 'setGreetings',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function' },
  { constant: true,
    inputs: [],
    name: 'getGreetings',
    outputs: [ [Object] ],
    payable: false,
    stateMutability: 'view',
    type: 'function' },
  { inputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor' } ]

Step 9: Get ByteCode from CompileCode:

$ byteCode = compileCode.contracts[':Greetings'].bytecode

Step 10: > greetingContract = web3.eth.contract(contractABI)  //instansiate a contractObject

Step 11:  Deploy Smartcontract:

> greetingsDeployed = greetingContract.new({data: '0x'+byteCode, from: web3.eth.accounts[0], gas: 4700000})

Parameter: web3.eth.accounts[0] demonstrate that the accunt we will use to deploy contract on blockchain. GAS is the value required to deploy contract it is in ether.

Command we ran in STEP 11 also add transaction in block and in ‘testrpc’ you will see following

  Transaction: 0x741119ecc1c5d7d5e966de6a66f66a0df882222ccd2ef6354fce19ac61c22368
  Contract created: 0x65bce0aac488e6038f51bd7aaa8d962eb4b3da8f   (contract unique address)
  Gas usage: 284156
  Block Number: 1
  Block Time: Mon Nov 06 2017 18:02:18 GMT+0500 (PKT)

eth_newBlockFilter
eth_getFilterChanges
eth_getTransactionReceipt
eth_getCode
eth_uninstallFilter



STEP 12: Get instacne of deployed contract:

> greetingsInstance = greetingContract.at(greetingsDeployed.address)

Call Methods of contract:
> greetingsInstance.getGreetings()
'I am ready!'

Change message:

greetingsInstance.setGreetings("Hello Chain Skills Ateq!", {from: web3.eth.accounts[0]}

//'0x691cd6da2d41d4a86cd2043ab33fb67db4768e0b0b17bc31dc1295694ae074c7'









> greetingsDeployed.address
'0x65bce0aac488e6038f51bd7aaa8d962eb4b3da8f'
Sample Outputc:

> greetingsDeployed = greetingContract.new({data: '0x'+byteCode, from: web3.eth.accounts[0], gas: 4700000})
Contract {
  _eth: 
   Eth {
     _requestManager: RequestManager { provider: [Object], polls: {}, timeout: null },
     getBalance: { [Function: send] request: [Function: bound ], call: 'eth_getBalance' },
     getStorageAt: { [Function: send] request: [Function: bound ], call: 'eth_getStorageAt' },
     getCode: { [Function: send] request: [Function: bound ], call: 'eth_getCode' },
     getBlock: { [Function: send] request: [Function: bound ], call: [Function: blockCall] },
     getUncle: { [Function: send] request: [Function: bound ], call: [Function: uncleCall] },
     getCompilers: { [Function: send] request: [Function: bound ], call: 'eth_getCompilers' },
     getBlockTransactionCount: 
      { [Function: send]
        request: [Function: bound ],
        call: [Function: getBlockTransactionCountCall] },
     getBlockUncleCount: 
      { [Function: send]
        request: [Function: bound ],
        call: [Function: uncleCountCall] },
     getTransaction: 
      { [Function: send]
        request: [Function: bound ],
        call: 'eth_getTransactionByHash' },
     getTransactionFromBlock: 
      { [Function: send]
        request: [Function: bound ],
        call: [Function: transactionFromBlockCall] },
     getTransactionReceipt: 
      { [Function: send]
        request: [Function: bound ],
        call: 'eth_getTransactionReceipt' },
     getTransactionCount: { [Function: send] request: [Function: bound ], call: 'eth_getTransactionCount' },
     call: { [Function: send] request: [Function: bound ], call: 'eth_call' },
     estimateGas: { [Function: send] request: [Function: bound ], call: 'eth_estimateGas' },
     sendRawTransaction: { [Function: send] request: [Function: bound ], call: 'eth_sendRawTransaction' },
     signTransaction: { [Function: send] request: [Function: bound ], call: 'eth_signTransaction' },
     sendTransaction: { [Function: send] request: [Function: bound ], call: 'eth_sendTransaction' },
     sign: { [Function: send] request: [Function: bound ], call: 'eth_sign' },
     compile: { solidity: [Object], lll: [Object], serpent: [Object] },
     submitWork: { [Function: send] request: [Function: bound ], call: 'eth_submitWork' },
     getWork: { [Function: send] request: [Function: bound ], call: 'eth_getWork' },
     coinbase: [Getter],
     getCoinbase: { [Function: get] request: [Function: bound ] },
     mining: [Getter],
     getMining: { [Function: get] request: [Function: bound ] },
     hashrate: [Getter],
     getHashrate: { [Function: get] request: [Function: bound ] },
     syncing: [Getter],
     getSyncing: { [Function: get] request: [Function: bound ] },
     gasPrice: [Getter],
     getGasPrice: { [Function: get] request: [Function: bound ] },
     accounts: [Getter],
     getAccounts: { [Function: get] request: [Function: bound ] },
     blockNumber: [Getter],
     getBlockNumber: { [Function: get] request: [Function: bound ] },
     protocolVersion: [Getter],
     getProtocolVersion: { [Function: get] request: [Function: bound ] },
     iban: 
      { [Function: Iban]
        fromAddress: [Function],
        fromBban: [Function],
        createIndirect: [Function],
        isValid: [Function] },
     sendIBANTransaction: [Function: bound transfer] },
  transactionHash: '0x741119ecc1c5d7d5e966de6a66f66a0df882222ccd2ef6354fce19ac61c22368',
  address: undefined,
  abi: 
   [ { constant: false,
       inputs: [Array],
       name: 'setGreetings',
       outputs: [],
       payable: false,
       stateMutability: 'nonpayable',
       type: 'function' },
     { constant: true,
       inputs: [],
       name: 'getGreetings',
       outputs: [Array],
       payable: false,
       stateMutability: 'view',
       type: 'function' },
     { inputs: [],
       payable: false,
       stateMutability: 'nonpayable',
       type: 'constructor' } ] }
> 










Sample output of CompileCode:

{ contracts: 
   { ':Greetings': 
      { assembly: [Object],
        bytecode: '6060604052341561000f57600080fd5b6040805190810160405280600b81526020017f4920616d207265616479210000000000000000000000000000000000000000008152506000908051906020019061005a929190610060565b50610105565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100a157805160ff19168380011785556100cf565b828001600101855582156100cf579182015b828111156100ce5782518255916020019190600101906100b3565b5b5090506100dc91906100e0565b5090565b61010291905b808211156100fe5760008160009055506001016100e6565b5090565b90565b6102e3806101146000396000f30060606040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806349da5de414610051578063ca4c3a41146100ae575b600080fd5b341561005c57600080fd5b6100ac600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190505061013c565b005b34156100b957600080fd5b6100c1610156565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101015780820151818401526020810190506100e6565b50505050905090810190601f16801561012e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b80600090805190602001906101529291906101fe565b5050565b61015e61027e565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156101f45780601f106101c9576101008083540402835291602001916101f4565b820191906000526020600020905b8154815290600101906020018083116101d757829003601f168201915b5050505050905090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061023f57805160ff191683800117855561026d565b8280016001018555821561026d579182015b8281111561026c578251825591602001919060010190610251565b5b50905061027a9190610292565b5090565b602060405190810160405280600081525090565b6102b491905b808211156102b0576000816000905550600101610298565b5090565b905600a165627a7a72305820266ac9d771f43354529c822769a0f81b91da0b52a4110721ebdf7b6785f2e1a60029',
        functionHashes: [Object],
        gasEstimates: [Object],
        interface: '[{"constant":false,"inputs":[{"name":"_message","type":"string"}],"name":"setGreetings","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getGreetings","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]',
        metadata: '{"compiler":{"version":"0.4.18+commit.9cf6e910"},"language":"Solidity","output":{"abi":[{"constant":false,"inputs":[{"name":"_message","type":"string"}],"name":"setGreetings","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getGreetings","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}],"devdoc":{"methods":{}},"userdoc":{"methods":{}}},"settings":{"compilationTarget":{"":"Greetings"},"libraries":{},"optimizer":{"enabled":false,"runs":200},"remappings":[]},"sources":{"":{"keccak256":"0x74f99e41e375fe395c7c1a185a63853d212040f084bf420c7d4b53ddf81193ed","urls":["bzzr://01864a3b7c50650e2dc505b80415861950c2a4c7981793d3e43ad8228091a63e"]}},"version":1}',
        opcodes: 'PUSH1 0x60 PUSH1 0x40 MSTORE CALLVALUE ISZERO PUSH2 0xF JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH1 0x40 DUP1 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 PUSH1 0xB DUP2 MSTORE PUSH1 0x20 ADD PUSH32 0x4920616D20726561647921000000000000000000000000000000000000000000 DUP2 MSTORE POP PUSH1 0x0 SWAP1 DUP1 MLOAD SWAP1 PUSH1 0x20 ADD SWAP1 PUSH2 0x5A SWAP3 SWAP2 SWAP1 PUSH2 0x60 JUMP JUMPDEST POP PUSH2 0x105 JUMP JUMPDEST DUP3 DUP1 SLOAD PUSH1 0x1 DUP2 PUSH1 0x1 AND ISZERO PUSH2 0x100 MUL SUB AND PUSH1 0x2 SWAP1 DIV SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 PUSH1 0x1F ADD PUSH1 0x20 SWAP1 DIV DUP2 ADD SWAP3 DUP3 PUSH1 0x1F LT PUSH2 0xA1 JUMPI DUP1 MLOAD PUSH1 0xFF NOT AND DUP4 DUP1 ADD OR DUP6 SSTORE PUSH2 0xCF JUMP JUMPDEST DUP3 DUP1 ADD PUSH1 0x1 ADD DUP6 SSTORE DUP3 ISZERO PUSH2 0xCF JUMPI SWAP2 DUP3 ADD JUMPDEST DUP3 DUP2 GT ISZERO PUSH2 0xCE JUMPI DUP3 MLOAD DUP3 SSTORE SWAP2 PUSH1 0x20 ADD SWAP2 SWAP1 PUSH1 0x1 ADD SWAP1 PUSH2 0xB3 JUMP JUMPDEST JUMPDEST POP SWAP1 POP PUSH2 0xDC SWAP2 SWAP1 PUSH2 0xE0 JUMP JUMPDEST POP SWAP1 JUMP JUMPDEST PUSH2 0x102 SWAP2 SWAP1 JUMPDEST DUP1 DUP3 GT ISZERO PUSH2 0xFE JUMPI PUSH1 0x0 DUP2 PUSH1 0x0 SWAP1 SSTORE POP PUSH1 0x1 ADD PUSH2 0xE6 JUMP JUMPDEST POP SWAP1 JUMP JUMPDEST SWAP1 JUMP JUMPDEST PUSH2 0x2E3 DUP1 PUSH2 0x114 PUSH1 0x0 CODECOPY PUSH1 0x0 RETURN STOP PUSH1 0x60 PUSH1 0x40 MSTORE PUSH1 0x4 CALLDATASIZE LT PUSH2 0x4C JUMPI PUSH1 0x0 CALLDATALOAD PUSH29 0x100000000000000000000000000000000000000000000000000000000 SWAP1 DIV PUSH4 0xFFFFFFFF AND DUP1 PUSH4 0x49DA5DE4 EQ PUSH2 0x51 JUMPI DUP1 PUSH4 0xCA4C3A41 EQ PUSH2 0xAE JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST CALLVALUE ISZERO PUSH2 0x5C JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0xAC PUSH1 0x4 DUP1 DUP1 CALLDATALOAD SWAP1 PUSH1 0x20 ADD SWAP1 DUP3 ADD DUP1 CALLDATALOAD SWAP1 PUSH1 0x20 ADD SWAP1 DUP1 DUP1 PUSH1 0x1F ADD PUSH1 0x20 DUP1 SWAP2 DIV MUL PUSH1 0x20 ADD PUSH1 0x40 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 SWAP4 SWAP3 SWAP2 SWAP1 DUP2 DUP2 MSTORE PUSH1 0x20 ADD DUP4 DUP4 DUP1 DUP3 DUP5 CALLDATACOPY DUP3 ADD SWAP2 POP POP POP POP POP POP SWAP2 SWAP1 POP POP PUSH2 0x13C JUMP JUMPDEST STOP JUMPDEST CALLVALUE ISZERO PUSH2 0xB9 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0xC1 PUSH2 0x156 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 DUP1 PUSH1 0x20 ADD DUP3 DUP2 SUB DUP3 MSTORE DUP4 DUP2 DUP2 MLOAD DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP DUP1 MLOAD SWAP1 PUSH1 0x20 ADD SWAP1 DUP1 DUP4 DUP4 PUSH1 0x0 JUMPDEST DUP4 DUP2 LT ISZERO PUSH2 0x101 JUMPI DUP1 DUP3 ADD MLOAD DUP2 DUP5 ADD MSTORE PUSH1 0x20 DUP2 ADD SWAP1 POP PUSH2 0xE6 JUMP JUMPDEST POP POP POP POP SWAP1 POP SWAP1 DUP2 ADD SWAP1 PUSH1 0x1F AND DUP1 ISZERO PUSH2 0x12E JUMPI DUP1 DUP3 SUB DUP1 MLOAD PUSH1 0x1 DUP4 PUSH1 0x20 SUB PUSH2 0x100 EXP SUB NOT AND DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP JUMPDEST POP SWAP3 POP POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST DUP1 PUSH1 0x0 SWAP1 DUP1 MLOAD SWAP1 PUSH1 0x20 ADD SWAP1 PUSH2 0x152 SWAP3 SWAP2 SWAP1 PUSH2 0x1FE JUMP JUMPDEST POP POP JUMP JUMPDEST PUSH2 0x15E PUSH2 0x27E JUMP JUMPDEST PUSH1 0x0 DUP1 SLOAD PUSH1 0x1 DUP2 PUSH1 0x1 AND ISZERO PUSH2 0x100 MUL SUB AND PUSH1 0x2 SWAP1 DIV DUP1 PUSH1 0x1F ADD PUSH1 0x20 DUP1 SWAP2 DIV MUL PUSH1 0x20 ADD PUSH1 0x40 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 SWAP3 SWAP2 SWAP1 DUP2 DUP2 MSTORE PUSH1 0x20 ADD DUP3 DUP1 SLOAD PUSH1 0x1 DUP2 PUSH1 0x1 AND ISZERO PUSH2 0x100 MUL SUB AND PUSH1 0x2 SWAP1 DIV DUP1 ISZERO PUSH2 0x1F4 JUMPI DUP1 PUSH1 0x1F LT PUSH2 0x1C9 JUMPI PUSH2 0x100 DUP1 DUP4 SLOAD DIV MUL DUP4 MSTORE SWAP2 PUSH1 0x20 ADD SWAP2 PUSH2 0x1F4 JUMP JUMPDEST DUP3 ADD SWAP2 SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 JUMPDEST DUP2 SLOAD DUP2 MSTORE SWAP1 PUSH1 0x1 ADD SWAP1 PUSH1 0x20 ADD DUP1 DUP4 GT PUSH2 0x1D7 JUMPI DUP3 SWAP1 SUB PUSH1 0x1F AND DUP3 ADD SWAP2 JUMPDEST POP POP POP POP POP SWAP1 POP SWAP1 JUMP JUMPDEST DUP3 DUP1 SLOAD PUSH1 0x1 DUP2 PUSH1 0x1 AND ISZERO PUSH2 0x100 MUL SUB AND PUSH1 0x2 SWAP1 DIV SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 PUSH1 0x1F ADD PUSH1 0x20 SWAP1 DIV DUP2 ADD SWAP3 DUP3 PUSH1 0x1F LT PUSH2 0x23F JUMPI DUP1 MLOAD PUSH1 0xFF NOT AND DUP4 DUP1 ADD OR DUP6 SSTORE PUSH2 0x26D JUMP JUMPDEST DUP3 DUP1 ADD PUSH1 0x1 ADD DUP6 SSTORE DUP3 ISZERO PUSH2 0x26D JUMPI SWAP2 DUP3 ADD JUMPDEST DUP3 DUP2 GT ISZERO PUSH2 0x26C JUMPI DUP3 MLOAD DUP3 SSTORE SWAP2 PUSH1 0x20 ADD SWAP2 SWAP1 PUSH1 0x1 ADD SWAP1 PUSH2 0x251 JUMP JUMPDEST JUMPDEST POP SWAP1 POP PUSH2 0x27A SWAP2 SWAP1 PUSH2 0x292 JUMP JUMPDEST POP SWAP1 JUMP JUMPDEST PUSH1 0x20 PUSH1 0x40 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 PUSH1 0x0 DUP2 MSTORE POP SWAP1 JUMP JUMPDEST PUSH2 0x2B4 SWAP2 SWAP1 JUMPDEST DUP1 DUP3 GT ISZERO PUSH2 0x2B0 JUMPI PUSH1 0x0 DUP2 PUSH1 0x0 SWAP1 SSTORE POP PUSH1 0x1 ADD PUSH2 0x298 JUMP JUMPDEST POP SWAP1 JUMP JUMPDEST SWAP1 JUMP STOP LOG1 PUSH6 0x627A7A723058 KECCAK256 0x26 PUSH11 0xC9D771F43354529C822769 LOG0 0xf8 0x1b SWAP2 0xda SIGNEXTEND MSTORE LOG4 GT SMOD 0x21 0xeb 0xdf PUSH28 0x6785F2E1A60029000000000000000000000000000000000000000000 ',
        runtimeBytecode: '60606040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806349da5de414610051578063ca4c3a41146100ae575b600080fd5b341561005c57600080fd5b6100ac600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190505061013c565b005b34156100b957600080fd5b6100c1610156565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101015780820151818401526020810190506100e6565b50505050905090810190601f16801561012e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b80600090805190602001906101529291906101fe565b5050565b61015e61027e565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156101f45780601f106101c9576101008083540402835291602001916101f4565b820191906000526020600020905b8154815290600101906020018083116101d757829003601f168201915b5050505050905090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061023f57805160ff191683800117855561026d565b8280016001018555821561026d579182015b8281111561026c578251825591602001919060010190610251565b5b50905061027a9190610292565b5090565b602060405190810160405280600081525090565b6102b491905b808211156102b0576000816000905550600101610298565b5090565b905600a165627a7a72305820266ac9d771f43354529c822769a0f81b91da0b52a4110721ebdf7b6785f2e1a60029',
        srcmap: '26:296:0:-;;;74:64;;;;;;;;107:23;;;;;;;;;;;;;;;;;;:7;:23;;;;;;;;;;;;:::i;:::-;;26:296;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;',
        srcmapRuntime: '26:296:0:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;145:84;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;236;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:2;8:100;;;99:1;94:3;90;84:5;80:1;75:3;71;64:6;52:2;49:1;45:3;40:15;;8:100;;;12:14;3:109;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;145:84:0;213:8;203:7;:18;;;;;;;;;;;;:::i;:::-;;145:84;:::o;236:::-;278:6;;:::i;:::-;305:7;298:14;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;236:84;:::o;26:296::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o' } },
  errors: 
   [ ':6:6: Warning: No visibility specified. Defaulting to "public".\n     function Greetings() {\n     ^\nSpanning multiple lines.\n',
     ':14:6: Warning: No visibility specified. Defaulting to "public".\n     function getGreetings() constant returns (string) {\n     ^\nSpanning multiple lines.\n' ],
  sourceList: [ '' ],
  sources: { '': { AST: [Object] } } }
> 



















SAMPLE out put:

> greetingContract = web3.eth.contract(contractABI)
ContractFactory {
  eth: 
   Eth {
     _requestManager: RequestManager { provider: [Object], polls: {}, timeout: null },
     getBalance: { [Function: send] request: [Function: bound ], call: 'eth_getBalance' },
     getStorageAt: { [Function: send] request: [Function: bound ], call: 'eth_getStorageAt' },
     getCode: { [Function: send] request: [Function: bound ], call: 'eth_getCode' },
     getBlock: { [Function: send] request: [Function: bound ], call: [Function: blockCall] },
     getUncle: { [Function: send] request: [Function: bound ], call: [Function: uncleCall] },
     getCompilers: { [Function: send] request: [Function: bound ], call: 'eth_getCompilers' },
     getBlockTransactionCount: 
      { [Function: send]
        request: [Function: bound ],
        call: [Function: getBlockTransactionCountCall] },
     getBlockUncleCount: 
      { [Function: send]
        request: [Function: bound ],
        call: [Function: uncleCountCall] },
     getTransaction: 
      { [Function: send]
        request: [Function: bound ],
        call: 'eth_getTransactionByHash' },
     getTransactionFromBlock: 
      { [Function: send]
        request: [Function: bound ],
        call: [Function: transactionFromBlockCall] },
     getTransactionReceipt: 
      { [Function: send]
        request: [Function: bound ],
        call: 'eth_getTransactionReceipt' },
     getTransactionCount: { [Function: send] request: [Function: bound ], call: 'eth_getTransactionCount' },
     call: { [Function: send] request: [Function: bound ], call: 'eth_call' },
     estimateGas: { [Function: send] request: [Function: bound ], call: 'eth_estimateGas' },
     sendRawTransaction: { [Function: send] request: [Function: bound ], call: 'eth_sendRawTransaction' },
     signTransaction: { [Function: send] request: [Function: bound ], call: 'eth_signTransaction' },
     sendTransaction: { [Function: send] request: [Function: bound ], call: 'eth_sendTransaction' },
     sign: { [Function: send] request: [Function: bound ], call: 'eth_sign' },
     compile: { solidity: [Object], lll: [Object], serpent: [Object] },
     submitWork: { [Function: send] request: [Function: bound ], call: 'eth_submitWork' },
     getWork: { [Function: send] request: [Function: bound ], call: 'eth_getWork' },
     coinbase: [Getter],
     getCoinbase: { [Function: get] request: [Function: bound ] },
     mining: [Getter],
     getMining: { [Function: get] request: [Function: bound ] },
     hashrate: [Getter],
     getHashrate: { [Function: get] request: [Function: bound ] },
     syncing: [Getter],
     getSyncing: { [Function: get] request: [Function: bound ] },
     gasPrice: [Getter],
     getGasPrice: { [Function: get] request: [Function: bound ] },
     accounts: [Getter],
     getAccounts: { [Function: get] request: [Function: bound ] },
     blockNumber: [Getter],
     getBlockNumber: { [Function: get] request: [Function: bound ] },
     protocolVersion: [Getter],
     getProtocolVersion: { [Function: get] request: [Function: bound ] },
     iban: 
      { [Function: Iban]
        fromAddress: [Function],
        fromBban: [Function],
        createIndirect: [Function],
        isValid: [Function] },
     sendIBANTransaction: [Function: bound transfer] },
  abi: 
   [ { constant: false,
       inputs: [Array],
       name: 'setGreetings',
       outputs: [],
       payable: false,
       stateMutability: 'nonpayable',
       type: 'function' },
     { constant: true,
       inputs: [],
       name: 'getGreetings',
       outputs: [Array],
       payable: false,
       stateMutability: 'view',
       type: 'function' },
     { inputs: [],
       payable: false,
       stateMutability: 'nonpayable',
       type: 'constructor' } ],
  new: { [Function] getData: [Function: bound ] } }
> 



Deploy contracts using TRUFFLE

1: create a new directory in GreetingsTruffle
2: $ truffle init
3: truffle migrate
4: truffle migrate --reset  to force the latest version of your contracts to be deployed)

Will deploy contractors on testRPC
==========================
Interacting with Contract:

$: truffle console
$  Greetings.deployed().then(function(instance){app=instance;})
$ app
$ app.getGreetings()

How to change method:

 app.setGreetings("Hello ChainSkills Ateq!!",{from: web3.eth.accounts[0]})


========

Inspeting Transactions and Blocks:

Open 3 terminals

1: in first terminal run $ testrpc
2: in 2nd terminal run geth console like $ geth attach http://localhost:8545
3: in this terminal deploy our previously created greeting contract $ t truffle migrate --reset

When we deploy a smartcontract on a ethereum node either private or test it creates bunch of transactions. From wihich 3rd transaction is the one which actually deployed the contract on the ethereum node.  In my case when i run

$ truffle migrate --reset

In TestRpc console we can see bunch of transactions (upto 4, 3rd one is copied here)

eth_getTransactionReceipt
eth_accounts
net_version
net_version
eth_sendTransaction

  Transaction: 0x2ff435d9326710886f7de49090c8f9e820c289855449e678e5eadcb6bc85de11
  Contract created: 0x4292db25f5f6d957f952019c0093a86da1ad1788
  Gas usage: 275623
  Block Number: 3
  Block Time: Tue Nov 07 2017 15:47:41 GMT+0500 (PKT)
 
Now we can use above transaction has (0x2ff435d9326710886f7de49090c8f9e820c289855449e678e5eadcb6bc85de11) to inspect a transaction as well as we can inspect a Block

On geth terminal run
1: $ eth.getTransaction('0x2ff435d9326710886f7de49090c8f9e820c289855449e678e5eadcb6bc85de11')

blockHash: "0x0804fbe828c7e4eb61ae5d31200b5f84ee773af0caf466bd8b6d3f3597fa59dc",
  blockNumber: 3,
  from: "0x21727be654b30f021c8c7011a0e1c1268e558252",
  gas: 4712388,
  gasPrice: 100000000000,
  hash: "0x2ff435d9326710886f7de49090c8f9e820c289855449e678e5eadcb6bc85de11"

Inspecting Block:

When you inspect a transaction you get a blockhas that has the information for the block inwihich that transaction is present.

$:eth.getBlock("0x0804fbe828c7e4eb61ae5d31200b5f84ee773af0caf466bd8b6d3f3597fa59dc")

Explanation of the following will come next 
logsBloom value , gas and gasPrice

==============

Gas: is a unit of complexity in ethereum in term ofcost required to mine a block

Read operation is FREE in smart contract: eth.getTransaction(‘hash’) free
Write Operation: require a GAS value
GAS value is paid by the acount smartcontract was deployed. More if else loop in your code more gas value will be needed.

More info on GAS value: https://ethgasstation.info/
==================

GAS and OPCODE:

Step1: $ truffle console
Step2: $ Greetings.binary     //it returns binary code of the contract
Step3: Go to https://etherscan.io/opcode-tool

Decoded Bytecode :

[1] PUSH1 0x60 
[3] PUSH1 0x40 
[4] MSTORE 
[5] CALLVALUE 
[6] ISZERO 
[9] PUSH2 0x000f 
[10] JUMPI 
[12] PUSH1 0x00 ……. These instrustion run on Etherum virtual node(EVM)



==================

ChainList Project:

In this project we will create a project in which we will create a smart contract with a web frontend. Initiall it willa dd 1 product but later we will add more to it.


Open 3 terminals

1: in first terminal run $ testrpc
2: in 2nd terminal run geth console like $ geth attach http://localhost:8545
3: in this terminal deploy our previously created greeting contract $ truffle console


Step1: create new directory  /Users/naveedanwar/ChainSkills/Training/chainlist
Step 2: truffle unbox pet-shop   
 (unbox: truffle comes out of the box feature to create js based frontend app code)
Step 3: if you are using truffle 4 than add follwoing in truffle.js file
=====
module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    }
  }
};
=======
Step4:Add a Contract in directory:
Step 5: create 2_deploy_contract.js file





Step6: Run Truffle migrate as
$ truffle migrate --reset




Check ChainList address:

➜  chainlist git:(master) ✗ truffle console
truffle(development)> ChainList.address

Get instance of latest ChainList contract: 

$ truffle(development)> ChainList.deployed().then(function(instance){app=instance;})
 Call getArticle() function written in ChainList contract

$ app.getArticle(); Solidity has ability to return multiple values:

Out put:

[ '0x0000000000000000000000000000000000000000',
  '',
  '',
  { [String: '0'] s: 1, e: 0, c: [ 0 ] } ]






Set values for sellArticle() method written in contract

$ truffle(development)> app.sellArticle("Iphone7", "Selling it to buy iphine8", web3.toWei(3,'ether', {from: web3.eth.accounts[1]}))

Out Put:
{ tx: '0xe64cf0697723cc6b4c004afd499335b398de513c28763f8bf1cf8aed0fc613b3',
  receipt: 
   { transactionHash: '0xe64cf0697723cc6b4c004afd499335b398de513c28763f8bf1cf8aed0fc613b3',
     transactionIndex: 0,
     blockHash: '0x954d8285ccce1b9bcb9169db085b253a8d01a0178b18f01db950464c002437a7',
     blockNumber: 5,
     gasUsed: 106657,
     cumulativeGasUsed: 106657,
     contractAddress: null,
     logs: [] },
  logs: [] }
truffle(development)> 





Check network uid:

➜  chainlist git:(master) ✗ geth attach http://localhost:8545
Welcome to the Geth JavaScript console!

instance: EthereumJS TestRPC/v1.1.3/ethereum-js
coinbase: 0x2242489fe6a0f0edd41500bfe5025671c5b5df18
at block: 4 (Tue, 07 Nov 2017 21:13:56 PKT)
 modules: eth:1.0 evm:1.0 net:1.0 personal:1.0 rpc:1.0 web3:1.0

> net.version"1510070285378"
> 


=======

Selling Articles using MetaMask:

$:  ./starttestrpc.sh





Attaching An Event to a Watcher:

1: truffle console
2: truffle migrate --reset
2: truffle(development)> ChainList.deployed().then(function(instance){app = instance;})
3: var sellEvent = app.sellArticleEvent({}, {fromBlock:0, toBlock: 'latest'}).watch(function(error, event){console.log(event);})

In Receipt, and logs you will see event.

How to stop Watching an Event linked to a Contract:

1: sellEvent.stopWatching()


0x1daa654CfBc28F375E0f08F329dE219Fff50C765


======================

SECTION 7, Lecture 50 Buy an article by sending a Value





Selling Article from Account 1:

Step1: $: truffle migrate --reset
Step2: $ChainList.deployed().then(function(instance){app = instance;})
Step3: $:app.sellArticle("article 1", "Description of Artile 1", web3.toWei(10,"ether"), {from: web3.eth.accounts[1]})

Watch Buy Article Event: 

var buyEvent = app.buyArticleEvent({_seller:web3.eth.accounts[1]}, {fromBlock:0, toBlock:'latest'}).watch(function(error, event){console.log(event);})


$ app.buyArticle({from: web3.eth.accounts[2], value: web3.toWei(10, "ether")})
{ tx: '0xe8f6b3cf65c8a693ebd8247cfa5667ef6cad712369bb7d2ae379b7e42c4eac13',
  receipt: 
   { transactionHash: '0xe8f6b3cf65c8a693ebd8247cfa5667ef6cad712369bb7d2ae379b7e42c4eac13',
     transactionIndex: 0,
     blockHash: '0xa3b1b4fa8e9aa8569334063a7a15a0ccf5ca9be33afc9d1ca80e4e64a125ee67',
     blockNumber: 30,
     gasUsed: 54399,
     cumulativeGasUsed: 54399,
     contractAddress: null,
     logs: [ [Object] ] },
  logs: 
   [ { logIndex: 0,
       transactionIndex: 0,
       transactionHash: '0xe8f6b3cf65c8a693ebd8247cfa5667ef6cad712369bb7d2ae379b7e42c4eac13',
       blockHash: '0xa3b1b4fa8e9aa8569334063a7a15a0ccf5ca9be33afc9d1ca80e4e64a125ee67',
       blockNumber: 30,
       address: '0xe7194e2016d5454d5791d94d8a6aff6c1ead6457',
       type: 'mined',
       event: 'buyArticleEvent',
       args: [Object] } ] }
truffle(development)> { logIndex: 0,
  transactionIndex: 0,
  transactionHash: '0xe8f6b3cf65c8a693ebd8247cfa5667ef6cad712369bb7d2ae379b7e42c4eac13',
  blockHash: '0xa3b1b4fa8e9aa8569334063a7a15a0ccf5ca9be33afc9d1ca80e4e64a125ee67',
  blockNumber: 30,
  address: '0xe7194e2016d5454d5791d94d8a6aff6c1ead6457',
  type: 'mined',
  event: 'buyArticleEvent',
  args: 
   { _seller: '0x1daa654cfbc28f375e0f08f329de219fff50c765',
     _buyer: '0xc2dbc0a6b68d6148d80273ce4d6667477dbf2aa7',
     _name: 'article 1',
     _price: { [String: '10000000000000000000'] s: 1, e: 19, c: [Array] } } }

==================================

https://www.udemy.com/getting-started-with-ethereum-solidity-development/learn/v4/t/lecture/7813222?start=0

Query on Solidity Contract

Struct and Mapping 

  struct Article {
    uint id;
    address seller;
    address buyer;
    string name;
    string description;
    uint256 price;
  }

  // State variables
  mapping(uint => Article) public articles;
  uint articleCounter;


