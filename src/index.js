"use strict";
const app = require("./app");
const soap = require('../lib/dojot_soap');
const config = require('../src/config')

const {logger} = require('@dojot/dojot-module-logger');

const TAG = { filename: "index" };

/* Creating the client */
/* WSDL url */
let url = config.soap.wsdlAddr;
let caCrt = config.soap.caCrt;
let p12File = config.soap.clientP12;
let password = config.soap.clientPass;

let clientEJBCA = new soap.SoapClient(url, caCrt, p12File, password);

try {
    app.initApp(clientEJBCA);
} catch (error) {
    logger.error(`Caught an error: ${error}`, TAG);

    app.stopApp();
}