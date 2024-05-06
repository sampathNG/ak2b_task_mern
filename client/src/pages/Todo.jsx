import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
var idd;
const Todo = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [make, setMake] = useState(false);
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [editData, setEditData] = useState({
    title: "",
    description: "",
  });
  const createTodo = () => {
    setMake(true);
  };
  const handleTodoForm = (id) => {
    setEdit(true);
    idd = id;
    console.log(idd);
    return id;
  };
  const handleClick = () => {
    localStorage.clear();
    navigate("/signin");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleChanges = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { title, description } = formData;
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/todo",
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("todo added sucefully", response);
      navigate("/todo");
      setMake(false);
    } catch (err) {
      console.error(err);
    }
  };
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`http://localhost:5000/todo/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      console.log("todo deleted sucefully", response);
      navigate("/todo");
    } catch (err) {
      console.error(err);
    }
  };
  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      const updatingId = idd;
      const { title, description } = editData;
      const data = {
        title,
        description,
      };
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/todo/${updatingId}`,
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/todo");
      setEdit(false);
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === updatingId ? { ...todo, title, description } : todo
        )
      );
      console.log("todo deleted sucefully", response);
      navigate("/todo");
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/todos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  });
  return (
    <div className="grid">
      <header className="bg-blue-500 w-screen h-20 flex justify-around items-start text-center">
        <h1 className="text-slate-800 text-xl text-center mt-6">
          AK2B MERN TASK
        </h1>
        <button
          className="text-blue-700 mt-6 h-8 w-32 font-normal border-2 text-xl border-solid border-blue-700 bg-white hover:bg-black hover:text-white"
          onClick={createTodo}
        >
          Add Todo
        </button>
        <button
          onClick={handleClick}
          className="text-blue-700 mt-6 h-8 w-32 font-normal border-2 text-xl border-solid border-blue-700 bg-white hover:bg-black hover:text-white"
        >
          Log out
        </button>
      </header>
      {make && (
        <div className="mt-32 flex justify-center ">
          <form className="w-4/12	   grid">
            <label className="ml-5">Title</label>
            <input
              type="string"
              id="title"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="focus:outline-none h-10 border border-solid border-gray-400 py-6 px-4 m-5"
              required
              autoComplete="off"
            />
            <label className="ml-5">Description</label>
            <input
              type="string"
              id="description"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="focus:outline-none h-20 border border-solid border-gray-400 py-6 px-4 m-5 "
              required
              autoComplete="off"
            />
            <button
              type="submit"
              className="bg-blue-700 text-white font-semibold  p-4 rounded  m-5 hover:bg-black"
              onClick={handleSubmit}
            >
              Add Todo
            </button>
          </form>
        </div>
      )}
      {!make && (
        <div className="mt-8 mx-auto w-4/5">
          <h2 className="text-2xl font-semibold mb-4">Todos</h2>
          <ul>
            {todos.map((todo) => (
              <li key={todo._id} className="mb-4">
                <h3 className="text-lg font-semibold">{todo.title}</h3>
                <h5 className="text-black">{todo.description}</h5>
                <div>
                  <button
                    type="submit"
                    className="bg-blue-700 text-white font-semibold  p-4 rounded  m-5 hover:bg-black"
                    onClick={() => {
                      handleTodoForm(todo._id);
                    }}
                  >
                    Update
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-700 text-white font-semibold  p-4 rounded  m-5 hover:bg-black"
                    onClick={() => handleDelete(todo._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {edit && (
        <div className="mt-32 flex justify-center ">
          <form className="w-4/12	   grid">
            <label className="ml-5">Title</label>
            <input
              type="string"
              id="title"
              name="title"
              placeholder="Title"
              value={editData.title}
              onChange={handleChanges}
              className="focus:outline-none h-10 border border-solid border-gray-400 py-6 px-4 m-5"
              required
              autoComplete="off"
            />
            <label className="ml-5">Description</label>
            <input
              type="string"
              id="description"
              name="description"
              placeholder="Description"
              value={editData.description}
              onChange={handleChanges}
              className="focus:outline-none h-20 border border-solid border-gray-400 py-6 px-4 m-5 "
              required
              autoComplete="off"
            />
            <button
              type="submit"
              className="bg-blue-700 text-white font-semibold  p-4 rounded  m-5 hover:bg-black"
              onClick={handleUpdate}
            >
              Update
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
export default Todo;
