const express = require('express')
const router = express.Router()
const Transaction = require('../../model/Transaction')



router.get('/transactions', async (req, res) => {
    await Transaction.find({}, (err, transactions) => {
        res.send(transactions)
    })
})

router.post('/transaction', async (req, res) => {
    let transaction = new Transaction(req.body)
    await transaction.save()
    Transaction.find({}, (err, transactions) => {
        res.send(transactions)
    })

})


router.delete('/transaction/:transactionID', async (req, res) => {
    await Transaction.findByIdAndRemove(req.params.transactionID)
    Transaction.find({}, (err, transactions) => {
        res.send(transactions)
    })
})

module.exports = router


