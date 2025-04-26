import { Admin } from "../models/Admin.js";
import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const registerAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  const existedUser = await Admin.findOne({
    $or: [{ email }],
  });
  if (existedUser) {
    throw new ApiError(409, "Admin already exist!");
  }
  const newAdmin = new Admin({ email, password: password });

  await newAdmin.save();
  res.status(201).json({ message: "Admin created successfully" });
});

// ?ogin Admin
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email?.trim() || !password?.trim()) {
    throw new ApiError(400, "All fields are required");
  }

  const existingAdmin = await Admin.findOne({ email });
  if (!existingAdmin) {
    throw new ApiError(404, "Admin not found");
  }

  // Compare passwords
  const isPasswordCorrect = await existingAdmin.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid email or password");
  }

  // Generate token
  const token = existingAdmin.generateAccessToken();

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 15 * 60 * 1000,
  });
  return res.status(200).json({
    message: "Authentication Successful",
    token,
    id: existingAdmin._id,
  });
});

const getAllAdmin = asyncHandler(async (req, res) => {
  const admins = await Admin.find();
  res.status(200).json({ admins });
});

const getAdminByID = async (req, res, next) => {
  const id = req.params.id;
  let admin;
  try {
    admin = await Admin.findById(id).populate("addedMovies");
  } catch (err) {
    return console.log(err);
  }
  if (!admin) {
    return console.log("Cannot find Admin");
  }
  return res.status(200).json({ admin });
};

export { loginAdmin, registerAdmin, getAllAdmin, getAdminByID };
