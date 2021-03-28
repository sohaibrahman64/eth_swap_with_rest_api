const { getToken } = require("../../connection");

const SamuraiToken = artifacts.require('SamuraiToken');
const EthSwap = artifacts.require('EthSwap');

module.exports = async (deployer) => {
    // Deploy Token
    await deployer.deploy(SamuraiToken);
    const samurai_token = await SamuraiToken.deployed();

    // Deploy EthSwap
    await deployer.deploy(EthSwap, samurai_token.address);
    const eth_swap = await EthSwap.deployed();

    // Transfer all tokens to EthSwap (1 million)
    await samurai_token.transfer(eth_swap.address, '1000000000000000000000000000000');
};