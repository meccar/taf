/* eslint-disable prettier/prettier */
const Rule = require("../models/rule.models");
// const catchAsync = require("../util/catchAsync");
const handler = require("./handler.controller");

exports.CreateRule = handler.createOne(Rule);
exports.GetRule = handler.getOne(Rule);
exports.UpdateRule = handler.updateOne(Rule);
exports.DeleteRule = handler.deleteOne(Rule);
exports.GetAllRule = handler.getAll(Rule);

// exports.CreateRule = catchAsync(async (req, res, next) => {
//   const { communityId, title, description } = req.body;

//   // Create a new rule instance
//   const newRule = await Rule.create({
//     community_id: communityId,
//     title: title,
//     description: description,
//   });

//   res.status(201).json({
//     status: "success",
//     message: "Rule created successfully",
//     data: { newRule },
//   });
// });

// exports.GetRuleByID = async (id) => {
//   const [rule] = await Promise.all([Rule.findOne({ community_id: id })]);
//   return rule;
// };
