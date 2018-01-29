require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface: interFace, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  process.env.MNEMONIC,
  process.env.NETWORK
);
const web3 = new Web3(provider);

const deploy = async () => {
  const INITIAL_MESSAGE = 'Hello world!';
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interFace))
    .deploy({
      data: bytecode,
      arguments: [INITIAL_MESSAGE],
    })
    .send({ gas: 1000000, from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
};
deploy();
