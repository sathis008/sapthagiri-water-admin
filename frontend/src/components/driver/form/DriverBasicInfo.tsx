import { Controller } from 'react-hook-form';

import type { Control } from 'react-hook-form';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Input } from '@/components/ui/input';

import { Label } from '@/components/ui/label';

import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import type { DriverFormValues } from './driverSchema';

interface DriverBasicInfoProps {
  control: Control<DriverFormValues>;

  isEdit?: boolean;
  onDriverChange?: (isDriver: boolean) => void;
}

const DriverBasicInfo = ({ control, isEdit = false, onDriverChange }: DriverBasicInfoProps) => {
  return (
    <Card>
      <CardHeader>
          <CardTitle>Employee Information</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-5 md:grid-cols-2">
        <div className="flex items-center gap-3 md:col-span-2">
          <Controller
            name="isDriver"
            control={control}
            render={({ field }) => <Checkbox id="isDriver" checked={field.value} onCheckedChange={(checked) => { const enabled = checked === true; field.onChange(enabled); onDriverChange?.(enabled); }} />}
          />
          <div>
            <Label htmlFor="isDriver">Driver</Label>
            <p className="text-sm text-muted-foreground">Enable to capture driving licence and vehicle details.</p>
          </div>
        </div>

        {/* Employee Name */}

        <div className="space-y-2">
          <Label>Employee Name *</Label>

          <Controller
            name="name"
            control={control}
            render={({ field }) => <Input placeholder="Employee Name" {...field} />}
          />
        </div>

        {/* Mobile */}

        <div className="space-y-2">
          <Label>Mobile Number *</Label>

          <Controller
            name="phone"
            control={control}
            render={({ field }) => <Input maxLength={10} placeholder="9876543210" {...field} />}
          />
        </div>

        {/* Alternate Mobile */}

        <div className="space-y-2">
          <Label>Alternate Mobile</Label>

          <Controller
            name="alternatePhone"
            control={control}
            render={({ field }) => (
              <Input maxLength={10} placeholder="Alternate Mobile" {...field} />
            )}
          />
        </div>

        {/* Status */}

        {isEdit && (
          <div className="space-y-2">
            <Label>Status</Label>

            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="ACTIVE">Active</SelectItem>

                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        )}

        {/* Address */}

        <div className="space-y-2 md:col-span-2">
          <Label>Address</Label>

          <Controller
            name="address"
            control={control}
            render={({ field }) => <Textarea rows={3} placeholder="Address" {...field} />}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default DriverBasicInfo;
