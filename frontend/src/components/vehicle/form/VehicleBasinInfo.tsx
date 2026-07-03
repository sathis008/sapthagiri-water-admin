import { Controller, type Control } from "react-hook-form";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { VehicleFormValues } from "./VehicleSchema";

interface VehicleBasicInfoProps {
  control: Control<VehicleFormValues>;
}

const CAPACITY_OPTIONS = [
  "12 KL",
  "24 KL",
  "32 KL",
  "40 KL",
  "50 KL",
  "60 KL",
  "80 KL",
  "100 KL",
];

const STATUS_OPTIONS = [
  "AVAILABLE",
  "ON_TRIP",
  "MAINTENANCE",
  "INACTIVE",
];

const YEARS = Array.from(
  { length: 25 },
  (_, i) => String(new Date().getFullYear() - i)
);

const VehicleBasicInfo = ({
  control,
}: VehicleBasicInfoProps) => {
  return (
    <Card>

      <CardHeader>

        <CardTitle>
          Vehicle Information
        </CardTitle>

      </CardHeader>

      <CardContent className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

        {/* Vehicle Number */}

        <div className="space-y-2">

          <Label>
            Vehicle Number
          </Label>

          <Controller
            name="vehicleNumber"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <Input
                  placeholder="TN58AB1234"
                  {...field}
                />

                {fieldState.error && (
                  <p className="text-sm text-red-500">
                    {fieldState.error.message}
                  </p>
                )}
              </>
            )}
          />

        </div>

        {/* Capacity */}

        <div className="space-y-2">

          <Label>
            Capacity
          </Label>

          <Controller
            name="capacity"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >

                  <SelectTrigger>

                    <SelectValue placeholder="Select Capacity" />

                  </SelectTrigger>

                  <SelectContent>

                    {CAPACITY_OPTIONS.map((capacity) => (

                      <SelectItem
                        key={capacity}
                        value={capacity}
                      >
                        {capacity}
                      </SelectItem>

                    ))}

                  </SelectContent>

                </Select>

                {fieldState.error && (
                  <p className="text-sm text-red-500">
                    {fieldState.error.message}
                  </p>
                )}
              </>
            )}
          />

        </div>

        {/* Status */}

        <div className="space-y-2">

          <Label>
            Status
          </Label>

          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
              >

                <SelectTrigger>

                  <SelectValue />

                </SelectTrigger>

                <SelectContent>

                  {STATUS_OPTIONS.map((status) => (

                    <SelectItem
                      key={status}
                      value={status}
                    >
                      {status}
                    </SelectItem>

                  ))}

                </SelectContent>

              </Select>
            )}
          />

        </div>

        {/* Manufacturer */}

        <div className="space-y-2">

          <Label>
            Manufacturer
          </Label>

          <Controller
            name="manufacturer"
            control={control}
            render={({ field }) => (
              <Input
                placeholder="Ashok Leyland"
                {...field}
              />
            )}
          />

        </div>

        {/* Vehicle Model */}

        <div className="space-y-2">

          <Label>
            Vehicle Model
          </Label>

          <Controller
            name="vehicleModel"
            control={control}
            render={({ field }) => (
              <Input
                placeholder="Dost+"
                {...field}
              />
            )}
          />

        </div>

        {/* Registration Year */}

        <div className="space-y-2">

          <Label>
            Registration Year
          </Label>

          <Controller
            name="year"
            control={control}
            render={({ field }) => (
              <Select
                value={
                  field.value
                    ? String(field.value)
                    : ""
                }
                onValueChange={(value) =>
                  field.onChange(Number(value))
                }
              >

                <SelectTrigger>

                  <SelectValue placeholder="Select Year" />

                </SelectTrigger>

                <SelectContent>

                  {YEARS.map((year) => (

                    <SelectItem
                      key={year}
                      value={year}
                    >
                      {year}
                    </SelectItem>

                  ))}

                </SelectContent>

              </Select>
            )}
          />

        </div>

      </CardContent>

    </Card>
  );
};

export default VehicleBasicInfo;