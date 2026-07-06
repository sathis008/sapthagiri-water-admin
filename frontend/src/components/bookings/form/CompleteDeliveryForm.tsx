import { useState } from "react";

import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useAppDispatch } from "@/redux/hooks";

import { completeDeliveryThunk } from "@/redux/booking";

import type { Booking, CollectionMethod } from "@/types/booking";

interface CompleteDeliveryFormProps {
  booking: Booking;

  onSuccess: () => void;
}

const CompleteDeliveryForm = ({
  booking,
  onSuccess,
}: CompleteDeliveryFormProps) => {
  const dispatch = useAppDispatch();

  const [collectionMethod, setCollectionMethod] =
    useState<CollectionMethod>("DRIVER_COLLECTION");

  const [notes, setNotes] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(
        completeDeliveryThunk({
          id: booking._id,

          payload: {
            collectionMethod,

            notes,
          },
        }),
      ).unwrap();

      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label>Collection Method</Label>

        <Select
          value={collectionMethod}
          onValueChange={(value) =>
            setCollectionMethod(value as CollectionMethod)
          }
        >
          <SelectTrigger>
            <SelectValue />
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

      <div>
        <Label>Notes</Label>

        <Textarea
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onSuccess}>
          Cancel
        </Button>

        <Button type="submit">Complete Delivery</Button>
      </div>
    </form>
  );
};

export default CompleteDeliveryForm;
