// components/TodoList.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchTodos();
    }
  }, [isLoaded, isSignedIn]);

  function fetchTodos() {
    axios.get('/api/todo')
      .then(response => {
        console.log(response.data);
        setTodos(response.data);
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
      });
  }

  function addTodo(e) {
    e.preventDefault();
    if (newTodo.trim() === '') return;
    axios.post('/api/todo', { title: newTodo })
      .then(response => {
        setTodos([...todos, response.data]);
        setNewTodo('');
      })
      .catch(error => {
        console.error('Error adding todo:', error);
      });
  }

  function updateTodo(id, completed) {
    axios.put(`/api/todo/${id}`, { completed })
      .then(() => {
        setTodos(todos.map(todo => 
          todo._id === id ? { ...todo, completed } : todo
        ));
      })
      .catch(error => {
        console.error('Error updating todo:', error);
      });
  }

  function deleteTodo(id) {
    axios.delete(`/api/todo/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch(error => {
        console.error('Error deleting todo:', error);
      });
  }

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Todo List</h1>
        <form onSubmit={addTodo} className="mb-6">
          <div className="flex items-center border-b border-gray-300 py-2">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new todo"
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            />
            <button type="submit" className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded">
              Add Todo
            </button>
          </div>
        </form>
        <ul className="divide-y divide-gray-200">
          {todos.map((todo) => (
            <li key={todo._id} className="py-4 flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => updateTodo(todo._id, !todo.completed)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className={`ml-3 text-gray-900 ${todo.completed ? 'line-through' : ''}`}>{todo.title}</span>
              <button 
                onClick={() => deleteTodo(todo._id)}
                className="ml-auto bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
