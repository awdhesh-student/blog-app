const express = require("express");

const userSchema = require("../schemas/userModel");
const blogSchema = require("../schemas/blogModel");

const getAllUsersController = async (req, res) => {
  try {
    const allUsers = await userSchema.find();
    return res.status(200).send({
      success: true,
      data: allUsers,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: `${error.message}` });
  }
};

const getAllBlogsController = async (req, res) => {
  try {
    const allBlogs = await blogSchema.find();
    return res.status(200).send({
      success: true,
      data: allBlogs,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: `${error.message}` });
  }
};

//////delete the blog by user/////
const deleteBlogController = async (req, res) => {
  const blogId = req.params.blogid;
  try {
    await blogSchema.findByIdAndDelete({
      _id: blogId,
    });

    return res.status(200).send({
      success: true,
      message: "The blog is deleted",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ message: "Internal server error", success: false });
  }
};

const deleteUserController = async (req, res) => {
  const userId = req.params.userid;
  try {
    await userSchema.findByIdAndDelete({
      _id: userId,
    });

    return res.status(200).send({
      success: true,
      message: "The user is deleted",
    });

  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ message: "Internal server error", success: false });
  }
};
module.exports = {
  getAllUsersController,
  getAllBlogsController,
  deleteBlogController,
  deleteUserController,
};
