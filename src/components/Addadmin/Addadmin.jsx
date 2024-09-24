import React, { useEffect, useState } from 'react';
import './Addadmin.css';
import { useNavigate } from 'react-router-dom';

const MyForm = () => {
  const navigate = useNavigate(); 
  const [cities, setCities] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    city_id: '',
    specialization_id: '',
    clinic_id: '',
    role_id: '',
    gender: '',
    name_ar: '',
    name_en: '',
    phone_number: '',
    email: '',
    birth_date: ''
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const response = await fetch('https://medical-clinic.serv00.net/api/clinic', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (data.status) {
          setClinics(data.data);
        }
      } catch (error) {
        console.error('Error fetching clinics:', error);
      }
    };

    fetchClinics();
  }, [token]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch('https://medical-clinic.serv00.net/api/city', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (data.status) {
          setCities(data.data);
        }
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, [token]);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await fetch('https://medical-clinic.serv00.net/api/permissions/admin', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (data.status) {
          setPermissions(data.data);
        }
      } catch (error) {
        console.error('Error fetching permissions:', error);
      }
    };

    fetchPermissions();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://medical-clinic.serv00.net/api/actor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.status) {
        alert('Admin added successfully!');
        navigate('/Dashboard', { state: { role: 'super_admins' } });
      } else {
        alert('Error adding admin: ' + data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="text">Add Admin</div>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="input-data">
              <input 
                type="text" 
                name="username" 
                value={formData.username}
                onChange={handleInputChange}
                required 
              />
              <div className="underline"></div>
              <label htmlFor="username">Username</label>
            </div>
            <div className="input-data">
              <input 
                type="text" 
                name="password" 
                value={formData.password}
                onChange={handleInputChange}
                required 
              />
              <div className="underline"></div>
              <label htmlFor="password">Password</label>
            </div>
            <div className="input-data">
              <input 
                type="text" 
                name="name_ar" 
                value={formData.name_ar}
                onChange={handleInputChange}
                required 
              />
              <div className="underline"></div>
              <label htmlFor="name_ar">Name (Arabic)</label>
            </div>
            <div className="input-data">
              <input 
                type="text" 
                name="name_en" 
                value={formData.name_en}
                onChange={handleInputChange}
                required 
              />
              <div className="underline"></div>
              <label htmlFor="name_en">Name (English)</label>
            </div>
            <div className="input-data">
              <input 
                type="text" 
                name="phone_number" 
                value={formData.phone_number}
                onChange={handleInputChange}
                required 
              />
              <div className="underline"></div>
              <label htmlFor="phone_number">Phone Number</label>
            </div>
            <div className="input-data">
              <input 
                type="text" 
                name="birth_date" 
                value={formData.birth_date}
                onChange={handleInputChange}
                required 
              />
              <div className="underline"></div>
              <label htmlFor="birth_date">Birth Date</label>
            </div>
          </div>

          <div className="form-row">
            <div className="input-data">
              <input 
                type="email" 
                name="email" 
                value={formData.email}
                onChange={handleInputChange}
                required 
              />
              <div className="underline"></div>
              <label htmlFor="email">Email Address</label>
            </div>
          </div>

          <div className="form-row">
            <div className="input-data">
              <select 
                name="role_id" 
                value={formData.role_id}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Role</option>
                <option value="1">Super Admin</option>
                <option value="2">Admin</option>
              </select>
              <div className="underline"></div>
              <label htmlFor="role_id">Role</label>
            </div>
            <div className="input-data">
              <select 
                name="clinic_id" 
                value={formData.clinic_id}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Clinic</option>
                {clinics.map((clinic) => (
                  <option key={clinic.id} value={clinic.id}>
                    {clinic.name}
                  </option>
                ))}
              </select>
              <div className="underline"></div>
              <label htmlFor="clinic_id">Clinic</label>
            </div>
          </div>

          <div className="form-row">
            <div className="input-data">
              <select 
                name="city_id" 
                value={formData.city_id}
                onChange={handleInputChange}
                required
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
              <div className="underline"></div>
              <label htmlFor="city_id">City</label>
            </div>

            <div className="input-data">
              <select 
                name="gender" 
                value={formData.gender}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="1">Male</option>
                <option value="2">Female</option>
              </select>
              <div className="underline"></div>
              <label htmlFor="gender">Gender</label>
            </div>
          </div>

          <div className="form-row">
            <div className="input-data">
              <select 
                name="specialization_id" 
                value={formData.specialization_id}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Permissions</option>
                {permissions.map((permission) => (
                  <option key={permission.id} value={permission.id}>
                    {permission.name}
                  </option>
                ))}
              </select>
              <div className="underline"></div>
              <label htmlFor="specialization_id"></label>
            </div>
          </div>

          <div className="form-row">
          <button className="back" onClick={()=>{  navigate('/Dashboard', { state: { role: 'super_admins' } })}}>back to dashboard</button>

            <div className="input-data textarea">
              <div className="form-row submit-btn">
                <div className="input-data">
                  <div className="inner"></div>
                  <input type="submit" value="Submit" />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default MyForm;
