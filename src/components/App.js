import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import Navbar from "./navbar"
import Content from "./content"
import { connect } from 'react-redux';
import Token from '../abis/Token.json'
import { 
    loadWeb3, 
    loadAccount, 
    loadToken, 
    loadExchange } from '../store/interactions.js'
import {contractsLoadedSelector } from '../store/selectors'
//import Token from '/Users/kendramckeever/blockchain-developer-bootcamp/src/abis/Token.json'

class App extends Component {
  componentWillMount() {
    this.loadBlockchainData(this.props.dispatch)
  }

  async loadBlockchainData(dispatch) {


    //const web3 = new Web3(window.ethereum)
    const web3 = await loadWeb3(dispatch)
     //   console.log("web3", web3)

    const networkId = await web3.eth.net.getId()
     //   console.log("networkId", networkId)

   // await window.ethereum.enable();
   await loadAccount(web3, dispatch)

  //  const accounts = await loadAccount(web3, dispatch)
     //   console.log("accounts", accounts)

   // console.log("Token", Token)

    const token = await loadToken(web3, networkId, dispatch)
    if(!token) {      
      window.alert('Token smart contract not detected on the current network. Please select another network with Metamask.')
      return
}
    //    console.log("token", token)

    const exchange = await loadExchange(web3, networkId, dispatch)
    if(!exchange) {      
           
      window.alert('Exchange smart contract not detected on the current network. Please select another network with Metamask.')
      return  
}


  }

  render() {
    return (
      <div>
        <Navbar />
        { this.props.contractsLoaded ?  <Content /> : <div className="content"></div> }
       
      </div>
    );
  }
}


function mapStateToProps(state){
  return {
    contractsLoaded: contractsLoadedSelector(state)

  }
}

export default connect(mapStateToProps)(App);


