const express = require("express");
const multer = require("multer");

const {
  registerController,
  loginController,
  authController,
  postBlogController,
  getAllBlogsForUserController,
  deleteBlogController,
  updateBlogController,
  getAllBlogsController,
  updatesLikesController,
} = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/register", registerController);

router.post("/login", loginController);

router.post("/getuserdata", authMiddleware, authController);

router.post("/postblog", upload.single('photo'), authMiddleware, postBlogController);

router.get('/getallblogs', authMiddleware, getAllBlogsForUserController)

router.delete('/deleteblog/:blogid', authMiddleware, deleteBlogController)

router.patch('/updateblog/:blogid',upload.single('photo'), authMiddleware, updateBlogController)

router.get('/getblogs', getAllBlogsController)

router.post('/updatelikes/:blogid', updatesLikesController)

module.exports = router;
