'use client'
import { useEffect, useState } from "react";
import Todo from "@/components/Todo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [allTodos, setAllTodos] = useState([]);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({ ...formData, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api', formData);

      toast.success(response.data.msg);
      setFormData({ title: "", description: "" });
      fetchAllTodos();
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    }
  };

  const fetchAllTodos = async () => {
    try {
      const response = await axios.get('/api');
      setAllTodos(response.data.todos);
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete('/api', {
        params: {
          mongoId: id
        }
      });
      toast.success(response.data.msg);
      fetchAllTodos();
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    }
  }

  const updateTodo = async (id) => {
    try {
      const response = await axios.put('/api', {}, {
        params: {
          mongoId: id
        }
      })
      toast.success(response.data.msg);
      fetchAllTodos();
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    }
  }

  useEffect(() => {
    fetchAllTodos();
  }, []);

  return (
    <>
      <ToastContainer
        position="bottom-right"
        theme="dark"
      />
      <form className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-24 px-2 mx-auto" onSubmit={onSubmitHandler}>
        <input
          type="text"
          name='title'
          value={formData.title}
          placeholder="Enter title"
          onChange={onChangeHandler}
          className="px-3 py-2 border-2 w-full outline-none rounded-md"
        />
        <textarea
          name="description"
          value={formData.description}
          placeholder="Enter description"
          onChange={onChangeHandler}
          className="px-3 py-2 border-2 w-full resize-y outline-none rounded-md"
        >
        </textarea>
        <button type="submit" className="bg-orange-600 py-3 px-11 text-white rounded-md">Add Todo</button>
      </form>

      <div className=" w-max mt-24 px-2 mx-auto relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {
              allTodos.map((todo, i) => {
                return (
                  <Todo key={i} todo={todo} index={i} onDelete={deleteTodo} onUpdate={updateTodo} />
                )
              })
            }
          </tbody>
        </table>
      </div>



    </>
  );
}
