import { RotateCcw } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BookingTableToolbarProps {
  search: string;

  status: string;

  paymentStatus: string;

  bookingDate: string;

  sortBy: string;

  loading?: boolean;

  onSearchChange: (value: string) => void;

  onStatusChange: (value: string) => void;

  onPaymentStatusChange: (value: string) => void;

  onBookingDateChange: (value: string) => void;

  onSortChange: (value: string) => void;

  onRefresh: () => void;

  onReset: () => void;
  showSearch?: boolean;
}

const BookingTableToolbar = ({
  search,
  status,
  paymentStatus,
  bookingDate,
  sortBy,
  // loading = false,
  onSearchChange,
  onStatusChange,
  onPaymentStatusChange,
  onBookingDateChange,
  onSortChange,
  // onRefresh,
  onReset,
  showSearch = true,
}: BookingTableToolbarProps) => {
  return (
    <div className="space-y-4">
      {/* Search */}
      {showSearch && (
        <Input
          value={search}
          placeholder="Search Booking Number / Customer / Mobile..."
          onChange={(e) => onSearchChange(e.target.value)}
        />
      )}

      {/* Filters */}

      <div className="flex flex-wrap items-center gap-3">
        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ALL">All Status</SelectItem>

            <SelectItem value="CONFIRMED">Confirmed</SelectItem>

            <SelectItem value="ASSIGNED">Assigned</SelectItem>

            <SelectItem value="DELIVERED">Delivered</SelectItem>

            <SelectItem value="CANCELLED">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        <Select value={paymentStatus} onValueChange={onPaymentStatusChange}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Payment" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ALL">All Payments</SelectItem>

            <SelectItem value="PENDING">Pending</SelectItem>

            <SelectItem value="PAID">Paid</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="date"
          value={bookingDate}
          className="w-44"
          onChange={(e) => onBookingDateChange(e.target.value)}
        />

        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-44">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="createdAt">Latest</SelectItem>

            <SelectItem value="bookingDate">Booking Date</SelectItem>

            <SelectItem value="customerName">Customer Name</SelectItem>

            <SelectItem value="price">Amount</SelectItem>
          </SelectContent>
        </Select>
        {/* 
        <Button variant="outline" onClick={onRefresh} disabled={loading}>
          Refresh
        </Button> */}

        <Button variant="ghost" onClick={onReset}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>
    </div>
  );
};

export default BookingTableToolbar;
