import Issue from '../models/Issue.js';

const issueController = {
  async PostIssues(req, res) {
    try {
      const issue = await Issue.create({ ...req.body, user: req.user.id });
      res.status(201).json(issue);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
  
  async getAllIssues(req, res) {
    try {
      const issues = await Issue.find()
        .populate("user", "firstName lastName email");

      res.status(200).json(issues);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  async getMyIssues(req, res) {
    try {
      const farmerId = req.user.id;
      const issues = await Issue.find({ user: farmerId }).sort({ createdAt: -1 });

      if (!issues.length) {
        return res.status(404).json({ message: "No issues found for this farmer." });
      }

      res.status(200).json(issues);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  async resolveIssue(req, res) {
    try {
      console.log("Issue ID:", req.params.id); // Debugging
  
      const issue = await Issue.findById(req.params.id);
  
      if (!issue) {
        return res.status(404).json({ message: "Issue not found." });
      }
  
      console.log("Before Update:", issue); // Debugging
  
      issue.status = "Resolved";
      await issue.save();
  
      console.log("After Update:", issue); // Debugging
  
      res.status(200).json({ message: "Issue resolved successfully", issue });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
  
};

export default issueController;