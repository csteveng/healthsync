import { Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Dashboard from './pages/Dashboard';
import ComingSoon from './pages/ComingSoon';

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/meds" element={<ComingSoon title="Medications" />} />
        <Route path="/logs" element={<ComingSoon title="Health Logs" />} />
        <Route path="/calendar" element={<ComingSoon title="Medical Calendar" />} />
        <Route path="/alerts" element={<ComingSoon title="Alerts & Authorizations" />} />
      </Route>
    </Routes>
  );
}
