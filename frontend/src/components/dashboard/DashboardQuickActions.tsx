import { Plus, CreditCard, UserPlus, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";

const DashboardQuickActions = () => {
  return (
    <div className="rounded-3xl border bg-background p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold">Quick Actions</h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Button className="h-16 justify-start gap-3">
          <Plus />
          New Booking
        </Button>

        <Button variant="secondary" className="h-16 justify-start gap-3">
          <CreditCard />
          Receive Payment
        </Button>

        <Button variant="secondary" className="h-16 justify-start gap-3">
          <UserPlus />
          Add Customer
        </Button>

        <Button variant="secondary" className="h-16 justify-start gap-3">
          <Truck />
          Add Driver
        </Button>
      </div>
    </div>
  );
};

export default DashboardQuickActions;
