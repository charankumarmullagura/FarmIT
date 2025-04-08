import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../mail/Email.js';

const authController = {
  async register(req, res) {
        try {
        console.log("charan");
      const { firstName, lastName, email, password, role } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ firstName, lastName, email, password: hashedPassword, role });
      await sendEmail(
        email,
        "Farm IT - Registration Successful",
        `<p><strong>Dear ${firstName},</strong></p>
        <p>Your account has been successfully registered.</p>
        <p><strong>Admin verification takes 2 days.</strong> Once verified, you will receive another email notification, and then you can log in.</p>
        <p>Thank you for your patience.</p>
        <p><strong>Best Regards,</strong><br>Farm IT Team</p>`
      );
      res.status(201).json({ message: "User registered successfully" ,user});
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },

  async login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
      
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
  
        if (!user.isVerified) {
            return res.status(403).json({ message: "User is not verified" });
        }
  
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
        res.json({ token, role: user.role });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}
};
export default authController; 