import React, { useEffect, useState } from 'react';
import Dashboard from '../components/Dashboard'; 
import CommunicationModal from '../components/CommunicationModal'; 

const UserPanel = () => {
    const [companies, setCompanies] = useState([]);
    const [communications, setCommunications] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const storedCompanies = JSON.parse(localStorage.getItem('companies')) || [];
        const storedCommunications = JSON.parse(localStorage.getItem('communications')) || [];
        setCompanies(storedCompanies);
        setCommunications(storedCommunications);
    }, []);

    const handleLogCommunication = (communication) => {
        const newComm = { id: Date.now(), ...communication };
        const updatedCommunications = [...communications, newComm];
        setCommunications(updatedCommunications);
        localStorage.setItem('communications', JSON.stringify(updatedCommunications));
        setIsModalOpen(false);
    };

    return (
        <div>
            <h1>User Dashboard</h1>
            <button onClick={() => setIsModalOpen(true)}>Log Communication</button>
            <CommunicationModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                onLogCommunication={handleLogCommunication}
                companies={companies}
            />
            <Dashboard companies={companies} communications={communications} />
        </div>
    );
};

export default UserPanel;
