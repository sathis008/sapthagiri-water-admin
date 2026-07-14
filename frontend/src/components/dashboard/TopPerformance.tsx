import { Trophy, Truck, Car, IndianRupee } from "lucide-react";

import type { TopCustomer, TopDriver, TopVehicle } from "@/types/dashboard";

interface TopPerformanceProps {
  customer: TopCustomer | null;
  driver: TopDriver | null;
  vehicle: TopVehicle | null;
}

const TopPerformance = ({ customer, driver, vehicle }: TopPerformanceProps) => {
  const cards = [
    {
      title: "Top Customer",
      icon: Trophy,
      color: "from-yellow-500 to-orange-500",
      value: customer?.customerName ?? "No Data",
      subTitle: customer ? `${customer.totalBookings} Bookings` : "-",
      amount: customer?.totalAmount,
    },
    {
      title: "Top Driver",
      icon: Truck,
      color: "from-blue-500 to-cyan-500",
      value: driver?.driverName ?? "No Data",
      subTitle: driver ? `${driver.deliveries} Deliveries` : "-",
    },
    {
      title: "Top Vehicle",
      icon: Car,
      color: "from-purple-500 to-pink-500",
      value: vehicle?.vehicleNumber ?? "No Data",
      subTitle: vehicle ? `${vehicle.deliveries} Deliveries` : "-",
    },
  ];

  return (
    <div className="space-y-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${card.color} p-4 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
          >
            <div className="absolute -right-6 -top-6 opacity-10">
              <Icon size={90} />
            </div>

            <div className="relative z-10">
              <div className="mb-4 flex items-center gap-2">
                <div className="rounded-full bg-white/20 p-2">
                  <Icon size={22} />
                </div>

                <h3 className="font-semibold">{card.title}</h3>
              </div>

              <h2 className="text-xl font-bold">{card.value}</h2>

              <div className="mt-2 flex items-center justify-between">
                <p className="text-white/80">{card.subTitle}</p>

                {card.amount !== undefined && (
                  <div className="flex items-center gap-1 text-lg font-semibold">
                    <IndianRupee size={18} />
                    <span>{card.amount.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TopPerformance;
