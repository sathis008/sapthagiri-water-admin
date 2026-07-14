import { Controller } from 'react-hook-form';

import type { Control } from 'react-hook-form';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Input } from '@/components/ui/input';

import { Label } from '@/components/ui/label';

import { Textarea } from '@/components/ui/textarea';

import DocumentUploadCard from '@/components/common/DocumentUploadCard';

import type { DriverFormValues } from './driverSchema';

interface DriverLicenseProps {
  control: Control<DriverFormValues>;

  licenseFile: File | null;

  setLicenseFile: (file: File | null) => void;
}

const DriverLicense = ({ control, licenseFile, setLicenseFile }: DriverLicenseProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Driving License</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-5 md:grid-cols-2">
          {/* License Number */}

          <div className="space-y-2">
            <Label>License Number</Label>

            <Controller
              name="licenseNumber"
              control={control}
              render={({ field }) => <Input placeholder="License Number" {...field} />}
            />
          </div>

          {/* License Expiry */}

          <div className="space-y-2">
            <Label>License Expiry</Label>

            <Controller
              name="licenseExpiry"
              control={control}
              render={({ field }) => <Input type="date" {...field} />}
            />
          </div>
        </div>

        {/* Upload */}

        <DocumentUploadCard
          title="Driving License"
          file={licenseFile}
          onFileSelect={setLicenseFile}
        />

        {/* Notes */}

        <div className="space-y-2">
          <Label>Notes</Label>

          <Controller
            name="notes"
            control={control}
            render={({ field }) => <Textarea rows={4} placeholder="Notes" {...field} />}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default DriverLicense;
