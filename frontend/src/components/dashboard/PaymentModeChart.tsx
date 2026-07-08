import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import type { PaymentMode } from "@/types/dashboard";

interface PaymentModeChartProps {
  data: PaymentMode;
}

const COLORS = ["#22C55E", "#3B82F6", "#8B5CF6"];

const PaymentModeChart = ({ data }: PaymentModeChartProps) => {
  const chartData = [
    {
      name: "Cash",
      value: data.CASH.count,
    },
    {
      name: "UPI",
      value: data.UPI.count,
    },
    {
      name: "Bank",
      value: data.BANK.count,
    },
  ];

  return (
    <div className="rounded-2xl border bg-background p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Payment Mode</h2>

        <p className="text-sm text-muted-foreground">Collection distribution</p>
      </div>

      <div className="h-[330px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              innerRadius={75}
              paddingAngle={5}
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

export default PaymentModeChart;
