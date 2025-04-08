import mongoose, { model } from "mongoose";


const Createprofile = new mongoose.Schema({

    
    fullName: {
        type: String,
        require:true
    },
    EmailAddress: {
        type: String,
        require: true,
    },
    PhoneNumber: {
        type: Number,
        require:true
    },
    Country: {
        type: String,
        require:true
    },
    State: {
        type: String,
        require:true
    },
    City:{
        type: String,
        require:true
    },
    PostalCode: {
        type: Number,
        require:true
    },
    Address: {
        type: String,
        require:true
    },
    DateofBirth: {
        type: String,
        require:true
    },
    Gender: {
        type: String,
        enum:['male','female','other'],
        require:true
    },
    Occupation:{
        type: String,
    },
    PreviousInvestmentApp: {
        type: String,
    },
    PANCARDNumber: {
        type: String,
    },
    AdharNumber: {
        type: Number,
   },
  
    title: { type: String },
    type: {
        type: String,
        enum: ['farm_certificate', 'loan_agreement', 'identity_proof', 'other'],
        // required: true
      },
      filePath: {
        type: String,
        required: true
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
        }
})
export default new mongoose.model('CreateProfile',Createprofile)