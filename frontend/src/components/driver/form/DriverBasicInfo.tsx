import { Controller } from "react-hook-form";

import type { Control } from "react-hook-form";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Input,
} from "@/components/ui/input";

import {
  Label,
} from "@/components/ui/label";

import {
  Textarea,
} from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type {
  DriverFormValues,
} from "./driverSchema";

interface DriverBasicInfoProps {
  control: Control<DriverFormValues>;

  isEdit?: boolean;
}

const DriverBasicInfo = ({
  control,
  isEdit = false,
}: DriverBasicInfoProps) => {

  return (

    <Card>

      <CardHeader>

        <CardTitle>

          Driver Information

        </CardTitle>

      </CardHeader>

      <CardContent className="grid gap-5 md:grid-cols-2">

        {/* Driver Name */}

        <div className="space-y-2">

          <Label>

            Driver Name *

          </Label>

          <Controller
            name="name"
            control={control}
            render={({ field }) => (

              <Input
                placeholder="Driver Name"
                {...field}
              />

            )}
          />

        </div>

        {/* Mobile */}

        <div className="space-y-2">

          <Label>

            Mobile Number *

          </Label>

          <Controller
            name="phone"
            control={control}
            render={({ field }) => (

              <Input
                maxLength={10}
                placeholder="9876543210"
                {...field}
              />

            )}
          />

        </div>

        {/* Alternate Mobile */}

        <div className="space-y-2">

          <Label>

            Alternate Mobile

          </Label>

          <Controller
            name="alternatePhone"
            control={control}
            render={({ field }) => (

              <Input
                maxLength={10}
                placeholder="Alternate Mobile"
                {...field}
              />

            )}
          />

        </div>

        {/* Status */}

        {isEdit && (

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

                    <SelectItem value="ACTIVE">

                      Active

                    </SelectItem>

                    <SelectItem value="INACTIVE">

                      Inactive

                    </SelectItem>

                  </SelectContent>

                </Select>

              )}
            />

          </div>

        )}

        {/* Address */}

        <div className="space-y-2 md:col-span-2">

          <Label>

            Address

          </Label>

          <Controller
            name="address"
            control={control}
            render={({ field }) => (

              <Textarea
                rows={3}
                placeholder="Address"
                {...field}
              />

            )}
          />

        </div>

      </CardContent>

    </Card>

  );

};

export default DriverBasicInfo;