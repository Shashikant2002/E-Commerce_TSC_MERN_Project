import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UserModalType } from "../types/ModalTypes.js";

const schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: [true, "Please Enter Your User ID !!"],
    },
    user_name: {
      type: String,
      required: [true, "Please Enter Your Name !!"],
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: [true, "Email Already Exist !!"],
      required: [true, "Please Enter Your Email !!"],
      validator: validator.default.isEmail,
    },
    phone: {
      type: Number,
      validator: validator.default.isMobilePhone,
    },
    photo: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: [true, "Please Select Your Gender"],
    },
    dob: {
      type: Date,
      required: [true, "Please Select Your DOB"],
    },
    password: {
      type: String,
      required: [true, "Please Fill The Password !!"],
      minLength: [8, "Password Cannot less Then 8 Character"],
      trim: true,
      select: false,
    },
  },
  { timestamps: true }
);

schema.virtual("age").get(function () {
  const today = new Date(Date.now());
  const dob = this.dob;

  let age = today.getFullYear() - dob.getFullYear();

  if (
    today.getMonth() < dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
  ) {
    age--;
  }

  return age;
});

schema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

schema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

schema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_USER_SECRET, {
    expiresIn: process.env.JWT_USER_EXPIRE,
  });
};

export const UserModal = mongoose.model<UserModalType>("User_Schema", schema);
