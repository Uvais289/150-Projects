import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './index.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    title: '',
    status: 'pending',
    assignedTo: '',
    completionDateTime: new Date()
  });
  const [filterOptions, setFilterOptions] = useState({
    status: '',
    assignedTo: ''
  });
  const [sortBy, setSortBy] = useState('asc');
  const [page, setPage] = useState(1);
  // eslint-disable-next-line
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sortBy]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/todos?_page=${page}&_limit=${pageSize}&_sort=completionDateTime&_order=${sortBy}`);
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
          completionDateTime: new Date()
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

  const handleFilterChange = (filterType, value) => {
    setFilterOptions({ ...filterOptions, [filterType]: value });
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const totalPages = Math.ceil(todos.length / pageSize);

  const filteredTodos = todos.filter(todo => {
    return (
      (!filterOptions.status || todo.status === filterOptions.status) &&
      (!filterOptions.assignedTo || todo.assignedTo === filterOptions.assignedTo)
    );
  });

  return (
    <div className="container">
      <h1>Todo App</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Title"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        />
        <select
          value={newTodo.status}
          onChange={(e) => setNewTodo({ ...newTodo, status: e.target.value })}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <input
          type="text"
          placeholder="Assigned To"
          value={newTodo.assignedTo}
          onChange={(e) => setNewTodo({ ...newTodo, assignedTo: e.target.value })}
        />
        <DatePicker
          selected={newTodo.completionDateTime}
          onChange={(date) => setNewTodo({ ...newTodo, completionDateTime: date })}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="MMMM d, yyyy h:mm aa"
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <div className="filters">
        <Dropdown
          options={['', 'pending', 'completed']}
          value={filterOptions.status}
          placeholder="Filter by Status"
          onChange={(option) => handleFilterChange('status', option.value)}
        />
        <Dropdown
          options={['', 'John', 'Jane']}
          value={filterOptions.assignedTo}
          placeholder="Filter by Assigned To"
          onChange={(option) => handleFilterChange('assignedTo', option.value)}
        />
        <Dropdown
          options={['asc', 'desc']}
          value={sortBy}
          placeholder="Sort by Date"
          onChange={(option) => handleSortChange(option.value)}
        />
      </div>
      <div className="todos">
        {filteredTodos.map((todo) => (
          <div key={todo.id} className="todo">
            <h3>{todo.title}</h3>
            <p>Status: {todo.status}</p>
            <p>Assigned To: {todo.assignedTo}</p>
            <p>Completion Date & Time: {todo.completionDateTime}</p>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button disabled={page === 1} onClick={() => handlePageChange(page - 1)}>Previous</button>
        <span>{`Page ${page} of ${totalPages}`}</span>
        <button disabled={page === totalPages} onClick={() => handlePageChange(page + 1)}>Next</button>
      </div>
    </div>
  );
}

export default App;
