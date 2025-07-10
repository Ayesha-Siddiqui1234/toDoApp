import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit, FaSave } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos)
    }
  }, [])

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)
    saveToLS()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => item.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  }

  const ToggleFinished = () => {
    setshowFinished(!showFinished)
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-blue-100 min-h-[80vh]">
        <h1 className='font-bold text-center text-2xl text-slate-900 mb-6'> Task Manager - Manage Your Todos</h1>

        <div className="addTodo mb-8">
          <h2 className="text-lg font-bold mb-3">Add Todo</h2>

        
          <div className="flex flex-col items-center gap-3 w-full sm:w-1/2 mx-auto">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className='w-full border border-gray-300 rounded-lg p-2'
              placeholder='Enter your todo here...'
            />
          
            <button
              className='btn w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg '
              onClick={handleAdd}
              disabled={todo.length < 3}
            >
              <FaSave />
              Save
            </button>
          </div>
        </div>

    
        <div className="mb-4 flex items-center gap-2">
          <input
            type="checkbox"
            checked={showFinished}
            onChange={ToggleFinished}
          />
          <label>Show Finished</label>
        </div>

        <h2 className='text-lg font-bold mb-3'>Your Todos</h2>

        <div className="todos space-y-3">
          {todos.length === 0 && <div className='text-gray-500'>No todos added yet!</div>}

          {todos.map(item => {
            return (showFinished || !item.isCompleted) && (
              <div key={item.id} className="todo flex items-center gap-3 bg-white p-3 rounded-lg shadow">
                <input
                  name={item.id}
                  onChange={handleCheckbox}
                  type="checkbox"
                  checked={item.isCompleted}
                />
                <p className={`${item.isCompleted ? "line-through text-gray-600" : "text-gray-800"} flex-1`}>
                  {item.todo}
                </p>

              
                <div className="buttons flex gap-2">
                  <button
                    className="btn flex items-center gap-1 bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                    onClick={(e) => handleEdit(e, item.id)}
                  >
                    <FaEdit />
                    Edit
                  </button>

                  <button
                    className="btn flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={(e) => handleDelete(e, item.id)}
                  >
                    <MdDelete />
                    Delete
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default App
