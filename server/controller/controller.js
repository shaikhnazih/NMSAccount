const { request } = require("express");



var controllers = {};
controllers.partyControllers = require('./partyControllers');
controllers.transactionControllers = require('./transactionControllers');
controllers.dashboardControllers = require('./dashboardControllers');

module.exports = controllers;