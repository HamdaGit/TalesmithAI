import React, { useState, useEffect, useCallback } from 'react';
import './Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from './axiosSetup'; // Import axiosInstance from axiosSetup.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [reportType, setReportType] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  const handleGenerateReport = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/api/user_report/?type=${reportType}`);
      setUsers(response.data.users);
      setFilteredUsers(response.data.users);
      setError(''); // Clear any previous error
    } catch (error) {
      console.error('Error generating report:', error);
      setError('Error generating report. Please try again.');
    }
  }, [reportType]);

  useEffect(() => {
    if (reportType) {
      handleGenerateReport();
    }
  }, [reportType, handleGenerateReport]);

  useEffect(() => {
    const filtered = users.filter((user, index) => {
      const searchString = `${index + 1} ${user.email} ${user.username}`.toLowerCase();
      return searchString.includes(searchTerm.toLowerCase());
    });
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  return (
    <div className="admin-dashboard">
      <header className="header text-white p-3">
        <h1 className="m-0">TalesmithAI Dashboard</h1>
      </header>
      <button className="btn btn-icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        <FontAwesomeIcon icon={faBars} color="white" />
      </button>
      <div className="dashboard-container">
        <div className="row">
          <div className="sidebar-part col-md-3">
            <div className={`sidebar-dashboard ${isSidebarOpen ? 'open' : ''}`}>
              <button className="btn btn-icon close-btn" onClick={() => setIsSidebarOpen(false)}>
                <FontAwesomeIcon icon={faTimes} color="black" />
              </button>
              <ul className="list-unstyled">
                <li>
                  <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    Reports
                  </button>
                  {isDropdownOpen && (
                    <ul>
                      <li onClick={() => setReportType('All')}>All Users</li>
                    </ul>
                  )}
                </li>
              </ul>
            </div>
          </div>
          <div className="table-data col-md-9">
            <div className="report">
              {error && <div className="alert alert-danger">{error}</div>}
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Search by serial number, email, or username"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="table-responsive">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Email</th>
                      <th>Username</th>
                      <th>Active</th>
                      <th>Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{user.email}</td>
                        <td>{user.username}</td>
                        <td>{user.is_active ? 'Yes' : 'No'}</td>
                        <td>{new Date(user.timestamp).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
