import { useLoaderData } from 'react-router-dom'

export const AdminDashboard: React.FC = () => {

  const todos = useLoaderData();
  return (
    <div>
        <h1 className="font-bold text-2xl text-center">Dashboard</h1>
        <p>this is a test for dashboard</p>
        <p>You are in the dashboard amin component</p>

        <h2>TODOS</h2>
        {
          todos.map(todo => (
            <div key={todo.id}>{ todo.title }</div>
          ))
        }
    </div>
  )
};