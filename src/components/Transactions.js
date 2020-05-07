import React, { Component } from 'react';
import Transaction from './Transaction';
import { Link } from 'react-router-dom'


class   Transactions extends Component {
    constructor() {
        super()
        this.state = {
            value: ''
        }
    }
    handleChange = (event) => {
        this.setState({ value: event.target.value });
    }

    sumFilter = (category) => {
        let arrCategory=this.props.transactions.filter(f=> f.category===category)
        let sum=0
        for (const transaction of arrCategory) {
            sum+=parseInt(transaction.amount)
        }
        return sum
    }

    render() {
        let category = this.props.match.params.filter
        const arrTransaction = this.props.transactions
        return (
            <div id="transaction-main">
                {category ? <h3 id="category">{category}:{this.sumFilter(category)}</h3> : null}
                {category ? arrTransaction.filter(c => c.category === category).map((u, i) => <Transaction key={u + i} transactionData={u} delete={this.props.delete} status={null} />)
                    :
                    arrTransaction.map((u, i) => <Transaction key={u + i} transactionData={u} delete={this.props.delete} status={null} />)}
                <div id="filter">
                    <button id="btn-filter" className="btn" >{<Link to={`/transactions/${this.state.value}`}>filter</Link>}</button>
                    <button id="btn-clear" className="btn">{<Link to="/transactions">Clear</Link>}</button>
                    <select id="select-filter" name="value" value={this.state.value} onChange={this.handleChange}>
                        <option value="Salary">Salary</option>
                        <option value="Purchase">Purchase</option>
                        <option value="Super">Super</option>
                        <option value="Tax">Tax</option>
                        <option value="Food">Food</option>
                    </select>
                </div>
            </div>
        )
    }
}
export default Transactions