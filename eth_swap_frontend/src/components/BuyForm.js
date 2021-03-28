import React, {useEffect, useState, useRef} from 'react';
import ethLogo from '../assets/eth-logo.png';
import tokenLogo from '../assets/token-logo.png';
import axios from 'axios';

function BuyForm(props) {
    const [samuraiTokenAmount, setSamuraiTokenAmount] = useState({
        output: '0'
    });
    const etherAmountInputRef = useRef(null);
    const [buyTokensResult, setBuyTokensResult] = useState({error: true, data: null});

    const buyTokens = async (buyTokensUrl) => {
        await axios.get(buyTokensUrl).then(response => {
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
        });
        if(buyTokensResult.data !== null) {
            console.log(buyTokensResult.data);
            alert(
                'You have exchanged ' + buyTokensResult.data.etherAmount +
                ' Ethereum against ' + (samuraiTokenAmount.output) + ' SAM tokens' 
                + '\n' + 
                'Your current ethereum balance is ' + buyTokensResult.data.ethereumBalance
            );
        }
    }

    const handleSubmit = (submitEvent) => {
        submitEvent.preventDefault();
        let etherAmount = etherAmountInputRef.current.value.toString();
        etherAmount = window.web3.utils.toWei(etherAmount, 'Ether');
        const ethAccount = props.account;
        const buyTokensUrl = `http://localhost:3001/api/buyTokens?account=${ethAccount}&etherAmount=${etherAmount}`;
        console.log("Buy Form: ", buyTokensUrl);
        buyTokens(buyTokensUrl);
    }

    return (
        <form className="mb-3" onSubmit={
            handleSubmit
        }>
            <div>
                <label className="float-left">
                    <b>Input</b>
                </label>
                <span className="float-right text-muted">
                    Balance: {props.ethBalance}
                </span>
                <div className="input-group mb-4">
                    <input type="text" onChange={
                            (changeEvent) => {
                                console.log('changing...')
                                const etherAmount = etherAmountInputRef.current.value.toString();
                                console.log(etherAmount);
                                setSamuraiTokenAmount({output: etherAmount * 100})
                                console.log('Samurai Token Amount ', samuraiTokenAmount.output)
                            }
                        }
                        ref={etherAmountInputRef}
                        className="form-control form-control-lg"
                        placeholder="0"
                        required 
                    />
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <img src={ethLogo} height='32' alt=""/>
                            &nbsp;&nbsp;&nbsp; ETH
                        </div>
                    </div>
                </div>
                <div>
                    <label className="float-left"><b>Output</b></label>
                    <span className="float-right text-muted">
                        Balance: {props.ethBalance}
                    </span>
                </div>
                <div className="input-group mb-2">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="0"
                        value={samuraiTokenAmount.output}
                        disabled/>
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <img src={tokenLogo} height="32" alt=""/>
                            SAM
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-5">
                <span className="float-left text-muted">
                    1 ETH = 100 SAM
                </span>
            </div>
            <button type="submit" className="btn btn-primary btn-block btn-lg">
                SWAP!
            </button>
        </form>
    )
}
export default BuyForm;
