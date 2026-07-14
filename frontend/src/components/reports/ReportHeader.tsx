import { FileBarChart2 } from "lucide-react";

const ReportHeader = () => {
  return (
    <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-8 text-white shadow-xl">
      <div className="flex items-center gap-5">
        <div className="rounded-2xl bg-white/20 p-4">
          <FileBarChart2 size={40} />
        </div>

        <div>
          <h1 className="text-3xl font-bold">Reports Center</h1>

          <p className="mt-2 text-white/80">
            Analyze your bookings, payments, collections and customer
            activities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReportHeader;
