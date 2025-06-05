import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState('');

  // Fetch tasks from backend
  const fetchTasks = () => {
    fetch('http://localhost:5000/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error("Fetch error:", err));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Handle form submission
  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTitle.trim() === '') return;

    fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle })
    })
      .then(res => res.json())
      .then(() => {
        setNewTitle('');
        fetchTasks();
      })
      .catch(err => console.error("Add task error:", err));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Task Manager</h1>

      <form onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Enter a task"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{ padding: '8px', width: '70%' }}
        />
        <button type="submit" style={{ padding: '8px 16px', marginLeft: '10px' }}>
          Add
        </button>
      </form>

      <ul style={{ marginTop: '20px' }}>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} — {task.completed ? "✅ Done" : "⏳ Pending"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
