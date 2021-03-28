import logo from './logo.svg';
import Web3 from 'web3';
import './App.css';
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import { useEffect, useState } from 'react';
import Loader from './components/Loader';
import axios from 'axios';


function loadWeb3() {
  if(window.ethereum) {
    window.web3 = new Web3(window.ethereum)
    window.ethereum.enable()
  } 
  else if(window.web3) {
    window.web3 = new Web3(window.web3.currentProvider)
  } 
  else {
    window.alert('Non ethereum browser detected. You should consider trying Metamask')
  }
}

function loadBlockchainData() {
  
}

function ShowLoadingMessage() {
  const [loader, showLoader] = useState({
    loading: true,
    message: "Loading... Please wait"
  })

  return [loader, showLoader];
}

function App() {
  let [loader, showLoader] = ShowLoadingMessage();
  let content = null;
  if(loader.loading) {
    console.log(loader.message)
     content = 
     <div>
      <Loader />
      <p>
        {loader.message}
      </p>
    </div>
    loadWeb3();
    showLoader({
      loading: false,
      message: ""
    })    
  }
  if(!loader.loading) {
    content = <Main />
  }
  
  return (
    <div>
      {content}
    </div>
  );
}

export default App;
