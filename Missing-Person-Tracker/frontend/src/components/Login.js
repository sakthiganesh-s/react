import React, { useState } from 'react';
import axios from 'axios';

export default function Login({ onLogin, onSwitch }) {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleLogin = async () => {
    try {
      const res = await axios.post('https://missing-person-finder-xobu.onrender.com/', form);
      onLogin(res.data);
    } catch {
      alert("Invalid email or password.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
  <div className="col-12 col-sm-10 col-md-7 col-lg-5 col-xl-4">
       <div className="card p-4">
      <h4 className="fw-bold mb-4 text-center" style={{color: '#2c3e50'}}>Portal Login</h4>
            
            <div className="mb-3">
           <label className="small fw-bold mb-1">Email Address</label>
    <input className="form-control" placeholder="name@mail.com" onChange={e => setForm({...form, email: e.target.value})} />
            </div>

            <div className="mb-4">
      <label className="small fw-bold mb-1">Secure Password</label>
           <input className="form-control" type="password" placeholder="Enter password" onChange={e => setForm({...form, password: e.target.value})} />
            </div>

      <button className="btn btn-primary w-100 mb-3" onClick={handleLogin}>
              Sign In
            </button>

   <div className="text-center">
              <button className="btn btn-link btn-sm fw-bold" onClick={onSwitch}>
                Register a new account
      </button>
       </div>
        </div>
   </div>
      </div>
    </div>
  );

}
