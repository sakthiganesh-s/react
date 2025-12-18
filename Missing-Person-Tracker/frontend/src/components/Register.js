import React, { useState } from 'react';
import axios from 'axios';

export default function Register({ onSwitch }) {
  const [form, setForm] = useState({ email: '', password: '', role: 'people' });

  const handleReg = async () => {
    try {
      await axios.post('http://localhost:5000/api/register', form);
      alert("Registration complete.");
      onSwitch();
    } catch {
      alert("Registration failed.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-7 col-lg-5 col-xl-4">
   <div className="card p-4">
        <h4 className="fw-bold mb-4 text-center" style={{color: '#27ae60'}}>Create Account</h4>
            
            <div className="mb-3">
              <label className="small fw-bold mb-1">Email</label>
        <input className="form-control" placeholder="yourname@email.com" onChange={e => setForm({...form, email: e.target.value})} />
            </div>

            <div className="mb-3">
              <label className="small fw-bold mb-1">Password</label>
              <input className="form-control" type="password" placeholder="Create a password" onChange={e => setForm({...form, password: e.target.value})}/>
            </div>

            <div className="mb-4">
     <label className="small fw-bold mb-1">User Authorization</label>
              <select className="form-select" onChange={e => setForm({...form, role: e.target.value})}>
         <option value="people">Citizen User</option>
              </select>
            </div>

            <button className="btn btn-success w-100 mb-3" onClick={handleReg}>
              Register Account
            </button>

            <div className="text-center">
       <button className="btn btn-link btn-sm fw-bold" onClick={onSwitch}>
                Back to Login
   </button>
            </div>
  </div>
     </div>
      </div>
    </div>
  );
}