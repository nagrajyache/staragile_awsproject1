const transactionService = require('./TransactionService');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// =======================
// HEALTH CHECK
// =======================
app.get('/health', (req, res) => {
    res.json("OK - Backend is running");
});

// =======================
// ADD TRANSACTION
// =======================
app.post('/transaction', (req, res) => {

    try {
        const { amount, desc } = req.body;

        transactionService.addTransaction(amount, desc, function(err, result) {

            if (err) {
                return res.status(500).json({
                    message: "DB insert failed",
                    error: err.message
                });
            }

            res.json({ message: "Added transaction successfully" });
        });

    } catch (err) {
        res.status(500).json({
            message: "Something went wrong",
            error: err.message
        });
    }
});

// =======================
// GET ALL
// =======================
app.get('/transaction', (req, res) => {

    transactionService.getAllTransactions(function(err, result) {

        if (err) {
            return res.status(500).json({
                message: "Fetch failed",
                error: err.message
            });
        }

        res.json({ result });
    });
});

// =======================
// DELETE ALL
// =======================
app.delete('/transaction', (req, res) => {

    transactionService.deleteAllTransactions(function(err, result) {

        if (err) {
            return res.status(500).json({
                message: "Delete failed",
                error: err.message
            });
        }

        res.json({ message: "All transactions deleted" });
    });
});

// =======================
// DELETE BY ID
// =======================
app.delete('/transaction/id', (req, res) => {

    const { id } = req.body;

    transactionService.deleteTransactionById(id, function(err, result) {

        if (err) {
            return res.status(500).json({
                message: "Delete failed",
                error: err.message
            });
        }

        res.json({ message: `Transaction ${id} deleted` });
    });
});

// =======================
// GET BY ID
// =======================
app.get('/transaction/id', (req, res) => {

    const { id } = req.body;

    transactionService.findTransactionById(id, function(err, result) {

        if (err) {
            return res.status(500).json({
                message: "Fetch failed",
                error: err.message
            });
        }

        res.json(result[0]);
    });
});

// =======================
// START SERVER
// =======================
app.listen(port, () => {
    console.log(`AB3 backend app listening at http://localhost:${port}`);
});
