import React, { useState } from 'react';
import './CommunicationForm.css';

const CommunicationForm = ({ addCommunication, companies, scheduleEvent }) => {
  const [communicationType, setCommunicationType] = useState('');
  const [communicationDate, setCommunicationDate] = useState('');
  const [communicationNotes, setCommunicationNotes] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');

  const communicationMethods = [
    { methodName: 'Email', description: 'Communication via email' },
    { methodName: 'Phone', description: 'Communication via phone call' },
    { methodName: 'In-Person', description: 'Communication in person' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!communicationType || !communicationDate || !communicationNotes || !selectedCompany) {
      alert('Please fill in all fields');
      return;
    }

    const newCommunication = {
      type: communicationType,
      date: communicationDate,
      notes: communicationNotes,
      company: selectedCompany,
    };

    try {
      console.log('Logging Communication:', newCommunication);
      addCommunication(newCommunication); // Call the function to log communication
      scheduleEvent(newCommunication); // Schedule the event in the calendar
    } catch (error) {
      console.error('Error logging communication or scheduling event:', error);
      alert('An error occurred while processing your request. Please try again.');
    }

    // Reset the form fields
    setCommunicationType('');
    setCommunicationDate('');
    setCommunicationNotes('');
    setSelectedCompany('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Select Company:</label>
        <select
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
        >
          <option value="">-- Select Company --</option>
          {companies && companies.length > 0 ? (
            companies.map((company, index) => (
              <option key={index} value={company.name}>
                {company.name}
              </option>
            ))
          ) : (
            <option disabled>No companies available</option>
          )}
        </select>

        <label>Select Communication Type:</label>
        <select
          value={communicationType}
          onChange={(e) => setCommunicationType(e.target.value)}
        >
          <option value="">-- Select Type of Communication --</option>
          {communicationMethods.map((method, index) => (
            <option key={index} value={method.methodName}>
              {method.methodName} - {method.description}
            </option>
          ))}
        </select>

        <label>Date:</label>
        <input
          type="date"
          value={communicationDate}
          onChange={(e) => setCommunicationDate(e.target.value)}
        />

        <label>Communication Notes:</label>
        <textarea
          value={communicationNotes}
          onChange={(e) => setCommunicationNotes(e.target.value)}
        ></textarea>

        <button type="submit">Log Communication</button>
      </form>
    </div>
  );
};

export default CommunicationForm;
