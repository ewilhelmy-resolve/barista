import { Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import ClusterDashboard from './pages/ClusterDashboard'
import GlobalSettings from './pages/GlobalSettings'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/cluster-dashboard" replace />} />
        <Route path="/cluster-dashboard" element={<ClusterDashboard />} />
        <Route path="/global-settings" element={<GlobalSettings />} />
      </Route>
    </Routes>
  )
}

export default App
