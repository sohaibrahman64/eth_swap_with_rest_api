const express = require('express');
const app = express();
const port = 3001 || process.env.PORT;
const web3 = require('web3')
const connection = require('./connection.js');
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', true);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse the application/json
app.use(bodyParser.json());

app.use('/api/accounts', (request, response) => {
    connection.getAccounts( (result) => {
        console.log(result)
            response.status(200).send({
                success: 'true',
                account: result
            })
        
    })
});

app.use('/api/account/:id', (request, response) => {
    index = request.params.id
    connection.getAccount(index, (result) => {
        console.log(result)
        response.status(200).send({
            success: 'true',
            account: result
        })
    })   
});

app.use('/api/getEthBalance', (request, response) => {
    let account = request.query.account
    connection.getEthBalance(account, (balance) => {
        console.log("Ethereum Balance: ", balance)
        response.status(200).send({
            success: 'true',
            ethBalance: balance
        })
    })
});

app.use('/api/getToken', (request, response) => {
    connection.getToken((token) => {
        response.status(200).send({
            success: 'true',
            token: token
        })
    })
});

app.use('/api/getTokenBalance', (request, response) => {
    let account = request.query.account;
    connection.getTokenBalance(account, (balance) => {
        response.status(200).send({
            success: 'true',
            tokenBalance: balance
        })
    })
})

app.use('/api/getEthSwap', (request, response) => {
    connection.getEthSwap((eth_swap) => {
        response.status(200).send({
            success: 'true',
            ethSwap: eth_swap
        })
    })    
})

app.use('/api/buyTokens', (request, response) => {
    let account = request.query.account;
    let etherAmount = request.query.etherAmount;
    connection.buyTokens(account, etherAmount, (hash, eth_balance) => {
        response.status(200).send({
            success: 'true',
            transactionHash: hash,
            ethereumBalance: eth_balance,
            etherAmount: web3.utils.fromWei(etherAmount)
        })
    })
})

app.listen(port, () => {
    console.log('express server is running on port ', port)
})
