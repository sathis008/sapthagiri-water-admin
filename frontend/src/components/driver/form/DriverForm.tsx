import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import DriverBasicInfo from './DriverBasicInfo';
import DriverLicense from './DriverLicense';

import { driverSchema, type DriverFormValues } from './driverSchema';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import { createDriverThunk, updateDriverThunk, uploadDriverLicenseThunk } from '@/redux/driver';

import type { Driver, CreateDriverRequest, UpdateDriverRequest } from '@/types/driver';

interface DriverFormProps {
  driver?: Driver | null;

  onSuccess: () => void;

  onCancel: () => void;
}

const DriverForm = ({ driver, onSuccess, onCancel }: DriverFormProps) => {
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector((state) => state.driver);

  const [licenseFile, setLicenseFile] = useState<File | null>(null);

  const form = useForm<DriverFormValues>({
    resolver: zodResolver(driverSchema),

    defaultValues: {
      name: '',

      phone: '',

      alternatePhone: '',

      address: '',

      licenseNumber: '',

      licenseExpiry: '',

      notes: '',

      status: 'ACTIVE',
    },
  });

  useEffect(() => {
    if (driver) {
      form.reset({
        name: driver.name,

        phone: driver.phone,

        alternatePhone: driver.alternatePhone || '',

        address: driver.address || '',

        licenseNumber: driver.licenseNumber || '',

        licenseExpiry: driver.licenseExpiry || '',

        notes: driver.notes || '',

        status: driver.status,
      });
    }
  }, [driver, form]);

  const onSubmit = async (values: DriverFormValues) => {
    let result;

    if (driver) {
      result = await dispatch(
        updateDriverThunk({
          id: driver._id,

          payload: values as UpdateDriverRequest,
        })
      );
    } else {
      result = await dispatch(createDriverThunk(values as CreateDriverRequest));
    }

    if (createDriverThunk.fulfilled.match(result) || updateDriverThunk.fulfilled.match(result)) {
      const driverId = result.payload._id;

      if (licenseFile && driverId) {
        await dispatch(
          uploadDriverLicenseThunk({
            id: driverId,

            file: licenseFile,
          })
        );
      }

      form.reset();

      onSuccess();
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <DriverBasicInfo control={form.control} isEdit={!!driver} />

      <DriverLicense
        control={form.control}
        licenseFile={licenseFile}
        setLicenseFile={setLicenseFile}
      />

      <div className="flex justify-end gap-3">
        <button type="button" className="rounded-md border px-4 py-2" onClick={onCancel}>
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-primary px-4 py-2 text-white"
        >
          {loading ? 'Saving...' : driver ? 'Update Driver' : 'Save Driver'}
        </button>
      </div>
    </form>
  );
};

export default DriverForm;
