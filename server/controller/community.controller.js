/* eslint-disable no-useless-catch */
const Community = require("../models/community.models");
const catchAsync = require("../util/catchAsync");

exports.CreateCommunity = catchAsync(async (req, res, next) => {
  const { name } = req.body;

  // Create a new community instance
  const newCommunity = await Community.create({ name: name });

  res.status(201).json({
    status: "success",
    message: "Community created successfully",
    data: newCommunity,
  });
});

exports.GetAllCommunity = async (req, res, next) => {
  try {
    const community = await Community.find();
    return res.status(200).json({
      status: "success",
      length: community.length,
      data: { Communities: community },
    });
  } catch (error) {
    throw error;
  }
};

exports.GetCommunityByID = async (id) => {
  try {
    const community = await Promise.all([Community.findOne({ _id: id })]);
    return community;
  } catch (error) {
    throw error;
  }
};