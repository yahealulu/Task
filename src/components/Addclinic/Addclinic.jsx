import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Addclinic.css';

const Addclinic = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [data, setData] = useState([]);
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate(); 

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const fetchClinics = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('https://medical-clinic.serv00.net/api/clinic', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const result = await response.json();
        if (result.status) {
          setData(result.data);
        } else {
          console.error('Failed to fetch clinics:', result.message);
        }
      } catch (error) {
        console.error('Error fetching clinics:', error);
      }
    };

    fetchClinics();
  }, []);

  const handleSort = (field) => {
    const newDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(newDirection);
  };

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    if (typeof aValue === 'string') {
      return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    } else if (typeof aValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    } else {
      return 0;
    }
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={`container ${darkMode ? 'dark' : ''}`}>
      <div className="header">
        <h2>Clinic Data Table</h2>
        <label className="theme-toggle">
          <span>Dark</span>
          <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
        </label>
      </div>

      <table className={`data-table ${darkMode ? 'dark' : ''}`}>
        <thead>
          <tr>
            <th onClick={() => handleSort('id')}>ID</th>
            <th onClick={() => handleSort('name')}>Name</th>
            <th onClick={() => handleSort('address')}>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((clinic) => (
            <tr key={clinic.id}>
              <td>{clinic.id}</td>
              <td>{clinic.name}</td>
              <td>{clinic.address}</td>
              <td>
                <div className="actions">
                  <button
                    className="btn btn-update"
                    onClick={() => navigate(`/update-clinic/${clinic.id}`)} 
                  >
                    Update
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`page-link ${currentPage === number ? 'active' : ''}`}
          >
            {number}
          </button>
          
        ))}
<button className="btn btn-edit" style={{ marginLeft: '20px', marginTop:'5px'} } onClick={() => navigate(`/Addnewclinic`)} >Add</button>

      </div>
    </div>
  );
};

export default Addclinic;
