import User from "../Models/UserModel";
import bcryptjs from 'bcryptjs'
export const signup=async(req ,res)=>{
  try {
    const {fullName , username , password , confimpassword , gender} = req.body; 
    if(password!== confimpassword){
      res.status(400).json({error:"confirmed  password do not much with password"})     
    }
    const user = User.findOne({username})
    if(user){
      res.status(400).json({error:"User not exist "})
    }
    const salt = await bcryptjs.genSalt(6)
    const hashedPassword = await bcryptjs.hash(password , salt)

    const profilePicBoy = `https://avatar.iran.liara.run/public/boy${username}`;
    const profilePicGirl = `https://avatar.iran.liara.run/public/girl${username}`;

    const newUser = new User({
      fullName: fullName,
      username: username,
      password: password,
      gender,
      profilePic : gender ==="male" ? profilePicBoy : profilePicGirl,

    })
    
    if(newUser){
      await newUser.save();
      res.status(200).json({
        _id : newUser._id,
        username : newUser.username,
        gender: newUser.gender,
        profilePic: newUser.profilePic
      })
    }else{
      return res.status(400).json({error: "User Not found! "})
    }
    
  } catch (error) {
    console.log("error in login infos");
    res.status(400).json({error:"internal error in signup part"})
  }
}

export const login=async(req, res)=>{
  try {
    
  } catch (error) {
    console.log("error in login server");
    res.status(500).json({error:"internal error in login part"})
  }
}

export const logout = async(req,res)=>{
  try {
    
  } catch (error) {
    console.log("error in logout server");
    res.status(500).json({error:"internal error in logour part"})
    
  }
}