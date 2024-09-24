import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateClinic = () => {
  const { id } = useParams();
  const [clinicData, setClinicData] = useState(null);
  const [contactInfos, setContactInfos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClinicData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`https://medical-clinic.serv00.net/api/clinic/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const result = await response.json();
        if (result.status) {
          setClinicData(result.data);
          setContactInfos(result.data.contact_information);
        } else {
          console.error('Failed to fetch clinic data:', result.message);
        }
      } catch (error) {
        console.error('Error fetching clinic data:', error);
      }
    };

    fetchClinicData();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
  
    const updatedData = {
      name: clinicData.name,
      address: clinicData.address,
      contactInfos: contactInfos.map((info) => ({
        [`contactInfos[${info.communication_type_id}][value]`]: info.value
      }))
    };
  
    const formattedData = {
      name: clinicData.name,
      address: clinicData.address,
    };
  
    contactInfos.forEach((info) => {
      formattedData[`contactInfos[${info.communication_type_id}][value]`] = info.value;
    });
  
    try {
      const response = await fetch(`https://medical-clinic.serv00.net/api/clinic/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formattedData)
      });
  
      const result = await response.json();
      if (result.status) {
        navigate('/addclinic'); 
      } else {
        console.error('Failed to update clinic:', result.message);
      }
    } catch (error) {
      console.error('Error updating clinic:', error);
    }
  };
  

  if (!clinicData) return <div>Loading...</div>;

  return (
    <div>
      <h2>Update Clinic {clinicData.name}</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={clinicData.name}
            onChange={(e) => setClinicData({ ...clinicData, name: e.target.value })}
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            value={clinicData.address}
            onChange={(e) => setClinicData({ ...clinicData, address: e.target.value })}
          />
        </div>
        {contactInfos.map((info, index) => (
          <div key={info.id}>
            <label>Contact {index + 1}:</label>
            <input
              type="text"
              value={info.value}
              onChange={(e) => {
                const newContactInfos = [...contactInfos];
                newContactInfos[index].value = e.target.value;
                setContactInfos(newContactInfos);
              }}
            />
          </div>
        ))}
        <button type="submit">Update Clinic</button>
      </form>
    </div>
  );
};

export default UpdateClinic;
