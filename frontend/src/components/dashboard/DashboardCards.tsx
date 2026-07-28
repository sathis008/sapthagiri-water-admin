import {
  CalendarDays,
  CircleDollarSign,
  Truck,
  Users,
  Car,
  Wallet,
  UserCheck,
  PackageCheck,
} from "lucide-react";

import SummaryCard from "./SummaryCard";
import type { DashboardSummary } from "@/types/dashboard";
import { isAdmin } from "@/utills/auth";

interface DashboardCardsProps {
  summary: DashboardSummary;
  role?: string | null;
}

const DashboardCards = ({ summary, role }: DashboardCardsProps) => {
  const adminView = isAdmin(role);

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {/* ── Shared cards (both Admin & Manager) ─────────────────── */}
      <SummaryCard
        title="Today's Bookings"
        value={summary.todayBookings}
        icon={<CalendarDays size={90} />}
        color="bg-gradient-to-br from-blue-500 to-cyan-500"
      />

      <SummaryCard
        title="Today's Deliveries"
        value={summary.todayDeliveries}
        icon={<Truck size={90} />}
        color="bg-gradient-to-br from-purple-500 to-pink-500"
      />

      <SummaryCard
        title="Active Customers"
        value={summary.totalCustomers}
        icon={<Users size={90} />}
        color="bg-gradient-to-br from-indigo-500 to-violet-600"
      />

      <SummaryCard
        title="Active Drivers"
        value={summary.totalDrivers}
        icon={<UserCheck size={90} />}
        color="bg-gradient-to-br from-teal-500 to-cyan-600"
      />

      <SummaryCard
        title="Active Vehicles"
        value={summary.totalVehicles}
        icon={<Car size={90} />}
        color="bg-gradient-to-br from-gray-700 to-slate-900"
      />

      <SummaryCard
        title="Pending Deliveries"
        value={summary.pendingDeliveries ?? 0}
        icon={<PackageCheck size={90} />}
        color="bg-gradient-to-br from-amber-500 to-orange-500"
      />

      {/* ── Admin-only financial cards ───────────────────────────── */}
      {adminView && (
        <>
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
        </>
      )}
    </div>
  );
};

export default DashboardCards;
