const mongoose = require("mongoose");

const blogModel = mongoose.Schema(
  {
   userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
   },
    name: {
      type: String,
      required: [true, "name is required"],
      set: function (value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
      },
    },
    photo: {
      type: Object,
    },
    message: {
      type: String,
    },
    likes: {
      type: Number,
      default: 0,
    }
  },
  {
    timestamps: true,
  }
);

const blogSchema = mongoose.model("blog", blogModel);

module.exports = blogSchema;
