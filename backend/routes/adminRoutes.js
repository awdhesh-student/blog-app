const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const {
  getAllUsersController,
  getAllBlogsController,
  deleteBlogController,
  deleteUserController,
} = require("../controller/adminController");

const router = express.Router();

router.get("/getallusers", authMiddleware, getAllUsersController);

router.get("/getallblogs", authMiddleware, getAllBlogsController);

router.delete('/deleteblog/:blogid', authMiddleware, deleteBlogController)

router.delete('/deleteuser/:userid', authMiddleware, deleteUserController)

module.exports = router;
