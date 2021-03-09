var mysql = require('mysql');

const sql = require("../database/connection");


const Transactions = {}

Transactions.getAll = result => {
    sql.query("select  id,transactionDateTime,transactionType,transactionMode,description,createdDate,modifiedDate,isdeleted,partyName, amount  from transaction", (err, res) => {
        // sql.query("select  id,transactionType,transactionMode,description,createdDate,modifiedDate,isdeleted,partyName, case when transactiontype ='Credit' then amount else (amount*(-1)) end as amount  from transaction", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("transaction: ", res);
        result(null, res);
    });
};

Transactions.getTop10 = result => {
    sql.query("select  id,transactionDateTime,transactionType,transactionMode,description,createdDate,modifiedDate,isdeleted,partyName, amount  from transaction ORDER BY id desc LIMIT 10", (err, res) => {
        // sql.query("select  id,transactionType,transactionMode,description,createdDate,modifiedDate,isdeleted,partyName, case when transactiontype ='Credit' then amount else (amount*(-1)) end as amount  from transaction", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("transaction: ", res);
        result(null, res);
    });
};



Transactions.Add = (newTranc, result) => {

    sql.query("INSERT INTO transaction SET ?", newTranc, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Transaction successfullt added: ", { id: res.insertId, ...newTranc });
        result(null, { id: res.insertId, ...newTranc });
    });
};



module.exports = Transactions;
