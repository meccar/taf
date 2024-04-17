const Contact = require("../models/contact.models");
const handler = require("./handler.controller");

exports.contactForm = handler.createOne(Contact);
