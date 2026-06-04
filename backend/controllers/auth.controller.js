import { User } from "../models/user.model.js";
import { validationResult } from "express-validator";

export const register = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ success: false, errors: errors.array() });

  try {
    const { name, email, password } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Missing name field",
      });
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Missing email field",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Missing password field",
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      message: "User Created sucessfully !!!!!!",
      data: user,
    });
  } catch (error) {
    console.error("Somrthing went Wrong !!");
  }
};
