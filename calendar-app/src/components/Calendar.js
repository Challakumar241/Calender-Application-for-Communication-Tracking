import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";

const localizer = momentLocalizer(moment);

const CommunicationCalendar = () => {
    const [events, setEvents] = useState([]);

    const handleAddEvent = () => {
        const title = prompt("Enter the event title:");
        const start = new Date(prompt("Enter the start date (YYYY-MM-DD):"));
        const end = new Date(prompt("Enter the end date (YYYY-MM-DD):"));

        if (title && start && end) {
            setEvents([...events, { title, start, end }]);
        }
    };

    return (
        <div>
            <h2>Communication Calendar</h2>
            <button onClick={handleAddEvent}>Add Event</button>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500, margin: "50px" }}
            />
        </div>
    );
};

export default CommunicationCalendar;
