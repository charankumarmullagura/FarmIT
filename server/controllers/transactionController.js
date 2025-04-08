import Transaction from '../models/Transaction.js';
import Farm from '../models/Farm.js';  
import mongoose from 'mongoose';
import Loan from '../models/Loan.js';

const transactionController = {
  async getTransactions(req, res) {
    try {
      console.log("User ID:", req.user.id);
      const userId = new mongoose.Types.ObjectId(req.user.id);

      const transactions = await Transaction.find({
        $or: [{ from: userId }, { to: userId }] 
      })
        .populate("from", "firstName lastName email")
        .populate("to", "firstName lastName email");

      if (!transactions.length) {
        return res.status(404).json({ message: "No transactions found" });
      }

      res.json(transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      res.status(500).json({ message: "Server error" });
    }
 },


//  async getAnalytics(req, res) {
//   try {
//     const userId = new mongoose.Types.ObjectId(req.user.id);

//     const investments = await Transaction.aggregate([
//       { $match: { from: userId, type: 'investment' } },
//       { $group: { _id: { $month: "$createdAt" }, totalAmount: { $sum: "$amount" } } },
//       { $sort: { _id: 1 } }
//     ]);

//     const repayments = await Transaction.aggregate([
//       { 
//         $match: { 
//           $or: [{ from: userId }, { to: userId }], 
//           type: 'repayment' 
//         } 
//       },
//       { $group: { _id: { $month: "$createdAt" }, totalAmount: { $sum: "$amount" } } },
//       { $sort: { _id: 1 } }
//     ]);

//     console.log("Investments:", investments);
//     console.log("Repayments:", repayments);

//     res.json({ investments, repayments });
//   } catch (error) {
//     console.error("Error fetching analytics:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// },
    
  async getAnalytics(req, res) {
    try {
      const userId = new mongoose.Types.ObjectId(req.user.id);
      const investments = await Transaction.aggregate([
        { $match: { from: userId, type: "investment" } },
        { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
      ]);
      const repayments = await Transaction.aggregate([
        { $match: { to: userId, type: "repayment" } },
        { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
      ]);
      const totalInvestments = investments.length > 0 ? investments[0].totalAmount : 0;
      const totalReturns = repayments.length > 0 ? repayments[0].totalAmount : 0;
  
      console.log("✅ Total Investments:", totalInvestments);
      console.log("✅ Total Returns:", totalReturns);
  
      res.json({
        totalInvestments,
        totalReturns,
        investments,
        repayments
      });
    } catch (error) {
      console.error("❌ Error fetching analytics:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  async getTransactionDetails(req, res) {
    try {
      console.log("Transaction ID:", req.params.id);
      const transaction = await Transaction.findById(req.params.id);

      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }

      const farmDetails = await Farm.findById(transaction.farmId);
      if (!farmDetails) {
        return res.status(404).json({ message: "Farm details not found" });
      }

      res.json({
        transaction,
        farmDetails,
        investorContribution: transaction.amount  
      });
    } catch (error) {
      console.error("Error fetching transaction details:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
  

async updateInvestmentStatus(req, res) {
    try {
      const { investmentId, status } = req.body;
      if (!["Approved", "Rejected"].includes(status))
        return res.status(400).json({ message: "Invalid status" });
  
      const investment = await investment.findById(investmentId).populate("loan");
      if (!investment) return res.status(404).json({ message: "Investment not found" });
  
      investment.status = status;
      await investment.save();
  
      if (status === "Approved") {
        // Transfer funds to the farmer
        const farmer = await User.findById(investment.loan.farmer);
        farmer.balance += investment.amount; // Assuming `balance` field in User model
        await farmer.save();
      }
  
      res.status(200).json({ message: `Investment ${status}`, investment });
    } catch (error) {
      res.status(500).json({ message: "Error updating investment", error });
    }
  },
  
};

export default transactionController;