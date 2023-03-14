import React, { useState } from 'react'
import Image from 'next/image'
import Default from '@/utils/default.json'

interface Todo {
  id: number
  text: string
  completed: boolean
}

interface Props {
  todos: Todo[]
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onAdd: (newTodo: Todo) => void
}

const TaskList: React.FC<Props> = ({ todos, onToggle, onDelete, onAdd }) => {
  const [newTodoText, setNewTodoText] = useState('')

  const handleNewTodoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoText(event.target.value)
  }

  const handleNewTodoSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (newTodoText.trim() === '') return null

    const newTodo: Todo = {
      id: todos.length ? todos[todos.length - 1].id + 1 : 1,
      text: newTodoText,
      completed: false,
    }

    setNewTodoText('')
    onAdd(newTodo)
  }

  return (
    <div>
      <form
        onSubmit={handleNewTodoSubmit}
        className="flex flex-row mb-7 md:mb-16"
      >
        <input
          type="text"
          value={newTodoText}
          onChange={handleNewTodoChange}
          placeholder={Default.task_list.input_text_placeholder}
          className="py-1 md:py-3 px-3 md:px-7 bg-tl-light rounded-l-sm outline-none focus:ring-0 text-lg w-full"
        />
        <button
          type="submit"
          className="rounded-r-sm px-3 md:px-7 text-tl-secondary bg-tl-primary md:text-lg font-extrabold font-russo outline-none focus:ring-0"
        >
          {Default.task_list.button_add_task}
        </button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="mb-3 bg-tl-secondary rounded-sm py-3 px-3 md:px-7 flex flex-row justify-between"
          >
            <label className="text-tl-light flex flex-row">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                className={`appearance-none mr-3 md:mr-5 border-0 rounded-sm w-5 h-5 ${
                  todo.completed ? 'bg-tl-primary' : 'bg-tl-light'
                }`}
              />
              {todo.text}
            </label>
            <button
              type="button"
              onClick={() => onDelete(todo.id)}
              className="text-tl-primary font-extrabold"
            >
              <Image
                src="/icons/close.png"
                alt="Close"
                width={26}
                height={26}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TaskList
