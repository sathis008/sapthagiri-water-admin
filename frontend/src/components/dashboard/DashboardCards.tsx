import {
  CalendarDays,
  CircleDollarSign,
  Truck,
  Users,
  Car,
  Wallet,
  UserCheck,
} from "lucide-react";

import SummaryCard from "./SummaryCard";

import type { DashboardSummary } from "@/types/dashboard";

interface DashboardCardsProps {
  summary: DashboardSummary;
}

const DashboardCards = ({ summary }: DashboardCardsProps) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      <SummaryCard
        title="Today's Bookings"
        value={summary.todayBookings}
        icon={<CalendarDays size={90} />}
        color="bg-gradient-to-br from-blue-500 to-cyan-500"
      />

      <SummaryCard
        title="Today's Revenue"
        value={summary.todayRevenue}
        prefix="₹"
        icon={<CircleDollarSign size={90} />}
        color="bg-gradient-to-br from-green-500 to-emerald-600"
      />

      <SummaryCard
        title="Pending Collections"
        value={summary.pendingCollections}
        prefix="₹"
        icon={<Wallet size={90} />}
        color="bg-gradient-to-br from-orange-500 to-red-500"
      />

      <SummaryCard
        title="Today's Deliveries"
        value={summary.todayDeliveries}
        icon={<Truck size={90} />}
        color="bg-gradient-to-br from-purple-500 to-pink-500"
      />

      <SummaryCard
        title="Customers"
        value={summary.totalCustomers}
        icon={<Users size={90} />}
        color="bg-gradient-to-br from-indigo-500 to-violet-600"
      />

      <SummaryCard
        title="Drivers"
        value={summary.totalDrivers}
        icon={<UserCheck size={90} />}
        color="bg-gradient-to-br from-teal-500 to-cyan-600"
      />

      <SummaryCard
        title="Vehicles"
        value={summary.totalVehicles}
        icon={<Car size={90} />}
        color="bg-gradient-to-br from-gray-700 to-slate-900"
      />
    </div>
  );
};

export default DashboardCards;
