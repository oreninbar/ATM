import React, { Component } from 'react';


class Transaction extends Component {
  deleteTransaction = () => {
    this.props.delete(this.props.transactionData._id)
  }
  render() {
    return (
      <div className="transaction-input">
        <button id="deletion" onClick={this.deleteTransaction}>delete</button>
        <div className="trans-data" id={this.props.transactionData.id} >
          <span className="transactionData" id="transaction-amount" className={this.props.transactionData.amount < 0 ? "negative" : "positive"}>{this.props.transactionData.amount}</span>
          <span className="transactionData" id="transaction-vendor">{this.props.transactionData.vendor}</span>
          <span className="transactionData" id="transaction-category" >{this.props.transactionData.category} </span>
        </div>
      </div>
    );
  }
}
export default Transaction


