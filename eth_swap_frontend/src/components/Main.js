import React from 'react';
import Navbar from "./Navbar";
import { useEffect, useState, useLayoutEffect } from 'react';
import axios from 'axios';
import BuyForm from './BuyForm';
import SellForm from './SellForm';

function FetchAccount() {
    const url = 'http://localhost:3001/api/account/1'
    const [account, setAccount] = useState({
        error: true,
        data: null
    })
    
    useEffect(() => {
        setAccount({
            error: false,
            data: null
        })
        axios.get(url).then(response => {
            setAccount({
                error: false,
                data: response.data
            })
        })
        .catch(error => {
            setAccount({
                error: true,
                data: null
            })
        })
    }, [url])
    
    return account; 
}

function FetchEthBalance(account) {
    //const account = FetchAccount();
    let ethAccount = '';
    const [ethBalance, setEthBalance] = useState({
        error: true,
        data: null
    })

    if(account.data !== null) {
        ethAccount = account.data.account;
    }
    console.log(ethAccount);

    
    const ethBalanceUrl = `http://localhost:3001/api/getEthBalance?account=${ethAccount}`;
    console.log(ethBalanceUrl);

    useEffect(() => {
        setEthBalance({
            error: true,
            data: null
        })
        axios.get(ethBalanceUrl).then(response => {
            setEthBalance({
                error: false,
                data: response.data
            })
        })
        .catch(error => {
            setEthBalance({
                error: true,
                data: null
            })
        })
    }, [ethBalanceUrl]);
    
 
     console.log("Ethereum Balance: ", ethBalance);
     return ethBalance;
}

function ShowNavbar() {
    const account = FetchAccount();
    
    let navbar = null;
    if(account.error) {
        navbar = <p>
          There was an error please refresh or try again later.
        </p>
    }

    if(account.data) {
        navbar = 
        <div>
            <Navbar account={account} />
        </div>
    }
    return (
        <div>
            {navbar}
        </div>
    );  
}

function FetchForm() {
    const [currentForm, setCurrentForm] = useState({
        name: 'buy',
    })

    return [currentForm, setCurrentForm]
}

function ShowBuySellForms() {
    let account = FetchAccount();
    let [currentForm, setCurrentForm] = FetchForm();
    let ethBalanceData = FetchEthBalance(account);

    //let buyTokensResult = BuyTokens();
    console.log('Eth Balance Data: ', ethBalanceData.data);
    let ethBalance = '';
    if (ethBalanceData.data != null) {
        ethBalance = ethBalanceData.data.ethBalance;
        console.log('Eth Balance: ', ethBalanceData.data.ethBalance);
    }
    let content = null;
    if(currentForm.name === 'buy') {
        if (ethBalance !== '' && ethBalanceData.data !== null){
            content = <BuyForm ethBalance={ethBalance} account={account.data.account}/>
        }
    }
    else if(currentForm.name === 'sell') {
        content = <SellForm />
    }
    return (
        <div id="content" className="mt-5">
            <div className="d-flex justify-content-center mb-3">
                <button className="btn btn-light mr-5" onClick={(clickEvent) => {
                    setCurrentForm({name: 'buy'})
                }}>
                    Buy
                </button>
                <span className="text-muted mt-2">&lt;&nbsp;&gt;</span>
                <button className="btn btn-light ml-5" onClick={(clickEvent) => {
                    setCurrentForm({name: 'sell'})
                }}>
                    Sell
                </button>
            </div>
            <div className="card mb-4">
                <div className="card-body">
                    {content}
                </div>
            </div>
        </div>
    )
}

function Main() {
    //let account = FetchAccount()
    let navbar = ShowNavbar()
    let BuySellForms = ShowBuySellForms()
    
    return(
        <div>
            {navbar}
            {BuySellForms}
        </div>
    )
}

export default Main;
