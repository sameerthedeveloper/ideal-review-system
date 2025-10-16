import './App.css'
import { Routes, Route, HashRouter } from 'react-router-dom'
import MainReview from './components/mainReview'
import AdminPanel from './components/adminPanel'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'



function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/review/:staffId" element={<MainReview />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </HashRouter>
  )
}

export default App
