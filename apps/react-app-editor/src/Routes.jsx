import { Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Dashboard from './components/Dashboard.jsx';

function MyRoutes() {
  return (
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  )
}

export default MyRoutes;