import { Controller, type Control } from "react-hook-form";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";

import type { VehicleFormValues } from "./VehicleSchema";

interface VehicleAdditionalProps {
  control: Control<VehicleFormValues>;

  loading?: boolean;

  isEdit?: boolean;

  onCancel: () => void;
}

const VehicleAdditional = ({
  control,
  loading = false,
  isEdit = false,
  onCancel,
}: VehicleAdditionalProps) => {
  return (
    <>
      <Card>

        <CardHeader>

          <CardTitle>
            Additional Information
          </CardTitle>

        </CardHeader>

        <CardContent className="grid grid-cols-1 gap-5 lg:grid-cols-3">

          <div className="space-y-2">

            <Label>
              Current KM
            </Label>

            <Controller
              name="currentKm"
              control={control}
              render={({ field }) => (
                <Input
                  type="number"
                  placeholder="25000"
                  value={field.value ?? ""}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === ""
                        ? undefined
                        : Number(e.target.value)
                    )
                  }
                />
              )}
            />

          </div>

          <div className="space-y-2">

            <Label>
              Notes
            </Label>

            <Controller
              name="notes"
              control={control}
              render={({ field }) => (
                <Textarea
                  rows={5}
                  placeholder="Additional Notes..."
                  {...field}
                />
              )}
            />

          </div>

        </CardContent>

      </Card>

      <div className="flex justify-end gap-3">

        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : isEdit
            ? "Update Vehicle"
            : "Save Vehicle"}
        </Button>

      </div>
    </>
  );
};

export default VehicleAdditional;