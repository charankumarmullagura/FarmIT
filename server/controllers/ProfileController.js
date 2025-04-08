import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Createprofile from '../models/Createprofile.js';

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = './uploads/farms';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// File Filter
function checkFileType(file, cb) {
  const filetypes = /.jpeg|.jpg|.png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only JPEG, JPG, and PNG images are allowed!'));
  }
}

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB Limit
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('document');


const profileController = {

    
  async createProfile(req, res) {
    upload(req, res, async function (err) {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        try {
            if (!req.file) {
                return res.status(400).json({ message: "No file uploaded" });
            }
           

            const { fullName, EmailAddress, PhoneNumber, Country, State, City, PostalCode, Address, DateofBirth, Gender, type, filePath, owner,AdharNumber,PANCARDNumber } = req.body;
            

            if (!fullName || !EmailAddress || !PhoneNumber || !Country || !State || !City || !PostalCode || !Address || !DateofBirth || !Gender||!AdharNumber||!PANCARDNumber ) {
                return res.status(400).json({ message: "All fields are required." });
            }
            const pprofile = await Createprofile.create({
                fullName,
                EmailAddress,
                PhoneNumber,
                Country,
                State,
                City,
                PostalCode,
                Address,
                DateofBirth,
                Gender,
                AdharNumber,
                PANCARDNumber,
                type, 
                owner: req.user.id,
                
                filePath: req.file ? req.file.path : undefined,   
            });
            // const registeredEmail = req.user?.email; 

            // if (EmailAddress !== registeredEmail) {
            //     return res.status(400).json({ message: "The provided email does not match the registered email." });
            // }
            res.status(201).json({ message: "File uploaded successfully", pprofile });
            await pprofile.save();
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    });
  },

  async getprofilebyid(req, res) {
    try {
        const user = await Createprofile.findOne({ owner: req.user.id })
       
        if (!user) return res.status(404).json({ message: "Profile not found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
},
      
    async verifyProfile (req,res){
        try{
          const user = await Createprofile.findById(req.params.id)
          if(!user) return res.status(400).json({message:"no user found"})
            if(user.isVerified === false)
              user.isVerified = true
              await user.save()
          res.status(201).json({message: "Document verified successfully"})
        }catch{
          res.status(500).json({ message: "Internal Server Error"});
        }
    },
    //  async rejectProfile(req, res) {
    //     try {

    //       const profile = await Createprofile.findById(req.params.id);
    //       if (!profile) {
    //         return res.status(404).json({ message: "No user found" });
    //       }
      
    //       profile.isVerified = false; 
    //       await profile.save();
      
    //       res.status(200).json({ message: "Profile rejected successfully" });
    //     } catch (error) {
    //       console.error("Error rejecting profile:", error);
    //       res.status(500).json({ message: "Internal Server Error" });
    //     }
    //   },
      
    async deleteProfile(req, res) {
      try {
        const profile = await Createprofile.findById(req.params.id);
        if (!profile) {
          return res.status(404).json({ message: "Profile not found" });
        }
    
        await profile.deleteOne();
    
        res.status(200).json({ message: "Profile deleted successfully" });
      } catch (error) {
        console.error("Error deleting profile:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    },
    

      async getAllProfiles(req, res) {
        try {
            const users = await Createprofile.find()
            .populate('owner', 'name email');
          res.status(200).json(users);
        } catch (error) {
          res.status(500).json({ message: "Server error", error: error.message });
        }
      },

       async getVerificationStatus(req, res)  {
        try {
          const userId = req.user.id;
          const userProfile = await Createprofile.findOne({ where: { userId } });
      
          if (!userProfile) {
            return res.status(404).json({ message: "Profile not found." });
          }
      
          return res.status(200).json({ isVerified: userProfile.isVerified });
        } catch (error) {
          return res.status(500).json({ message: "Server error.", error });
        }
      }

}





export { upload };
export default profileController;