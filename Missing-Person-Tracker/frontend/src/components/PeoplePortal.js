import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function PeoplePortal({ user, onLogout }) {
  const [people, setPeople] = useState([]);
  const [view, setView] = useState('status');
  const [form, setForm] = useState({ name: '', age: '', lastSeen: '', description: '' });
  const [file, setFile] = useState(null);

  const fetchCases = async () => {
    const res = await axios.get('https://missing-person-finder-xobu.onrender.com/');
    setPeople(res.data);
  };

  useEffect(() => { fetchCases(); }, []);

  const handleSubmit = async () => {
    if(!form.name || !form.lastSeen) return alert("Required fields missing");
    const formData = new FormData();
    Object.keys(form).forEach(key => formData.append(key, form[key]));
    formData.append('reporterEmail', user.email); 
    if (file) formData.append('photo', file);

    try {
      await axios.post('https://missing-person-finder-xobu.onrender.com/', formData);
      alert("Case Reported");
      setForm({ name: '', age: '', lastSeen: '', description: '' });
      setFile(null); fetchCases(); setView('status');
    } catch (err) { alert("Submission failed"); }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold">CITIZEN PORTAL</h4>
        <button className="btn btn-dark btn-sm" onClick={onLogout}>Logout</button>
      </div>

      <nav className="nav nav-pills nav-fill mb-4">
        <button className={`nav-link ${view === 'status' ? 'active' : ''}`} onClick={() => setView('status')}>Track Status</button>
        <button className={`nav-link ${view === 'file' ? 'active' : ''}`} onClick={() => setView('file')}>File Report</button>
      </nav>

      {view === 'status' ? (
        <div className="row">
          {people.map(p => (
            <div className="col-md-6 mb-3" key={p._id}>
              <div className="card p-3 d-flex flex-row align-items-center">
                <img src={p.photo ? `http://localhost:5000/uploads/${p.photo}` : "https://via.placeholder.com/80"} 
                     style={{ width: '70px', height: '70px', borderRadius: '6px', objectFit: 'cover' }} alt="p" />
                <div className="ms-3">
                  <h6 className="fw-bold mb-1">{p.name}</h6>
                  <span className={`badge ${p.status === 'Missing' ? 'bg-danger' : 'bg-success'}`}>{p.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card p-4 mx-auto" style={{ maxWidth: '500px' }}>
          <h5 className="fw-bold mb-3">Incident Report</h5>
          <input className="form-control mb-2" placeholder="Full Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          <input className="form-control mb-2" placeholder="Age" type="number" value={form.age} onChange={e => setForm({...form, age: e.target.value})} />
          <input className="form-control mb-2" placeholder="Location" value={form.lastSeen} onChange={e => setForm({...form, lastSeen: e.target.value})} />
          <textarea className="form-control mb-2" placeholder="Description" rows="3" value={form.description} onChange={e => setForm({...form, description: e.target.value})}></textarea>
          <input type="file" className="form-control mb-3" onChange={e => setFile(e.target.files[0])} />
          <button className="btn btn-primary w-100" onClick={handleSubmit}>SUBMIT</button>
        </div>
      )}
    </div>
  );

}
