import GreetingHeader from '../components/GreetingHeader';
import TodaysMedicationsCard from '../components/TodaysMedicationsCard';
import BloodPressureCard from '../components/BloodPressureCard';
import HeartRateCard from '../components/HeartRateCard';
import NextAppointmentCard from '../components/NextAppointmentCard';

export default function Dashboard() {
  return (
    <div className="px-4 py-5 md:px-10 md:py-8 max-w-container mx-auto">
      <GreetingHeader />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="md:col-span-2">
          <TodaysMedicationsCard />
        </div>
        <div className="flex flex-col gap-4 md:gap-6">
          <BloodPressureCard />
          <HeartRateCard />
          <NextAppointmentCard />
        </div>
      </div>
    </div>
  );
}
