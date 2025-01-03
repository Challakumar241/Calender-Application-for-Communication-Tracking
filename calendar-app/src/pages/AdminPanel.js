import React, { useEffect, useState } from 'react';
import AdminModule from '../components/AdminModule';
import CommunicationMethods from '../data/defaultCommunicationMethods'; // Default communication methods
  
const AdminPanel = () => {
    const [companies, setCompanies] = useState([]);
    const [communicationMethods, setCommunicationMethods] = useState(CommunicationMethods);

    useEffect(() => {
        const storedCompanies = JSON.parse(localStorage.getItem('companies')) || [];
        setCompanies(storedCompanies);
    }, []);

    const handleAddCompany = (company) => {
        const newCompany = { id: Date.now(), ...company };
        const updatedCompanies = [...companies, newCompany];
        setCompanies(updatedCompanies);
        localStorage.setItem('companies', JSON.stringify(updatedCompanies));
    };

    const handleRemoveCompany = (id) => {
        const updatedCompanies = companies.filter(company => company.id !== id);
        setCompanies(updatedCompanies);
        localStorage.setItem('companies', JSON.stringify(updatedCompanies));
    };

    return (
        <div>
            <h1>Admin Panel</h1>
            <AdminModule onAddCompany={handleAddCompany} />

            <h2>Existing Companies</h2>
            <ul>
                {companies.map((company) => (
                    <li key={company.id}>
                        {company.name}
                        <button onClick={() => handleRemoveCompany(company.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            <h2>Add Communication Method</h2>
            {/* Include logic to manage communication methods if needed */}
        </div>
    );
};

export default AdminPanel;
