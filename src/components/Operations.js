import React, { Component } from 'react';

class Operations extends Component {
  constructor() {
    super()
    this.state = {
      amount: "",
      vendor: "",
      category: ""
    }
  }
  makeWithdraw = () => {
    this.props.withdraw(this.state)
  }

  makeDeposit = () => {
    this.props.deposit(this.state)
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }


  deleteTransaction() {
    this.props.delete()
  }


  render() {
    return (
      <div id="main-operation">
        <h3 id="your-operation">ENTER OPERATION</h3>
        <div>
          <input className="enter-data" name="amount" id="amount-input" placeholder="Amount" type="text" value={this.state.amount} onChange={this.handleInput} />
          <input className="enter-data" name="vendor" id="vendor-input" placeholder="Vendor" type="text" value={this.state.vendor} onChange={this.handleInput} />
          <select className="enter-data" id="select-input" name="category" value={this.state.category} onChange={this.handleInput}>
            <option >Salary</option>
            <option >Purchase</option>
            <option >Super</option>
            <option >Tax</option>
            <option >Food</option>
          </select>
        </div>
        <div>
          <button id="deposit" className="btn-operation" onClick={this.makeDeposit}>enter deposit</button>
          <button id="withdraw" className="btn-operation" onClick={this.makeWithdraw}>make withdraw</button>
        </div>
        <br></br>

      </div>
    );
  }
}
export default Operations

