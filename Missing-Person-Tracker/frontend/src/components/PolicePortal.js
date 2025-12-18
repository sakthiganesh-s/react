import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function PolicePortal({ user, onLogout }) {
  const [people, setPeople] = useState([]);
  const [placeSearch, setPlaceSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const fetchData = async () => {
    const res = await axios.get('http://localhost:5000/api/people');
    setPeople(res.data);
  };

  useEffect(() => { fetchData(); }, []);

  const filteredData = people.filter(p => {
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    const matchesPlace = p.lastSeen.toLowerCase().includes(placeSearch.toLowerCase());
    return matchesStatus && matchesPlace;
  });

  const updateStatus = async (id) => {
    await axios.put(`http://localhost:5000/api/people/${id}`, { status: 'Found' });
    fetchData();
  };

  const deleteCase = async (id) => {
    if (window.confirm("Permanently delete?")) {
      await axios.delete(`http://localhost:5000/api/people/${id}`);
      fetchData();
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold">POLICE ADMINISTRATION</h4>
        <button className="btn btn-dark btn-sm" onClick={onLogout}>Logout</button>
      </div>

      <div className="row mb-4 g-3">
        <div className="col-md-8">
          <input className="form-control" placeholder="🔍 Search by Place..." value={placeSearch} onChange={(e) => setPlaceSearch(e.target.value)} />
        </div>
        <div className="col-md-4">
          <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All Status</option>
            <option value="Missing">Missing</option>
            <option value="Found">Found</option>
          </select>
        </div>
      </div>

      <div className="row">
        {filteredData.map(p => (
          <div className="col-xl-6 mb-4" key={p._id}>
            <div className="card p-3 h-100">
              <div className="row g-0">
                <div className="col-4 col-sm-3">
                  <img src={p.photo ? `http://localhost:5000/uploads/${p.photo}` : "https://via.placeholder.com/100"} 
                       className="img-fluid rounded" style={{ height: '140px', objectFit: 'cover' }} alt="p" />
                </div>
                <div className="col-8 col-sm-9 ps-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <h6 className="fw-bold mb-1">{p.name} (Age: {p.age})</h6>
                    <button className="btn btn-link text-danger p-0" onClick={() => deleteCase(p._id)}>🗑️</button>
                  </div>
                  <small className="text-primary d-block">Reported: {new Date(p.dateReported).toLocaleDateString()}</small>
                  <small className="text-dark d-block"><strong>Reporter:</strong> {p.reporterEmail}</small>
                  <small className="text-muted d-block mb-2">Location: {p.lastSeen}</small>
                  <p className="small mb-2 text-dark p-2 rounded" style={{ background: '#fdfaf5', border: '1px solid #eee' }}>
                    <strong>Details:</strong> {p.description || "No description provided."}
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className={`badge ${p.status === 'Missing' ? 'bg-danger' : 'bg-success'}`}>{p.status}</span>
                    {p.status === 'Missing' && <button onClick={() => updateStatus(p._id)} className="btn btn-success btn-sm">Mark Found</button>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}