import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import type { BookingStatus } from "@/types/dashboard";

interface BookingStatusChartProps {
  data: BookingStatus;
}

const COLORS = ["#3B82F6", "#F59E0B", "#10B981", "#EF4444"];

const BookingStatusChart = ({ data }: BookingStatusChartProps) => {
  const chartData = [
    {
      name: "Confirmed",
      value: data.CONFIRMED,
    },
    {
      name: "Assigned",
      value: data.ASSIGNED,
    },
    {
      name: "Delivered",
      value: data.DELIVERED,
    },
    {
      name: "Cancelled",
      value: data.CANCELLED,
    },
  ];

  return (
    <div className="rounded-2xl border bg-background p-4 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Booking Status</h2>

        <p className="text-sm text-muted-foreground">
          Current booking distribution
        </p>
      </div>

      <div className="h-[330px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              innerRadius={50}
              paddingAngle={4}
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BookingStatusChart;
