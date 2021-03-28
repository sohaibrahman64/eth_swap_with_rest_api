import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

function FetchAccount() {
    const url = 'http://localhost:3001/api/account/0';
    const [account, setAccount] = useState({
        error: false,
        data: null
    });
    
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
    }, [url]);
    
    return account; 
}

export default FetchAccount;