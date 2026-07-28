import { useEffect, useState } from 'react';

import { useForm, useWatch } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import DriverBasicInfo from './DriverBasicInfo';
import DriverLicense from './DriverLicense';

import { driverSchema, type DriverFormValues } from './driverSchema';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import { createEmployeeThunk, updateEmployeeThunk, uploadDriverLicenseThunk } from '@/redux/driver';
import { getVehiclesThunk } from '@/redux/vehicle';

import type { Driver, CreateDriverRequest, UpdateDriverRequest } from '@/types/driver';

interface DriverFormProps {
  driver?: Driver | null;

  onSuccess: () => void;

  onCancel: () => void;
  defaultIsDriver?: boolean;
}

const DriverForm = ({ driver, onSuccess, onCancel, defaultIsDriver = false }: DriverFormProps) => {
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector((state) => state.driver);
  const { vehicles } = useAppSelector((state) => state.vehicle);

  const [licenseFile, setLicenseFile] = useState<File | null>(null);

  const form = useForm<DriverFormValues>({
    resolver: zodResolver(driverSchema),

    defaultValues: {
      isDriver: defaultIsDriver,
      name: '',

      phone: '',

      alternatePhone: '',

      address: '',

      licenseNumber: '',

      licenseExpiry: '',

      notes: '',

      status: 'ACTIVE',
      assignedVehicleId: null,
    },
  });

  useEffect(() => {
    if (driver) {
      form.reset({
        isDriver: driver.isDriver !== false,
        name: driver.name,

        phone: driver.phone,

        alternatePhone: driver.alternatePhone || '',

        address: driver.address || '',

        licenseNumber: driver.licenseNumber || '',

        licenseExpiry: driver.licenseExpiry || '',

        notes: driver.notes || '',

        status: driver.status,
        assignedVehicleId: typeof driver.assignedVehicleId === 'object' ? driver.assignedVehicleId?._id : driver.assignedVehicleId || null,
      });
    }
  }, [driver, form]);

  const isDriver = useWatch({ control: form.control, name: 'isDriver' });

  useEffect(() => {
    dispatch(getVehiclesThunk());
  }, [dispatch]);

  const onSubmit = async (values: DriverFormValues) => {
    let result;

    if (driver) {
      result = await dispatch(
        updateEmployeeThunk({
          id: driver._id,

          payload: values as UpdateDriverRequest,
        })
      );
    } else {
      result = await dispatch(createEmployeeThunk(values as CreateDriverRequest));
    }

    if (createEmployeeThunk.fulfilled.match(result) || updateEmployeeThunk.fulfilled.match(result)) {
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
      <DriverBasicInfo
        control={form.control}
        isEdit={!!driver}
        onDriverChange={(enabled) => {
          if (!enabled) {
            form.setValue('licenseNumber', '');
            form.setValue('licenseExpiry', '');
            form.setValue('assignedVehicleId', null);
            setLicenseFile(null);
          }
        }}
      />

      {isDriver && <DriverLicense
        control={form.control}
        licenseFile={licenseFile}
        setLicenseFile={setLicenseFile}
        vehicles={vehicles}
      />}

      <div className="flex justify-end gap-3">
        <button type="button" className="rounded-md border px-4 py-2" onClick={onCancel}>
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-primary px-4 py-2 text-white"
        >
          {loading ? 'Saving...' : driver ? 'Update Employee' : 'Save Employee'}
        </button>
      </div>
    </form>
  );
};

export default DriverForm;
