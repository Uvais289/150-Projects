import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    title: '',
    status: 'pending',
    assignedTo: '',
    completionDateTime: ''
  });

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    try {
      const response = await axios.post('http://localhost:3000/todos', newTodo);
      if (response.status === 201) {
        fetchTodos();
        setNewTodo({
          title: '',
          status: 'pending',
          assignedTo: '',
          completionDateTime: ''
        });
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/todos/${id}`);
      if (response.status === 200) {
        fetchTodos();
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div>
      <h1>Todo App</h1>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          value={newTodo.status}
          onChange={(e) => setNewTodo({ ...newTodo, status: e.target.value })}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div>
        <label htmlFor="assignedTo">Assigned To:</label>
        <input
          type="text"
          id="assignedTo"
          value={newTodo.assignedTo}
          onChange={(e) => setNewTodo({ ...newTodo, assignedTo: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="completionDateTime">Completion Date & Time:</label>
        <input
          type="datetime-local"
          id="completionDateTime"
          value={newTodo.completionDateTime}
          onChange={(e) => setNewTodo({ ...newTodo, completionDateTime: e.target.value })}
        />
      </div>
      <button onClick={addTodo}>Add Todo</button>
      <hr />
      <div>
        {todos.map((todo) => (
          <div key={todo.id}>
            <h3>{todo.title}</h3>
            <p>Status: {todo.status}</p>
            <p>Assigned To: {todo.assignedTo}</p>
            <p>Completion Date & Time: {todo.completionDateTime}</p>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
} 

export default App;
