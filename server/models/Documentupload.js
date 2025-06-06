import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['farm_certificate', 'loan_agreement', 'identity_proof', 'other'],
    required: true
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
  },
  relatedTo: {
    model: {
      type: String,
      enum: ['Farm', 'Loan', 'User']
    },
    id: mongoose.Schema.Types.ObjectId
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

const Document = mongoose.model('Document', documentSchema);
export default Document;