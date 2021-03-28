const contract = require('@truffle/contract');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
const SamuraiToken = require('./eth_swap_blockchain/abis/SamuraiToken.json');
var SamuraiTokenContract = contract(SamuraiToken);


const EthSwap = require('./eth_swap_blockchain/abis/EthSwap.json');
var EthSwapContract = contract(EthSwap)

// Bootstrap the SamuraiToken abstraction for use
SamuraiTokenContract.setProvider(web3.currentProvider);
EthSwapContract.setProvider(web3.currentProvider);


module.exports = {
    getAccounts: async (callback) => {
        // Get the initial account balance so it can be deployed
        await web3.eth.getAccounts().then(function(accs){
            if (accs.length == 0) {
                console.log("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
                return;
            }
            this.accounts = accs;
            this.account = this.accounts[0];

            callback(this.accounts);
        })
    },

    getAccount: async (index, callback) => {
        // Get the initial account balance so it can be deployed
        await web3.eth.getAccounts().then(function(accs){
            if (accs.length == 0) {
                console.log("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
                return;
            }
            this.accounts = accs;
            this.account = this.accounts[index];

            callback(this.account);
        })
    },

    getEthBalance: async (account, callback) => {
        await web3.eth.getBalance(account).then(function(ethBalance){
            if(!ethBalance){
                console.log("Couldn't fetch Ethereum Balance! Make sure your Ethereum client is configured correctly.")
                return;
            }
            this.ethBalance = web3.utils.fromWei(ethBalance);
            callback(this.ethBalance)
        })
    },
    
    getToken: async (callback) => {
        const samurai_token_abi = SamuraiTokenContract.abi;
        const networkId = await web3.eth.net.getId();
        console.log(networkId);
        const samurai_token_data = SamuraiToken.networks[networkId];
        //console.log(samurai_token_data);
        if(samurai_token_data) {
            const token = new web3.eth.Contract(samurai_token_abi, samurai_token_data.address);
            console.log(token);
            callback(token);
        }
    },

    getTokenBalance: async (account, callback) => {
        const samurai_token_abi = SamuraiTokenContract.abi;
        const networkId = await web3.eth.net.getId();
        console.log(networkId);
        const samurai_token_data = SamuraiToken.networks[networkId];
        //console.log(samurai_token_data);
        if(samurai_token_data) {
            const token = new web3.eth.Contract(samurai_token_abi, samurai_token_data.address);
            console.log(token);
            let tokenBalance = await token.methods.balanceOf(account).call();
            console.log('Token Balance: ', tokenBalance);
            callback(tokenBalance);
        }        
    },

    getEthSwap: async (callback) => {
        const networkId = await web3.eth.net.getId();
        const eth_swap_data = EthSwap.networks[networkId];

        if(eth_swap_data) {
            const eth_swap = new web3.eth.Contract(EthSwap.abi, eth_swap_data.address);
            callback(eth_swap);
        }
    },

    buyTokens: async (account, etherAmount, callback) => {
        const networkId = await web3.eth.net.getId();
        const eth_swap_data = EthSwap.networks[networkId];
        let eth_balance = "";
        await web3.eth.getBalance(account).then(function(ethBalance){
            if(!ethBalance){
                console.log("Couldn't fetch Ethereum Balance! Make sure your Ethereum client is configured correctly.")
            }
            eth_balance = web3.utils.fromWei(ethBalance);
        })
        if(eth_swap_data) {
            const eth_swap = new web3.eth.Contract(EthSwap.abi, eth_swap_data.address);
            eth_swap.methods.buyTokens().send({
                value: etherAmount,
                from: account
            })
            .on('transactionHash', (hash) => {
                callback(hash, eth_balance)
            })
        }
    }

}