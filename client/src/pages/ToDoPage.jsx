import { useState, useEffect } from 'react';
import api from '../services/api';
import styles from './TodoPage.module.css';

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const { data } = await api.get('/api/todos');
        setTodos(data);
      } catch (error) {
        console.error('Failed to fetch todos', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const { data: newTodo } = await api.post('/api/todos', { text });
    setTodos([...todos, newTodo]);
    setText('');
  };

  const toggleComplete = async (id) => {
    const todo = todos.find((t) => t._id === id);
    const { data: updatedTodo } = await api.put(`/api/todos/${id}`, { completed: !todo.completed });
    setTodos(todos.map((t) => (t._id === id ? updatedTodo : t)));
  };

  const deleteTodo = async (id) => {
    await api.delete(`/api/todos/${id}`);
    setTodos(todos.filter((t) => t._id !== id));
  };

  if (loading) return <p>Loading todos...</p>;

  return (
    <div className={styles.todoPage}>
      <div className={styles.header}>
        <h1>My To-Do List</h1>
      </div>
      <div>
        {todos.map((todo) => (
          <div key={todo._id} className={styles.todoItem}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo._id)}
            />
            <p
              className={`${styles.todoText} ${todo.completed ? styles.completed : ''}`}
              onClick={() => toggleComplete(todo._id)}
            >
              {todo.text}
            </p>
            <button onClick={() => deleteTodo(todo._id)} className={styles.deleteButton}>Delete</button>
          </div>
        ))}
      </div>
      <form onSubmit={addTodo} className={styles.addForm}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TodoPage;