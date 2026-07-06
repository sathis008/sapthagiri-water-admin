import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface BookingNotesProps {
  loading?: boolean;

  isEdit?: boolean;

  onCancel: () => void;
}

const BookingNotes = ({
  loading = false,
  isEdit = false,
  onCancel,
}: BookingNotesProps) => {
  return (
    <div className="space-y-4 rounded-lg border p-5">
      <h3 className="text-lg font-semibold">Additional Information</h3>

      <div>
        <Label>Notes</Label>

        <Textarea rows={4} placeholder="Enter notes..." />
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit" disabled={loading}>
          {isEdit ? "Update Booking" : "Create Booking"}
        </Button>
      </div>
    </div>
  );
};

export default BookingNotes;
