import { RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaymentTableToolbarProps {
  paymentMode: string;

  collectedBy: string;

  loading?: boolean;

  onPaymentModeChange: (value: string) => void;

  onCollectedByChange: (value: string) => void;

  onRefresh: () => void;

  onReset?: () => void;

  showSearch?: boolean;
}

const PaymentTableToolbar = ({
  paymentMode,
  collectedBy,
  loading = false,
  onPaymentModeChange,
  onCollectedByChange,
  onRefresh,
  onReset,
}: PaymentTableToolbarProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-white p-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap items-center gap-3">
        {/* Collected By */}

        <Select value={collectedBy} onValueChange={onCollectedByChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Collected By" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ALL">All Collections</SelectItem>

            <SelectItem value="DRIVER">Driver</SelectItem>

            <SelectItem value="MANAGER">Manager</SelectItem>

            <SelectItem value="OFFICE">Office</SelectItem>
          </SelectContent>
        </Select>

        {/* Payment Mode */}

        <Select value={paymentMode} onValueChange={onPaymentModeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Payment Mode" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ALL">All Payment Modes</SelectItem>

            <SelectItem value="CASH">Cash</SelectItem>

            <SelectItem value="UPI">UPI</SelectItem>

            <SelectItem value="BANK">Bank</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        {onReset && (
          <Button variant="outline" onClick={onReset}>
            Reset
          </Button>
        )}

        <Button variant="outline" onClick={onRefresh} disabled={loading}>
          <RefreshCw
            className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>
    </div>
  );
};

export default PaymentTableToolbar;
