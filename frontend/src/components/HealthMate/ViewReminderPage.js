import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ViewReminderPage() {
    const { id } = useParams();
    const [reminder, setReminder] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchReminder = async () => {
            try {
                const response = await fetch(`http://localhost:5000/health/${id}`);
                if (!response.ok) throw new Error('Failed to fetch reminder');
                const data = await response.json();
                setReminder(data);
            } catch (error) {
                setErrorMessage('Failed to fetch reminder.');
            }
        };

        fetchReminder();
    }, [id]);

    if (errorMessage) return <p className="error">{errorMessage}</p>;
    if (!reminder) return <p>Loading...</p>;

    return (
        <div className="container">
            <h2>View Reminder</h2>
            <div>
                <h3>Reminder Type: {reminder.reminderType}</h3>
                <p>Description: {reminder.description}</p>
                <p>Days: {reminder.days}</p>
                <p>Time: {reminder.time}</p>
            </div>
        </div>
    );
}

export default ViewReminderPage;
