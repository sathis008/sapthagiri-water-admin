import type { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import type { BookingFormValues } from "./bookingSchema";

interface BookingNotesProps {
  form: UseFormReturn<BookingFormValues>;

  loading?: boolean;

  isEdit?: boolean;

  onCancel: () => void;
}

const BookingNotes = ({
  form,
  loading = false,
  isEdit = false,
  onCancel,
}: BookingNotesProps) => {
  return (
    <div className="space-y-4 rounded-lg border p-5">
      <h3 className="text-lg font-semibold">Additional Information</h3>

      <div>
        <Label htmlFor="notes">Notes</Label>

        <Textarea
          id="notes"
          rows={4}
          placeholder="Enter notes..."
          {...form.register("notes")}
        />
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : isEdit ? "Update Booking" : "Create Booking"}
        </Button>
      </div>
    </div>
  );
};

export default BookingNotes;
