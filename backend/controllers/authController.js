import User from "../Models/UserModel.js"; // Ensure the path is correct
import bcryptjs from 'bcryptjs';

// Signup function
export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmpassword, gender } = req.body;

    // Check if passwords match
    if (password !== confirmpassword) {
      return res.status(400).json({ error: "Confirmed password does not match the password" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(6);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Generate profile picture URL based on gender
    const profilePicBoy = `https://avatar.iran.liara.run/public/boy${username}`;
    const profilePicGirl = `https://avatar.iran.liara.run/public/girl${username}`;
    const profilePic = gender === "male" ? profilePicBoy : profilePicGirl;

    // Create a new user
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword, 
      gender,
      profilePic,
    });

    await newUser.save();

    return res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      gender: newUser.gender,
      profilePic: newUser.profilePic,
    });

  } catch (error) {
    console.error("Error in signup:", error);
    return res.status(500).json({ error: "Internal error in signup process" });
  }
};

