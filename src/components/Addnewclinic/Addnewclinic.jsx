import React, { useEffect, useState } from 'react';
import './Addnewclinic.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Addnewclinic = () => {
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [formData, setFormData] = useState({
    name_ar: '',
    name_en: '',
    city_id: '',
    address_ar: '',
    address_en: '',
    url_name: '',
    color: '',
    logo: null,  
    requirement_id: '',
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('https://medical-clinic.serv00.net/api/city', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.status) {
          setCities(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    const fetchRequirements = async () => {
      try {
        const response = await axios.get('https://medical-clinic.serv00.net/api/requirement', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.data) {
          setRequirements(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching requirements:', error);
      }
    };

    fetchCities();
    fetchRequirements();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      logo: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData(); 
    data.append('name_ar', formData.name_ar);
    data.append('name_en', formData.name_en);
    data.append('city_id', formData.city_id);
    data.append('address_ar', formData.address_ar);
    data.append('address_en', formData.address_en);
    data.append('url_name', formData.url_name);
    data.append('color', formData.color);
    data.append('logo', formData.logo);  
    data.append('requirement_id', formData.requirement_id);

    try {
      const response = await axios.post('https://medical-clinic.serv00.net/api/clinic', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.status) {
        alert('Clinic added successfully!');
        navigate('/Dashboard', { state: { role: 'super_admins' } });
      } else {
        alert('Error adding clinic: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="container">
      <div className="text">Add Clinic</div>
      <form onSubmit={handleSubmit}>
      <div className="form-row">
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
              name="color" 
              value={formData.color}
              onChange={handleInputChange}
              required 
            />
            <div className="underline"></div>
            <label htmlFor="color">Color</label>
          </div>
        </div>
        <div className="form-row">
        <div className="input-data">
            <input 
              type="text" 
              name="address_ar" 
              value={formData.address_ar}
              onChange={handleInputChange}
              required 
            />
            <div className="underline"></div>
            <label htmlFor="address_ar">Address (Arabic)</label>
          </div>

          <div className="input-data">
            <input 
              type="text" 
              name="address_en" 
              value={formData.address_en}
              onChange={handleInputChange}
              required 
            />
            <div className="underline"></div>
            <label htmlFor="address_en">Address (English)</label>

          </div>
          <div className="input-data">
            <input 
              type="text" 
              name="url_name" 
              value={formData.url_name}
              onChange={handleInputChange}
              required 
            />
            <div className="underline"></div>
            <label htmlFor="url_name">URL Name</label>
          </div>
        </div>
        <div className="form-row">
          

      

          <div className="input-data">
            <input 
              type="file" 
              name="logo"
              onChange={handleFileChange}
              required 
            />
            <div className="underline"></div>
            <label htmlFor="logo"></label>
          </div>

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
            <label htmlFor="city_id"></label>
          </div>

          <div className="input-data">
            <select 
              name="requirement_id" 
              value={formData.requirement_id}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Requirement</option>
              {requirements.map((req) => (
                <option key={req.id} value={req.id}>
                  {req.name}
                </option>
              ))}
            </select>
            <div className="underline"></div>
            <label htmlFor="requirement_id"></label>
          </div>
        </div>
        <div className="form-row submit-btn">
          <div className="input-data">
            <input type="submit" value="Submit" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Addnewclinic;
