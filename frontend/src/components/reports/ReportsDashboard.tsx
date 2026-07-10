import {
  BookOpen,
  CreditCard,
  Receipt,
  Truck,
  CalendarDays,
} from "lucide-react";

import ReportHeader from "@/components/reports/ReportHeader";
import ReportCard from "@/components/reports/ReportCard";

const ReportsDashboard = () => {
  return (
    <div className="space-y-8">
      <ReportHeader />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <ReportCard
          title="Booking Report"
          description="View booking history with filters and exports."
          to="/reports/bookings"
          icon={<BookOpen size={100} />}
          color="bg-gradient-to-br from-blue-500 to-cyan-500"
        />

        <ReportCard
          title="Payment Report"
          description="Track customer payments and collections."
          to="/reports/payments"
          icon={<CreditCard size={100} />}
          color="bg-gradient-to-br from-green-500 to-emerald-600"
        />

        <ReportCard
          title="Customer Ledger"
          description="Customer outstanding and payment history."
          to="/reports/customer-ledger"
          icon={<Receipt size={100} />}
          color="bg-gradient-to-br from-orange-500 to-red-500"
        />

        <ReportCard
          title="Driver Settlement"
          description="Driver-wise collection and pending amount."
          to="/reports/driver-settlement"
          icon={<Truck size={100} />}
          color="bg-gradient-to-br from-violet-500 to-purple-700"
        />

        <ReportCard
          title="Daily Collection"
          description="Daily payment summary and revenue."
          to="/reports/daily-collection"
          icon={<CalendarDays size={100} />}
          color="bg-gradient-to-br from-pink-500 to-rose-600"
        />
      </div>
    </div>
  );
};

export default ReportsDashboard;
