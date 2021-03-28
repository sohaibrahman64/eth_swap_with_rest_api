import React from 'react'
import Identicon from 'identicon.js'
import {useState, useEffect} from 'react'
import axios from 'axios'

function Navbar(props) {
    let content = null;
    content = 
    <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <div className="navbar-brand col-sm-3 col-md-2 mr-0">
            EthSwap
        </div>
        <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-non d-sm-block">
                <small className="text-secondary">
                <small id="account">{props.account.data.account}</small>
                </small>
                {
                props.account.data.account ?
                <img className="ml-2"
                width='30'
                height='30'
                src={`data:image/png;base64,${new Identicon(props.account.data.account, 30).toString()}`}/>
                : <span></span>
                }
            </li>
        </ul>
    </nav>
    

    return (
        <div>
            {content}
        </div>
    );
}

export default Navbar;