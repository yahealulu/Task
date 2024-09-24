import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './Login.css'; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault(); 

    try {
     
      const response = await axios.post('https://medical-clinic.serv00.net/api/login', {
        username,
        password
      });


      if (response.data.status) {
  
        localStorage.setItem('token', response.data.data.token);
        navigate('/Dashboard', { state: { role: response.data.data.role.name } });
      } else {
        setError('حدث خطأ، يرجى المحاولة مرة أخرى.');
      }
    } catch (err) {
      setError('اسم المستخدم أو كلمة المرور غير صحيحة.');
    }
  };

  return (
    <div className="center">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="txt_field">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <span></span>
          <label>Username</label>
        </div>
        <div className="txt_field">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span></span>
          <label>Password</label>
        </div>
        <br />
        
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        <input type="submit" value="Login" className="submit" />
        <br /><br />
      </form>
    </div>
  );
}

export default Login;
