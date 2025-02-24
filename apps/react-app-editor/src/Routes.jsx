import { Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Dashboard from './components/Dashboard.jsx';
import Editor from './components/Editor.jsx';
import NotFound from './components/error/NotFound.jsx';

function MyRoutes() {
  return (
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<Dashboard />} />
        <Route path='new' element={<Editor />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default MyRoutes;