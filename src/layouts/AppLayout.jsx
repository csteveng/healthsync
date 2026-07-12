import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import MobileTopBar from '../components/MobileTopBar';
import BottomNav from '../components/BottomNav';
import SaveErrorBanner from '../components/SaveErrorBanner';
import { useHealthData } from '../context/HealthDataContext';

export default function AppLayout() {
  const { saveError } = useHealthData();

  return (
    <div className="min-h-screen bg-surface md:flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <MobileTopBar />
        {saveError && <SaveErrorBanner />}
        <main className="flex-1 pb-24 md:pb-0">
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
