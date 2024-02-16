import { useEffect, useState } from 'react'
import { TodoProvider } from './Contexts'

function App() {
  const [todos, setTodo] = useState([])

  const addTodo = (todo) => {
    setTodo((prev) => [{id: Date.now, ...todo}, ...prev])
  }
  const updateTodo = (id, todo) => {
    setTodo((prev) => prev.map((prevTodo ) => (prevTodo.id  === todo.id ? todo : prevTodo)))
  }
  const deleteTodo = (id) => {
    setTodo((prev) => prev.filter((todo) => todo.id != id))
  }
  const toggleComplete = (id) => {
    setTodo((prev) => prev.map(
      (prevTodo) => 
      prevTodo === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo
    )
    )
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [])
  
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if(todos && todos.length > 0) {
      setTodo(todos)
    }
  }, [todos])

  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>

    </TodoProvider>
  )
}

export default App
