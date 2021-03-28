import {useEffect, useState} from 'react';
import FetchAccount from './FetchAccount';
import axios from 'axios';

function BuyTokens(etherAmount) {
    const account = FetchAccount();
    const [buyTokensResult, setBuyTokensResult] = useState({
        error: true,
        data: null
    });
    let ethAccount = '';

    if(account.data != null) {
        ethAccount = account.data.account;
    }
    console.log(ethAccount);

    const buyTokensUrl = `http://localhost:3001/api/buyTokens?account=${ethAccount}&etherAmount=${etherAmount}`;
    console.log(buyTokensUrl);

    useEffect(() => {
        setBuyTokensResult({
            error: true,
            data: null
        });
        axios.get(buyTokensUrl).then(response => {
            setBuyTokensResult({
                error: false,
                data: response.data
            })
        })
        .catch(error => {
            setBuyTokensResult({
                error: true,
                data: null
            })
        })
    }, [buyTokensUrl]);
    console.log("Buy Tokens Result: ", buyTokensResult);
    return buyTokensResult;
}

export default BuyTokens;