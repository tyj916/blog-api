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
            <li><Link to="/logout">Log Out</Link></li>
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
