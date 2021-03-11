
const dashboardService = require('../services/summaryRepo');

var dashboardControllers = {};
// create and save new user
dashboardControllers.get = (req, res) => {

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var type = req.body.type;
    if (type == 'totalBalance') {
        dashboardService.getTotalBalance((err, data) => {

            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while adding dashboard."
                });
            else res.send(data);
        })

    }

    else if (type == 'summary') {


        dashboardService.getSummary((err, data) => {
            var result = {};
            result.cashBalance = 0;
            result.bankBalance = 0;
            result.items = [];
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while adding dashboard."
                });
            else if (data && data.length > 0) {
                var summ = data.slice(data.length - 2, data.length);
                result.cashBalance = summ.find(o => o.transactionmode === 'cashBalance').amount;
                result.bankBalance = summ.find(o => o.transactionmode === 'bankBalance').amount;

                result.items = data.slice(0, data.length - 2)
            }
            res.send(result);

        })

    }
    else {

        res.status(403).send("invalid Requeset")
    }

}


module.exports = dashboardControllers;