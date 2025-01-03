import React, { useState } from 'react';
import CommunicationForm from './CommunicationForm';

const Dashboard = () => {
  const [communications, setCommunications] = useState([]);
  
  // List of companies (this can come from an API or a state)
  const companies = [
    { name: 'ABC Corp' },
    { name: 'XYZ Ltd' },
    { name: 'Sree SivaSakthi Enterprises' },
  ];
  const Dashboard = ({ events }) => {
    return (
        <div>
            <h2>Communication Logs</h2>
            <ul>
                {events.map((event, index) => (
                    <li key={index}>
                        {event.title} - {moment(event.start).format('MMM DD, YYYY')} to {moment(event.end).format('MMM DD, YYYY')}
                    </li>
                ))}
            </ul>
        </div>
    );
};

  const addCommunication = (communication) => {
    setCommunications([...communications, communication]);
  };

  return (
    <div>
      <h2>Communication Dashboard</h2>
      <CommunicationForm addCommunication={addCommunication} companies={companies} />

      <h3>Logged Communications:</h3>
      <ul>
        {communications.map((communication, index) => (
          <li key={index}>
            {communication.type} with {communication.company} on {communication.date}: {communication.notes}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
