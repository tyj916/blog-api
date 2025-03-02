import { Link, Outlet } from 'react-router-dom'
import './styles/App.css'

function App() {
  return (
    <>
      <nav>
        <div>
          <Link to='/'><h1>title</h1></Link>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/new">Create New</Link></li>
            <li><a href={`${import.meta.env.VITE_BLOG_APP_URL}/logout`}>Log Out</a></li>
          </ul>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App
