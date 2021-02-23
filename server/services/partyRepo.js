var mysql = require('mysql');

const sql = require("../database/connection");


const Party = function (party) {
    this.partyName = party.partyName;
    this.category = party.category;
};


Party.getAll = result => {
    sql.query("SELECT * FROM party", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("party: ", res);
        result(null, res);
    });
};

Party.Add = (newParty, result) => {

    sql.query("INSERT INTO party SET ?", newParty, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created cusnewPartytomer: ", { id: res.insertId, ...newParty });
        result(null, { id: res.insertId, ...newParty });
    });
};



module.exports = Party;
