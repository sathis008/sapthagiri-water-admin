import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import type { BookingTrend } from "@/types/dashboard";

interface BookingTrendChartProps {
  data: BookingTrend[];
}

const BookingTrendChart = ({ data }: BookingTrendChartProps) => {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-slate-900">
      <div className="mb-5">
        <h2 className="text-xl font-semibold">Weekly Booking Trend</h2>

        <p className="text-sm text-muted-foreground">
          Booking vs Delivery (Last 7 Days)
        </p>
      </div>

      <div className="h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="5 5" vertical={false} />

            <XAxis dataKey="date" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Legend />

            <Line
              type="monotone"
              dataKey="bookings"
              name="Bookings"
              stroke="#3b82f6"
              strokeWidth={4}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />

            <Line
              type="monotone"
              dataKey="deliveries"
              name="Deliveries"
              stroke="#10b981"
              strokeWidth={4}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BookingTrendChart;
