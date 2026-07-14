import { CalendarDays, RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  onRefresh: () => void;
}

const DashboardHeader = ({ onRefresh }: DashboardHeaderProps) => {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning ☀️"
      : hour < 17
        ? "Good Afternoon 🌤️"
        : "Good Evening 🌙";

  return (
    <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-sky-600 via-cyan-500 to-indigo-600 px-8 py-5 text-white shadow-xl">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold">{greeting}</h1>

          <p className="mt-3 text-white/90">
            Welcome back! Here's today's business overview.
          </p>
        </div>

        <div className=" flex items-center gap-5 ">
          <div className="flex items-center gap-2 text-white/80">
            <CalendarDays size={18} />

            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" size="icon" onClick={onRefresh}>
              <RefreshCcw size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
