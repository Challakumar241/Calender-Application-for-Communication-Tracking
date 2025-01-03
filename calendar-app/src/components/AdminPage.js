import React, { useState, useEffect } from 'react';
import './AdminPage.css';

const AdminPage = ({ setCompanies, companies }) => {
  const [companyDetails, setCompanyDetails] = useState({
    name: '',
    location: '',
    linkedin: '',
    email: '',
    phone: '',
    comments: ''
  });

  const [communicationMethods, setCommunicationMethods] = useState([]);
  const [communicationDetails, setCommunicationDetails] = useState({
    methodName: '',
    description: '',
    sequenceOrder: '',
    isMandatory: false
  });
  const [editingIndex, setEditingIndex] = useState(null);

  // Load saved companies and communication methods from localStorage
  useEffect(() => {
    const storedCompanies = JSON.parse(localStorage.getItem('companies'));
    const storedMethods = JSON.parse(localStorage.getItem('communicationMethods'));
    if (storedCompanies) {
      setCompanies(storedCompanies);
    }
    if (storedMethods) {
      setCommunicationMethods(storedMethods);
    }
  }, [setCompanies]);

  // Save companies and communication methods to localStorage when they change
  useEffect(() => {
    if (companies.length > 0) {
      localStorage.setItem('companies', JSON.stringify(companies));
    }
    if (communicationMethods.length > 0) {
      localStorage.setItem('communicationMethods', JSON.stringify(communicationMethods));
    }
  }, [companies, communicationMethods]);

  const handleCompanyInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyDetails({
      ...companyDetails,
      [name]: value
    });
  };

  const handleAddCompany = () => {
    setCompanies([...companies, companyDetails]);
    setCompanyDetails({ name: '', location: '', linkedin: '', email: '', phone: '', comments: '' });
  };

  const handleRemoveCompany = (index) => {
    setCompanies(companies.filter((_, i) => i !== index));
  };

  const handleCommunicationInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCommunicationDetails({
      ...communicationDetails,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleAddCommunicationMethod = () => {
    if (editingIndex !== null) {
      // Edit mode: Update existing method
      const updatedMethods = [...communicationMethods];
      updatedMethods[editingIndex] = communicationDetails;
      setCommunicationMethods(updatedMethods);
      setEditingIndex(null);
    } else {
      // Add new method
      setCommunicationMethods([...communicationMethods, communicationDetails]);
    }

    setCommunicationDetails({
      methodName: '',
      description: '',
      sequenceOrder: '',
      isMandatory: false
    });
  };

  const handleEditCommunicationMethod = (index) => {
    setEditingIndex(index);
    setCommunicationDetails(communicationMethods[index]);
  };

  const handleRemoveCommunicationMethod = (index) => {
    setCommunicationMethods(communicationMethods.filter((_, i) => i !== index));
  };

  return (
    <div className="admin-page">
      <h2>Admin - Add Company</h2>
      <div className="company-form">
        <input
          type="text"
          name="name"
          placeholder="Company Name"
          value={companyDetails.name}
          onChange={handleCompanyInputChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={companyDetails.location}
          onChange={handleCompanyInputChange}
        />
        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn Profile"
          value={companyDetails.linkedin}
          onChange={handleCompanyInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={companyDetails.email}
          onChange={handleCompanyInputChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={companyDetails.phone}
          onChange={handleCompanyInputChange}
        />
        <textarea
          name="comments"
          placeholder="Additional Comments"
          value={companyDetails.comments}
          onChange={handleCompanyInputChange}
        ></textarea>
        <button onClick={handleAddCompany}>Add Company</button>
      </div>

      <div className="existing-companies">
        <h3>Existing Companies</h3>
        {companies.length > 0 ? (
          <ul>
            {companies.map((company, index) => (
              <li key={index}>
                <div>
                  <strong>{company.name}</strong> - {company.location} <br />
                  LinkedIn: {company.linkedin} <br />
                  Email: {company.email}, Phone: {company.phone} <br />
                  Comments: {company.comments}
                </div>
                <button onClick={() => handleRemoveCompany(index)}>Remove</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No companies added yet.</p>
        )}
      </div>

      <h2>Admin - Add/Edit Communication Method</h2>
      <div className="communication-method-form">
        <input
          type="text"
          name="methodName"
          placeholder="Method Name"
          value={communicationDetails.methodName}
          onChange={handleCommunicationInputChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={communicationDetails.description}
          onChange={handleCommunicationInputChange}
        ></textarea>
        <input
          type="number"
          name="sequenceOrder"
          placeholder="Sequence Order"
          value={communicationDetails.sequenceOrder}
          onChange={handleCommunicationInputChange}
        />
        <label>
          <input
            type="checkbox"
            name="isMandatory"
            checked={communicationDetails.isMandatory}
            onChange={handleCommunicationInputChange}
          />
          Mandatory
        </label>
        <button onClick={handleAddCommunicationMethod}>
          {editingIndex !== null ? 'Update Method' : 'Add Method'}
        </button>
      </div>

      <div className="existing-communication-methods">
        <h3>Existing Communication Methods</h3>
        {communicationMethods.length > 0 ? (
          <ul>
            {communicationMethods.map((method, index) => (
              <li key={index}>
                <div>
                  <strong>{method.methodName}</strong> - {method.description} <br />
                  Sequence Order: {method.sequenceOrder} <br />
                  {method.isMandatory ? 'Mandatory' : 'Optional'}
                </div>
                <button onClick={() => handleEditCommunicationMethod(index)}>Edit</button>
                <button onClick={() => handleRemoveCommunicationMethod(index)}>Remove</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No communication methods added yet.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
