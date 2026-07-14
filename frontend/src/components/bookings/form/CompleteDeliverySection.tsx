import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import type { CollectionMethod } from "@/types/booking";

interface CompleteDeliverySectionProps {
  collectionMethod: CollectionMethod;

  notes: string;

  onCollectionMethodChange: (value: CollectionMethod) => void;

  onNotesChange: (value: string) => void;
}

const CompleteDeliverySection = ({
  collectionMethod,
  notes,
  onCollectionMethodChange,
  onNotesChange,
}: CompleteDeliverySectionProps) => {
  return (
    <div className="space-y-5 rounded-lg border p-5">
      <h3 className="text-lg font-semibold">Delivery Details</h3>

      <div className="space-y-2">
        <Label>Collection Method</Label>

        <Select
          value={collectionMethod}
          onValueChange={(value) =>
            onCollectionMethodChange(value as CollectionMethod)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Collection Method" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="DRIVER_COLLECTION">Driver Collection</SelectItem>

            <SelectItem value="ACCOUNT_COLLECTION">
              Account Collection
            </SelectItem>

            <SelectItem value="OFFICE_COLLECTION">Office Collection</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Delivery Notes</Label>

        <Textarea
          rows={4}
          placeholder="Enter delivery notes..."
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default CompleteDeliverySection;
