import User from "../models/User.js";
import Farm from "../models/Farm.js";
import Loan from "../models/Loan.js";
import Createprofile from "../models/Createprofile.js";
import { sendEmail } from '../mail/Email.js';
import bcrypt from 'bcrypt';


const userController = {

async createProfile(req, res) {
  upload(req, res, async function (err) {
      if (err) {
          return res.status(400).json({ message: err.message });
      }
      try {
          if (!req.file) {
              return res.status(400).json({ message: "No file uploaded" });
          }

          const { fullName, email, PhoneNumber, Country, State, City, PostalCode, Address, DateofBirth, Gender, ProfilePicture, type, filePath, owner } = req.body;
          

          if (!fullName || !email || !PhoneNumber || !Country || !State || !City || !PostalCode || !Address || !DateofBirth || !Gender || !type) {
              return res.status(400).json({ message: "All fields are required." });
          }
          const pprofile = await Profile.create({
              fullName,
              email,
              PhoneNumber,
              Country,
              State,
              City,
              PostalCode,
              Address,
              DateofBirth,
              Gender,
              ProfilePicture: req.file ? req.file.path : undefined,
              filePath: req.file ? req.file.path : undefined,
              
              
          });
          res.status(201).json({ message: "File uploaded successfully", pprofile });

      } catch (error) {
          res.status(500).json({ message: "Server error", error: error.message });
      }
  });
  
},
  
    

    async updateProfile(req, res) {
      try {
        const { firstName, lastName } = req.body;
        const user = await User.findByIdAndUpdate(req.user.id, { firstName, lastName }, { new: true }).select('-password');
        res.json(user);
      } catch (error) {
        res.status(500).json({ message: "Server error" });
      }
    },
  
    // async changePassword(req, res) {
    //   try {
    //     const { oldPassword, newPassword } = req.body;
    //     const user = await User.findById(req.user.id);
    //     if (!(await bcrypt.compare(oldPassword, user.password))) {
    //       return res.status(400).json({ message: "Incorrect current password" });
    //     }
    //     user.password = await bcrypt.hash(newPassword, 10);
    //     await user.save();
    //     res.json({ message: "Password updated successfully" });
    //   } catch (error) {
    //     res.status(500).json({ message: "Server error" });
    //   }
    // },

    async changePassword(req, res){
        try {
          const User= req.user.id;
              const user = await User.find(email);
            // const user = await User.findOne({ userName: req.body.userName });
        //   console.log(user);
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
          const isMatch = await bcrypt.compare(req.body.oldPassword, user.password);
          if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
          }
          const salt = await bcrypt.genSalt(10);
          const newpassword= await bcrypt.hash(req.body.newPassword, salt);
          const updatedUser = await user.updateOne({ password: newpassword }, { new: true });
          res.status(200).json(updatedUser);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      },

      
  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  // async verifyUser (req,res){
  //   try{
  //     const user = await User.findById(req.params.id)
  //     if(!user) return res.status(400).json({message:"no user found"})
  //       if(user.isVerified === false)
  //         user.isVerified = true
  //         await user.save()
  //     res.status(201).json({message: "User verified successfully"})
  //   }catch{
  //     res.status(500).json({ message: "Internal Server Error"});
  //   }
  // },
  async verifyUser(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(400).json({ message: "No user found" });
  
      if (user.isVerified === false) {
        user.isVerified = true;
        await user.save();
        await sendEmail(
          user.email,
          "Farm IT - Registration Successful",
          `<p><strong>Dear ${user.firstName},</strong></p>
          <p>Your account has been Verifird successfully.</p>
          <p><strong>Admin verification is done.</strong> You can now log in using the link below:</p>
          <p><a href="http://localhost:3000/Login" target="_blank">Click here to login</a></p>
          <p>Thank you for your patience.</p>
          <p><strong>Best Regards,</strong><br>Farm IT Team</p>`
        );        
      }
  
      res.status(201).json({ message: "User verified successfully" });
    } catch (error) {
      console.error("Error verifying user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  
  async getAllLoans(req, res) {
    try {
      const loans = await Loan.find()
        .populate('farm.farmer', 'name location')
        .populate('investors.investor', 'name email');

      res.status(200).json(loans);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  async getAllFarms(req, res) {
    try {
      const farms = await Farm.find().populate('farmer', 'name email');
      res.status(200).json(farms);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
    },

  async deleteUser(req, res) {
      try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
    
        res.status(200).json({ message: "User deleted successfully" });
      } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
      }
      },

      async verifyLoan (req,res){
        try{
          const user = await Loan.findById(req.params.id)
          if(!user) return res.status(400).json({message:"no loan found"})
            if(user.isVerified === false)
              user.isVerified = true
            await user.save()
            
          res.status(201).json({message: "Loan verified successfully"})
        }catch{
          res.status(500).json({ message: "Internal Server Error"});
        }
    },
    async deleteLoan(req, res) {
        try {
          const user = await Loan.findByIdAndDelete(req.params.id);
          if (!user) return res.status(404).json({ message: "Loan not found" });
      
          res.status(200).json({ message: "Loan deleted successfully" });
        } catch (error) {
          res.status(500).json({ message: "Server error", error: error.message });
        }
      },

    

  
};
  
  export default userController;