import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ViweBday.css";

const ViweBday = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [reminders, setReminders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [updateReminder, setUpdateReminder] = useState(null);
    const [countdown, setCountdown] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchReminders(selectedDate);
    }, [selectedDate]);

    const fetchReminders = async (date) => {
        setLoading(true);
        setError(null);

        try {
            const utcDate = new Date(
                Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
            );
            const formattedDate = utcDate.toISOString().split("T")[0];
            const response = await axios.get(
                `http://localhost:5000/api/dateBirthday?date=${formattedDate}`
            );
            setReminders(response.data);
        } catch (error) {
            setError("Failed to fetch reminders. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleDeleteReminder = async (reminderId) => {
        try {
            await axios.delete(`http://localhost:5000/api/reminders/${reminderId}`);
            fetchReminders(selectedDate);
        } catch (error) {
            setError("Failed to delete reminder. Please try again.");
        }
    };

    const handleUpdateReminder = (reminder) => {
        setUpdateReminder(reminder);
    };

    const handleUpdateReminderChange = (event) => {
        const { name, value } = event.target;
        setUpdateReminder({ ...updateReminder, [name]: value });
    };

    const handleUpdateReminderSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(
                `http://localhost:5000/api/reminders/${updateReminder._id}`,
                updateReminder
            );
            fetchReminders(selectedDate);
            setUpdateReminder(null);
        } catch (error) {
            setError("Failed to update reminder. Please try again.");
        }
    };

    const handleSendWishAndGift = (reminder) => {
        navigate("/sendwishandgift", {
            state: { id: reminder._id, email: reminder.email, wish: reminder.wish },
        });
    };

    const calculateCountdown = (targetDate) => {
        const now = new Date();
        const timeDifference = targetDate - now;

        if (timeDifference <= 0) {
            return "Time's up!";
        }

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        return {
            days,
            hours,
            minutes,
            seconds,
        };
    };

    useEffect(() => {
        if (reminders.length > 0) {
            const targetDate = new Date(reminders[0].date);

            const intervalId = setInterval(() => {
                const remainingTime = calculateCountdown(targetDate);
                if (remainingTime === "Time's up!") {
                    clearInterval(intervalId);
                }
                setCountdown(remainingTime);
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [reminders]);

    const formatCountdown = (time) => {
        if (!time) return { display: "" };
        return {
            display: `${time.days.toString().padStart(2, "0")} : ${time.hours
                .toString()
                .padStart(2, "0")} : ${time.minutes.toString().padStart(2, "0")} : ${time.seconds
                .toString()
                .padStart(2, "0")}`,
        };
    };

    const highlightDates = ({ date }) => {
        const formattedDate = date.toISOString().split("T")[0];
        return reminders.some(reminder => reminder.date === formattedDate)
            ? "highlight"
            : null;
    };

    const countdownDisplay = formatCountdown(countdown);

    return (
        <div className="birthday-reminder">
            <h1>Birthdays</h1>
            <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                tileClassName={highlightDates}
            />
            <div className="reminder-details">
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {reminders.length > 0 ? (
                    reminders.map((reminder, index) => (
                        <div key={index} className="reminder">
                            <h2>{reminder.name}'s Birthday</h2>
                            <p>Date: {new Date(reminder.date).toLocaleDateString()}</p>
                            <p>Time: {reminder.time}</p>
                            <p>Email: {reminder.email}</p>
                            <p>Wish: {reminder.wish}</p>
                            <p>Address: {reminder.address}</p>

                            {/* Countdown Timer */}
                            {countdown && (
                                <div className="countdown">
                                    <span>{countdownDisplay.display}</span>
                                </div>
                            )}

                            <div className="button-group">
                                <button onClick={() => handleDeleteReminder(reminder._id)}>
                                    Delete
                                </button>
                                <button onClick={() => handleUpdateReminder(reminder)}>
                                    Update
                                </button>
                                <button onClick={() => handleSendWishAndGift(reminder)}>
                                    Send Wish & Gift
                                </button>
                            </div>

                            {updateReminder && updateReminder._id === reminder._id && (
                                <div className="popup">
                                    <div className="popup-inner">
                                        <form onSubmit={handleUpdateReminderSubmit}>
                                            <input
                                                type="text"
                                                name="name"
                                                value={updateReminder.name}
                                                onChange={handleUpdateReminderChange}
                                            />
                                            <input
                                                type="email"
                                                name="email"
                                                value={updateReminder.email}
                                                onChange={handleUpdateReminderChange}
                                            />
                                            <input
                                                type="text"
                                                name="address"
                                                value={updateReminder.address}
                                                onChange={handleUpdateReminderChange}
                                            />
                                            <input
                                                type="text"
                                                name="wish"
                                                value={updateReminder.wish}
                                                onChange={handleUpdateReminderChange}
                                            />
                                            <input
                                                type="time"
                                                name="time"
                                                value={updateReminder.time}
                                                onChange={handleUpdateReminderChange}
                                            />
                                            <button type="submit">Update</button>
                                            <button className="close-btn" onClick={() => setUpdateReminder(null)}>Close</button>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No reminders for this date.</p>
                )}
            </div>
        </div>
    );
};

export default ViweBday;
