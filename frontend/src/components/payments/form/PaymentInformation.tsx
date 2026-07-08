import SearchableSelect from "@/components/common/SearchableSelect";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { searchDriversThunk } from "@/redux/driver";

import type { Driver } from "@/types/driver";
import type { CollectedBy, PaymentMode } from "@/types/payment";

interface PaymentInformationProps {
  collectedBy: CollectedBy;

  paymentMode: PaymentMode;

  driver: Driver | null;

  notes: string;

  onCollectedByChange: (value: CollectedBy) => void;

  onPaymentModeChange: (value: PaymentMode) => void;

  onDriverChange: (driver: Driver) => void;

  onNotesChange: (value: string) => void;
}

const PaymentInformation = ({
  collectedBy,
  paymentMode,
  driver,
  notes,
  onCollectedByChange,
  onPaymentModeChange,
  onDriverChange,
  onNotesChange,
}: PaymentInformationProps) => {
  const dispatch = useAppDispatch();

  const { drivers, loading } = useAppSelector((state) => state.driver);

  return (
    <div className="space-y-5 rounded-lg border p-5">
      <h3 className="text-lg font-semibold">Payment Information</h3>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <Label>Collected By</Label>

          <Select
            value={collectedBy}
            onValueChange={(value) => onCollectedByChange(value as CollectedBy)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="OFFICE">Office</SelectItem>

              <SelectItem value="MANAGER">Manager</SelectItem>

              <SelectItem value="DRIVER">Driver</SelectItem>
            </SelectContent>
          </Select>
        </div>

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

              <SelectItem value="BANK">Bank</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {collectedBy === "DRIVER" && (
        <SearchableSelect<Driver>
          label="Driver"
          placeholder="Search Driver"
          selectedOption={driver}
          value={driver?._id}
          options={drivers}
          loading={loading}
          getOptionLabel={(item) => item.name}
          getOptionValue={(item) => item._id}
          onSearch={(value) => {
            dispatch(
              searchDriversThunk({
                page: 1,
                limit: 10,
                search: value,
              }),
            );
          }}
          onSelect={onDriverChange}
        />
      )}

      <div>
        <Label>Notes</Label>

        <Textarea
          rows={4}
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default PaymentInformation;
