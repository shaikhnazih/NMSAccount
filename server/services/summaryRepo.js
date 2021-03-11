var mysql = require('mysql');

const sql = require("../database/connection");


const summary = {}

summary.getTotalBalance = result => {
    sql.query(`select  'totalBalance' as label,sum(case when transactionType='credit' then amount else (amount*-1) end) amount from transaction
union 
select concat(transactionmode,'Balance') label,sum(case when transactionType='credit' then amount else (amount*-1) end) amount from transaction
group by transactionmode`, (err, res) => {
        // sql.query("select  id,transactionType,transactionMode,description,createdDate,modifiedDate,isdeleted,partyName, case when transactiontype ='Credit' then amount else (amount*(-1)) end as amount  from transaction", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("summary: ", res);
        result(null, res);
    });
};

summary.getSummary = result => {
    sql.query(`select  transactiontype,transactionmode,sum(case when transactionType='credit' then amount else (amount*-1) end) amount
from transaction
group by transactiontype,transactionmode 
union all
select '',concat(transactionmode,'Balance'),sum(case when transactionType='credit' then amount else (amount*-1) end) amount from transaction
group by transactionmode
 `, (err, res) => {
        // sql.query("select  id,transactionType,transactionMode,description,createdDate,modifiedDate,isdeleted,partyName, case when transactiontype ='Credit' then amount else (amount*(-1)) end as amount  from transaction", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("summary: ", res);
        result(null, res);
    });
};


module.exports = summary;
