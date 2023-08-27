const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = require("../schemas/userModel");
const blogSchema = require("../schemas/blogModel");

//////////for registering/////////////////////////////
const registerController = async (req, res) => {
  try {
    const existsUser = await userSchema.findOne({ email: req.body.email });
    if (existsUser) {
      return res
        .status(200)
        .send({ message: "User already exists", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    const newUser = new userSchema(req.body);
    await newUser.save();

    return res
      .status(201)
      .send({ message: "Register Successfully", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: `${error.message}` });
  }
};

////for the login
const loginController = async (req, res) => {
  try {
    const user = await userSchema.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User not found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invalid email or password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
      expiresIn: "30d",
    });
    user.password = undefined;
    return res.status(200).send({
      message: "Login successfully",
      success: true,
      token,
      userData: user,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: `${error.message}` });
  }
};

////auth controller
const authController = async (req, res) => {
  try {
    const user = await userSchema.findOne({ _id: req.body.userId });

    if (!user) {
      return res
        .status(200)
        .send({ message: "user not found", success: false });
    } else {
      return res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "auth error", success: false, error });
  }
};

////////post a blog/////////
const postBlogController = async (req, res) => {
  try {
    let photo = null;
    if (req.file) {
      photo = {
        filename: req.file.filename,
        path: `/uploads/${req.file.filename}`,
      };
    }

    const blog = new blogSchema({
      userID: req.body.userId,
      ...req.body,
      photo: photo,
    });

    await blog.save();

    return res.status(200).send({
      success: true,
      message: "blog posted successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "error while fecthing jobs", success: false, error });
  }
};

//////all blogs for the particular user
const getAllBlogsForUserController = async (req, res) => {
  const { userId } = req.body;
  try {
    const getAllBlogs = await blogSchema.find();
    const updatedBlogs = getAllBlogs.filter(
      (blog) => blog.userID.toString() === userId
    );
    return res.status(200).send({
      success: true,
      data: updatedBlogs,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ message: "Internal server error", success: false });
  }
};

//////all blogs user
const getAllBlogsController = async (req, res) => {
  try {
    const getAllBlogs = await blogSchema.find();
    return res.status(200).send({
      success: true,
      data: getAllBlogs,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ message: "Internal server error", success: false });
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

//////updating the property by user/////////////
const updateBlogController = async (req, res) => {
  const { blogid } = req.params;
  try {
    await blogSchema.findByIdAndUpdate(
      { _id: blogid },
      {
        ...req.body,
        ownerId: req.body.userId,
      },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      message: "Blog updated successfully.",
    });
  } catch (error) {
    console.error("Error updating in blog:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update blog.",
    });
  }
};

/////////likes functionality ///////////////
const updatesLikesController = async (req, res) => {
  const { likeCount } = req.body;
  try {
    const blog = await blogSchema.findByIdAndUpdate(
      {
        _id: req.params.blogid,
      },
      { likes: likeCount },
      { new: true }
    );
    return res.status(200).send({
      success: true,
    });
  } catch (error) {
    console.error("Error in like of blog:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update blog.",
    });
  }
};
module.exports = {
  registerController,
  loginController,
  authController,
  postBlogController,
  getAllBlogsForUserController,
  deleteBlogController,
  updateBlogController,
  getAllBlogsController,
  updatesLikesController,
};
