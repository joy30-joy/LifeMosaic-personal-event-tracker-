// components/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [categoryStats, setCategoryStats] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      const eventResponse = await axios.get('http://localhost:5000/events', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      setEvents(eventResponse.data);

      const statsResponse = await axios.get('http://localhost:5000/stats', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      setCategoryStats(statsResponse.data);
    };

    fetchData();
  }, []);

  const data = Object.entries(categoryStats).map(([category, count]) => ({
    name: category,
    value: count,
  }));

  return (
    <div>
      <h2>Your Dashboard</h2>
      <PieChart width={400} height={400}>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>

      <h3>Events</h3>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <h4>{event.title}</h4>
            <p>{event.description}</p>
            <p>Category: {event.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
