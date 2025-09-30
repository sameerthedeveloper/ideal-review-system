import './App.css'
import { Routes, Route, HashRouter } from 'react-router-dom'
import MainReview from './components/mainReview'
import AdminPanel from './components/adminPanel'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/review/:staffId" element={<MainReview />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </HashRouter>
  )
}

export default App
