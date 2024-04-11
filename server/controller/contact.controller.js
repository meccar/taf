const Contact = require("../models/contact.models");
const catchAsync = require("../util/catchAsync");

exports.contactForm = catchAsync(async (req, res, next) => {
  const { name, email, phone, message } = req.body;

  const newContact = await Contact.create({ name, email, phone, message });

  return res.status(201).json({
    status: "success",
    message: "Contact form submitted successfully",
    data: { newContact },
  });
});
