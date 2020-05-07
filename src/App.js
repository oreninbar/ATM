import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './App.css';
import Transactions from './components/Transactions';
import Operations from './components/Operations';
const axios = require('axios')

class App extends Component {
  constructor() {
    super()
    this.state = {
      transactions: [],
      current: 0
    }
  }

  getTransactions = () => {
    return axios.get(`http://localhost:8080/transactions`)
  }

  calcCurrent = (transactions) => {
    let current = 0
    for (const transaction of transactions) {
      current += parseInt(transaction.amount)
    }
    return current
  }

  updateState = (transactions) => {
    let tempCurrent = this.calcCurrent(transactions)
    this.setState({
      transactions: [...transactions],
      current: tempCurrent
    })
  }

  async componentDidMount() {
    const transactions = await this.getTransactions()
    this.updateState(transactions.data)
  }

  withdraw = async (t) => {
    let tempTransaction = t
    tempTransaction.amount *= -1
    let response = await axios.post('http://localhost:8080/transaction', tempTransaction)
    this.updateState(response.data)
  }

  deposit = async (t) => {
    let response = await axios.post('http://localhost:8080/transaction', t)
    this.updateState(response.data)
  }

  delete = async (id) => {
    let response = await axios.delete(`http://localhost:8080/transaction/${id}`)
    this.updateState(response.data)
  }


  render() {
    return (
      <Router>
          <div className="main-container">
            <div id="nav-container">
              {<Link to="/transactions"><img className="icon" id="transaction-icon" src="https://img.icons8.com/wired/64/000000/list.png" /></Link>}
              {<Link to="/"><img className="icon" id="home-icon" src="https://img.icons8.com/plasticine/100/000000/home-page.png" /></Link>}
            </div>
            <div id="current-container">
              {<Route path="/" render={() => <h2 className={this.state.current < 500 ? "negative" : "positive"}><span>TOTAL CURRENT :</span> {this.state.current}</h2>} />}
            </div>
            <div id="transaction-container">
              {<Route path="/" exact render={() => <Operations deposit={this.deposit} withdraw={this.withdraw} />} />}
              {<Route path="/transactions" exact render={({ match }) => <Transactions match={match} transactions={this.state.transactions} delete={this.delete} current={this.state.current} />} />}
              {<Route path="/transactions/:filter" exact render={({ match }) => <Transactions match={match} transactions={this.state.transactions} delete={this.delete} current={this.state.current} />} />}
            </div>
          </div>
      </Router>
    );
  }
}

export default App;


  // async deposit(t) {
  //   await axios
  //     .post('http://localhost:8080/transaction', t)
  //     .then(response => {
  //       console.log(response.data)
  //       this.setState({
  //         transactions: response.data
  //       })
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  // }

  // async delete(id) {
  //   await axios
  //     .delete(`http://localhost:8080/transaction/${id}`)
  //     .then(response => {
  //       this.setState({
  //         transactions: response.data
  //       })
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  // }
