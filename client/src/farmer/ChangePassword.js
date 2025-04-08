import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../components/api';
import { toast } from 'react-toastify';

const ChangePassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/change-password', { token, newPassword, oldPassword });
      toast.success('Password reset successful!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error occurs while resetting password');
    }
  };

  const styles = {
    container: {
      backgroundImage: 'url("https://img.freepik.com/free-photo/beautiful-office-space-cartoon-style_23-2151043324.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      color: 'white',
    },
    form: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: '30px',
      borderRadius: '8px',
      width: '400px',
      textAlign: 'center',
    },
    heading: {
      fontSize: '2rem',
      marginBottom: '15px',
    },
    paragraph: {
      fontSize: '1rem',
      marginBottom: '20px',
    },
    label: {
      fontSize: '1rem',
      color: '#444',
      marginBottom: '8px',
      display: 'block',
      textAlign: 'left',
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '1rem',
    },
    button: {
      width: '48%',
      padding: '10px',
      margin: '10px 1%',
      backgroundColor: '#007bff',
      color: 'white',
      fontSize: '1rem',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    cancelButton: {
      backgroundColor: '#f44336',
    },
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h1 style={styles.heading}>HEALTHOFIN INNOVATION</h1>
        <p style={styles.paragraph}>Enter New Password</p>

        <div>
          <label style={styles.label}>Old Password :</label>
          <input
            className="register"
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        <div>
          <label style={styles.label}>New Password :</label>
          <input
            className="register"
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        <div>
          <button type="button" style={{ ...styles.button, ...styles.cancelButton }}>Cancel</button>
          <button type="submit" style={styles.button}>Reset Password</button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;

