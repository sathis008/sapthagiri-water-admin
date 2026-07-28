import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Option {
  label: string;
  value: string;
}

interface ReportFiltersProps {
  fromDate?: string;
  toDate?: string;

  customerId?: string;
  driverId?: string;
  vehicleId?: string;

  status?: string;
  paymentStatus?: string;
  paymentMode?: string;
  collectedBy?: string;

  customers?: Option[];
  drivers?: Option[];
  vehicles?: Option[];

  showCustomer?: boolean;
  showDriver?: boolean;
  showVehicle?: boolean;
  showStatus?: boolean;
  showPaymentStatus?: boolean;
  showPaymentMode?: boolean;
  showCollectedBy?: boolean;

  onChange: (field: string, value: string) => void;

  onReset: () => void;
  minDate?: string;
  maxDate?: string;
}

const ReportFilters = ({
  fromDate,
  toDate,

  customerId,
  driverId,
  vehicleId,

  status,
  paymentStatus,
  paymentMode,
  collectedBy,

  customers = [],
  drivers = [],
  vehicles = [],

  showCustomer,
  showDriver,
  showVehicle,
  showStatus,
  showPaymentStatus,
  showPaymentMode,
  showCollectedBy,

  onChange,
  onReset,
  minDate,
  maxDate,
}: ReportFiltersProps) => {
  return (
    <div className="grid gap-4 lg:grid-cols-4">
      <Input
        type="date"
        value={fromDate}
        min={minDate}
        max={maxDate}
        onChange={(e) => onChange("fromDate", e.target.value)}
      />

      <Input
        type="date"
        value={toDate}
        min={minDate}
        max={maxDate}
        onChange={(e) => onChange("toDate", e.target.value)}
      />

      {showCustomer && (
        <select
          className="h-10 rounded-md border px-3"
          value={customerId}
          onChange={(e) => onChange("customerId", e.target.value)}
        >
          <option value="">All Customers</option>

          {customers.map((customer) => (
            <option key={customer.value} value={customer.value}>
              {customer.label}
            </option>
          ))}
        </select>
      )}

      {showDriver && (
        <select
          className="h-10 rounded-md border px-3"
          value={driverId}
          onChange={(e) => onChange("driverId", e.target.value)}
        >
          <option value="">All Drivers</option>

          {drivers.map((driver) => (
            <option key={driver.value} value={driver.value}>
              {driver.label}
            </option>
          ))}
        </select>
      )}

      {showVehicle && (
        <select
          className="h-10 rounded-md border px-3"
          value={vehicleId}
          onChange={(e) => onChange("vehicleId", e.target.value)}
        >
          <option value="">All Vehicles</option>

          {vehicles.map((vehicle) => (
            <option key={vehicle.value} value={vehicle.value}>
              {vehicle.label}
            </option>
          ))}
        </select>
      )}

      {showStatus && (
        <select
          className="h-10 rounded-md border px-3"
          value={status}
          onChange={(e) => onChange("status", e.target.value)}
        >
          <option value="">All Status</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="ASSIGNED">Assigned</option>
          <option value="DELIVERED">Delivered</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      )}

      {showPaymentStatus && (
        <select
          className="h-10 rounded-md border px-3"
          value={paymentStatus}
          onChange={(e) => onChange("paymentStatus", e.target.value)}
        >
          <option value="">All Payment Status</option>
          <option value="PENDING">Pending</option>
          <option value="PAID">Paid</option>
        </select>
      )}

      {showPaymentMode && (
        <select
          className="h-10 rounded-md border px-3"
          value={paymentMode}
          onChange={(e) => onChange("paymentMode", e.target.value)}
        >
          <option value="">All Payment Mode</option>
          <option value="CASH">Cash</option>
          <option value="UPI">UPI</option>
          <option value="BANK">Bank</option>
        </select>
      )}

      {showCollectedBy && (
        <select
          className="h-10 rounded-md border px-3"
          value={collectedBy}
          onChange={(e) => onChange("collectedBy", e.target.value)}
        >
          <option value="">Collected By</option>
          <option value="OFFICE">Office</option>
          <option value="DRIVER">Driver</option>
          <option value="MANAGER">Manager</option>
        </select>
      )}

      <Button variant="outline" onClick={onReset}>
        <RotateCcw className="mr-2 h-4 w-4" />
        Reset Filters
      </Button>
    </div>
  );
};

export default ReportFilters;
