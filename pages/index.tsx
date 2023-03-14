import { useState, useEffect } from 'react'
import { useSession, getProviders, signIn } from 'next-auth/react'
import { GetServerSideProps } from 'next'
import Default from '@/utils/default.json'
import TaskList from '@/components/task-list'

interface HomeProps {
  providers: Record<string, { id: string; name: string }>
}

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function Home({ providers }: HomeProps): JSX.Element {
  const { data: session, status } = useSession()
  const [error, setError] = useState<string | null>(null)
  const [initialized, setInitialized] = useState<boolean>(false)

  const [todos, setTodos] = useState<Todo[]>([])

  const handleToggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const handleDeleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
  }

  const handleAddTodo = (newTodo: Todo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo])
  }

  const handleSignIn = async (providerId: string) => {
    try {
      await signIn(providerId)
    } catch (error) {
      setError('Failed to sign in')
    }
  }

  // Update db everytime the todos state get updated
  useEffect(() => {
    if (session) {
      const updateUser = () => {
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user: session.user, tasks: todos }),
        }
        fetch(process.env.DB_UPDATE_USER_ENDPOINT || '', options)
      }

      updateUser()
    }
  }, [session, todos])

  // Init db
  useEffect(() => {
    if (session && !initialized) {
      const createUser = () => {
        if (!initialized) {
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user: session?.user, tasks: todos }),
          }
          fetch(process.env.DB_CREATE_USER_ENDPOINT || '', options)
        }
        setInitialized(true)
      }

      const getUser = async () => {
        try {
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user: session?.user }),
          }
          const response = await fetch(
            process.env.DB_GET_USER_ENDPOINT || '',
            options
          )
          const data = await response.json()
          // If user exist, set todos to user tasks
          if (data.ok) {
            setInitialized(true)
            setTodos(data.result.tasks)
            // Else create new user
          } else {
            createUser()
          }
        } catch (error) {
          console.error(error)
          setInitialized(true)
        }
      }

      getUser()
    }
  }, [session, initialized, todos])

  // Loading
  if (status === Default.status.loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>{Default.loading}</p>
      </div>
    )
  }

  // Show task list
  if (status === Default.status.authenticated) {
    return (
      <TaskList
        todos={todos}
        onToggle={handleToggleTodo}
        onDelete={handleDeleteTodo}
        onAdd={handleAddTodo}
      />
    )
  }

  // Sign in
  return (
    <>
      <h1 className="text-tl-light text-4xl md:text-7xl mb-16 font-extrabold md:w-3/4">
        {Default.landing_text}
      </h1>
      {Object.values(providers).map((provider) => (
        <div key={provider.id}>
          <button
            type="button"
            className="w-full h-auto py-3 px-5 text-lg md:w-96 md:text-2xl cursor-pointer text-tl-secondary bg-tl-primary rounded-sm font-russo"
            onClick={() => handleSignIn(provider.id)}
            aria-label={`Sign in with ${provider.name}`}
          >
            {Default.sign_in}
          </button>
        </div>
      ))}
      {error && <p className="text-red-500">{error}</p>}
    </>
  )
}

// Get auth provider
export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    const providers = await getProviders()
    return {
      props: {
        providers: { ...providers },
      },
    }
  } catch (error) {
    console.error('Error in page index: ', error)
    return {
      props: {
        providers: {},
      },
    }
  }
}
