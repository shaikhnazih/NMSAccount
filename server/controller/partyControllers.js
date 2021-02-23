
const partyServices = require('../services/partyRepo');
const Party = require('../services/partyRepo');

var partyControllers = {};
// create and save new user
partyControllers.create = (req, res) => {

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Customer
    const party = new Party({
        partyName: req.body.partyName,
        category: req.body.category
    });

    // Save Customer in the database
    Party.Add(party, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Party."
            });
        else res.send(data);
    });
}

//retrive and return all users

partyControllers.find = (req, res) => {
    partyServices.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Party."
            });
        else res.send(data);
    });
}

partyControllers.update = (req, res) => {
    var id = req.params.id;
    Userdb.findOneAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {

                res.status(404).send({ message: `cannot updat user with id ${id}` })

            }
            else {

                res.send(data);
            }

        }).catch(err => {

            res.status(500).send({ message: `Error ${err.message}` })
        })

}
partyControllers.delete = (req, res) => {

    var id = req.params.id;
    Userdb.remove({ _id: id }).then((data) => {
        res.send('Successfully deleted');

    }).catch(err => {

        res.status(400).send({ message: `error in deleting id ${err}` })
    });


}

module.exports = partyControllers;