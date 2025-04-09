import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import About from './components/About.js';
// import SupportTeam from './components/SupportTeam.js';
import Login from './components/Login.js';
import SignupForm from './components/Signup.js';
import HomePage from './components/Home.js';
// Dashboard
import Farmer from './dashboards/Farmer.js';
import Investor from './dashboards/Investor.js';
import Admin from './dashboards/Admin.js';
// Farmer
import Profile from './farmer/Profile.js';
import Issue from './farmer/Issues.js';
import Addfarms from './farmer/AddFarms.js';
import MyFarms from './farmer/MyFarms.js';
import LoanRequestForm from './farmer/FarmerLoans.js';
import ChangePassword from './farmer/ChangePassword.js';
import DocumentUpload from './farmer/Documentupload.js';
import GetProfile1 from './farmer/Getprofile.js';
import CreateProfile from './farmer/Profile.js';
// import MyIssues from './farmer/Myissues.js';

// Investor
import Investments from './investor/Investments.js';
import LoanList from './investor/InvLoans.js';
// Admin
import Loan from './admin/AdminLoans.js';
import Farm  from './admin/Farm.js';
import UserList from './admin/UserList.js';
import AllProfiles from './admin/AllProfiles.js'
import VerifyLoans from './admin/VerifyLoans.js';



function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <ToastContainer></ToastContainer>
      <div className="App">
        <nav className="navbar">
          <div className="logo">
          <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
            <span style={{ color: "white" }}>🌱FARM</span>
            <span style={{ color: "green" }}> IT</span>
          </Link>
          </div>
          <button className="menu-button" onClick={toggleMenu}>
            <span className="menu-icon">&#9776;</span>
          </button>
          <ul className={`nav-list ${isMenuOpen ? 'active' : ''}`}>
          <li>
              <Link to="/" ></Link>
            </li> 
             <li>
              <Link to="/about" className="nav-link">About</Link>
            </li> 
             {/* <li>
              <Link to="/support" className="nav-link">SupportTeam</Link>
            </li>  */}
             <li>
              <Link to="/Login" className="login-button">SignUp</Link>
            </li> 
           </ul>
        </nav>

        <div className="content">
          <Routes>
            {/* Components */}
            <Route path="/" element={<HomePage/>} />
            <Route path="/about" element={<About />} /> 
            {/* <Route path="/Support" element={<SupportTeam />} /> */}
            <Route path="/Login" element={<Login />} />
            <Route path="/register" element={<SignupForm/>} />

            {/* Dashboards */}
            <Route path="/farmer" element={<Farmer/>} />
            <Route path="getProfile" element={<GetProfile1 />} />
            <Route path="/investor" element={<Investor/>} />
            <Route path="/admin" element={<Admin />} />

            {/* Farmer */}
            <Route path="/profile" element={<Profile/>} />
            <Route path="/AddFarmer" element={<Addfarms />} />
            <Route path="MyFarms" element={<MyFarms />} />
            <Route path='/issues1' element={<Issue />} />
            <Route path="/FarmerLoan" element={<LoanRequestForm />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path='/documentupload' element={<DocumentUpload />} />
            <Route path='/getprofile' element={<GetProfile1 />} />
            <Route path='/CreateProfile' element={<CreateProfile />} />
            {/* <Route path='/myissues' element={<MyIssues />} /> */}


            {/* Investments */}
            <Route path='/investments' element={<Investments />}/>
            <Route path='/Loan' element={<LoanList/>} />
            

            {/* Admin */}
            <Route path='/Loan' element={<Loan />} />
            <Route path='/Farm' element={<Farm />} />
            <Route path='/UserList' element={<UserList />} />
            <Route path='/AllProfiles' element={<AllProfiles />} />
            <Route path='/AdminLoanVerify' element={<VerifyLoans />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;