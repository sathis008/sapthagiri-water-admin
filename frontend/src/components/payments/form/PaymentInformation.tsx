import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { PaymentMode } from "@/types/payment";

interface PaymentInformationProps {
  paymentMode: PaymentMode;

  notes: string;

  onPaymentModeChange: (value: PaymentMode) => void;

  onNotesChange: (value: string) => void;
}

const PaymentInformation = ({
  paymentMode,
  notes,
  onPaymentModeChange,
  onNotesChange,
}: PaymentInformationProps) => {
  return (
    <div className="space-y-5 rounded-lg border p-5">
      <h3 className="text-lg font-semibold">Payment Information</h3>

      <div>
        <Label>Payment Mode</Label>

        <Select
          value={paymentMode}
          onValueChange={(value) => onPaymentModeChange(value as PaymentMode)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="CASH">Cash</SelectItem>

            <SelectItem value="UPI">UPI</SelectItem>

            <SelectItem value="BANK">Bank Transfer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Notes</Label>

        <Textarea
          rows={4}
          value={notes}
          placeholder="Enter payment notes..."
          onChange={(e) => onNotesChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default PaymentInformation;
