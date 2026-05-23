const dbcreds = require('./DbConfig');
const mysql = require('mysql2');

let con;

function connectDB() {
    con = mysql.createConnection({
        host: dbcreds.DB_HOST,
        user: dbcreds.DB_USER,
        password: dbcreds.DB_PWD,
        database: dbcreds.DB_DATABASE
    });

    con.connect(function(err) {
        if (err) {
            console.log("❌ DB Connection Failed:", err.message);

            // retry instead of crashing
            setTimeout(connectDB, 5000);
            return;
        }

        console.log("✅ Connected to MySQL database");
    });
}

// START CONNECTION SAFELY
connectDB();

// =====================
// ADD TRANSACTION
// =====================
function addTransaction(amount, desc, callback) {

    const sql = "INSERT INTO transactions (amount, description) VALUES (?, ?)";

    con.query(sql, [amount, desc], function(err, result) {
        if (err) {
            console.log(err);
            return callback(err, null);
        }

        console.log("Transaction added successfully");
        return callback(null, result);
    });
}

// =====================
// GET ALL
// =====================
function getAllTransactions(callback) {

    const sql = "SELECT * FROM transactions";

    con.query(sql, function(err, result) {
        if (err) return callback(err, null);

        return callback(null, result);
    });
}

// =====================
// FIND BY ID
// =====================
function findTransactionById(id, callback) {

    const sql = "SELECT * FROM transactions WHERE id = ?";

    con.query(sql, [id], function(err, result) {
        if (err) return callback(err, null);

        return callback(null, result);
    });
}

// =====================
// DELETE ALL
// =====================
function deleteAllTransactions(callback) {

    const sql = "DELETE FROM transactions";

    con.query(sql, function(err, result) {
        if (err) return callback(err, null);

        return callback(null, result);
    });
}

// =====================
// DELETE BY ID
// =====================
function deleteTransactionById(id, callback) {

    const sql = "DELETE FROM transactions WHERE id = ?";

    con.query(sql, [id], function(err, result) {
        if (err) return callback(err, null);

        return callback(null, result);
    });
}

module.exports = {
    addTransaction,
    getAllTransactions,
    findTransactionById,
    deleteAllTransactions,
    deleteTransactionById
};
