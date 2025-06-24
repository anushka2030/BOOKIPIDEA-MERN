const mongoose = require("mongoose");

const user = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique:true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    avatar: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/128/10292/10292297.png",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    favourites: [
      {
        type: mongoose.Types.ObjectId,
        ref: "books", // Reference to the Book model
      },
    ],
    cart: [
      {
        type: mongoose.Types.ObjectId,
        ref: "books", // Reference to the Book model
      },
    ],
    orders: [
      {
        type: mongoose.Types.ObjectId,
        ref: "order", // Reference to the Book model
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", user);
