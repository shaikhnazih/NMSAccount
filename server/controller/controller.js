const { request } = require("express");



var controllers = {};
controllers.partyControllers = require('./partyControllers');
controllers.transactionControllers = require('./transactionControllers');

module.exports = controllers;