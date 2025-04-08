import express from 'express';
import { authorizationUser, checkRole } from '../middleware/authMiddleware.js';
import documentController from '../controllers/documentController.js';
import farmController, { upload } from '../controllers/farmController.js';
import issueController from '../controllers/issueController.js';
import loanController from '../controllers/loanController.js';
import transactionController from '../controllers/transactionController.js';
import userController from '../controllers/userController.js';
import authController from '../controllers/authController.js';
import ProfileController from '../controllers/ProfileController.js';

const Router = express.Router();

//AuthRoutes
Router.post('/register', authController.register);
Router.post('/login', authController.login);

//AdminRoutes
Router.get('/getAllUsers',[authorizationUser,checkRole(['admin'])],userController.getAllUsers)
Router.put('/Veyrify/:id',[authorizationUser,checkRole(['admin'])],userController.verifyUser)
Router.get('/getAllLoans', [authorizationUser, checkRole(['admin'])], userController.getAllLoans)
Router.get('/getAllFarmsnn', [authorizationUser, checkRole(['admin'])], userController.getAllFarms);
Router.delete('/deleteUser/:id',[authorizationUser, checkRole(['admin'])], userController.deleteUser)
Router.put('/verifyLoan/:id',[authorizationUser, checkRole(['admin'])], userController.verifyLoan)
Router.delete('/deleteLoan/:id',[authorizationUser, checkRole(['admin'])], userController.deleteLoan)


//Document Routes
Router.post('/upload', [authorizationUser,checkRole(['farmer', 'investor'])], documentController.uploadDocument);
Router.get('/mydocuments', [authorizationUser,checkRole(['farmer', 'investor'])], documentController.getMyDocuments);
Router.delete('/:id', [authorizationUser,checkRole(['farmer', 'investor'])], documentController.deleteDocument);
Router.get('/checkVerificationById', [authorizationUser,checkRole(['farmer', 'investor'])], documentController.checkVerificationById)
Router.put('/verifyDocument/:id', [authorizationUser, checkRole(['admin'])], documentController.verifyDocument)

//Farms Routes
Router.post('/createFarm',[authorizationUser, checkRole(['farmer'])], upload.array('images', 5), farmController.createFarm);
Router.get('/myfarms', [authorizationUser, checkRole(['farmer'])], farmController.getMyFarms);
Router.put('/:id',[authorizationUser, checkRole(['farmer'])], farmController.updateFarm);

//LoanRoutes//
Router.post('/CreateLoaRequest', [authorizationUser, checkRole(['farmer'])], loanController.createLoan)
Router.get('/getAllLoansbyfarmer', [authorizationUser, checkRole(['farmer'])], loanController.getMyLoans);
Router.post('/:id/repay',[authorizationUser, checkRole(['farmer'])],loanController.repayLoan)
Router.get('/myinvestments', [authorizationUser, checkRole(['investor'])], loanController.getMyInvestments);
Router.get('/available', [authorizationUser, checkRole(['investor','admin'])], loanController.getAvailableLoans);
Router.post('/:id/invest',[authorizationUser, checkRole(['investor'])],loanController.investInLoan)
Router.get("/loans/pending-approval", [authorizationUser, checkRole(["admin"])], loanController.pendingapproval)

//issue Routes//
Router.post('/PostIssues',[authorizationUser,checkRole(['farmer', 'investor'])],issueController.PostIssues)
Router.get('/getallissues', [authorizationUser, checkRole(['admin'])],issueController.getAllIssues);
Router.put('/resolveissues/:id', [authorizationUser, checkRole(['admin'])], issueController.resolveIssue)
Router.get('/myissues', [authorizationUser, checkRole(['farmer','investor'])], issueController.getMyIssues)


//Transaction Routes//
Router.get('/my-transactions', authorizationUser, transactionController.getTransactions);
Router.get('/analytics', authorizationUser, transactionController.getAnalytics);
Router.get('/transaction/:id', authorizationUser, transactionController.getTransactionDetails);
Router.put('/update',  [authorizationUser, checkRole(['investor'])], transactionController.updateInvestmentStatus)

//User Routes//
Router.put('/profile', authorizationUser, userController.updateProfile);
Router.put('/change-password', [authorizationUser, checkRole(['admin','farmer','invstor'])], userController.changePassword);

// profile Routes
Router.post('/postProfile',[authorizationUser, checkRole(['farmer','investor'])], ProfileController.createProfile)
Router.get('/getprofilebyid', [authorizationUser, checkRole(['admin', 'farmer', 'investor'])], ProfileController.getprofilebyid);
Router.get('/getAllProfiles',[authorizationUser, checkRole(['admin'])], ProfileController.getAllProfiles)
Router.put('/verifyProfile/:id',[authorizationUser,checkRole(['admin'])], ProfileController.verifyProfile)
Router.delete('/deleteProfile/:id',[authorizationUser,checkRole(['admin'])], ProfileController.deleteProfile)

export default Router;