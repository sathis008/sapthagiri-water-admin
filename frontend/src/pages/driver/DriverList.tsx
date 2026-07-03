import { useEffect, useMemo, useState } from 'react';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { DataTable } from '@/components/common/DataTable';

import { driverColumns } from '@/components/driver/DriverColumns';
import DriverDialog from '@/components/driver/DriverDialog';
import DriverViewDialog from '@/components/driver/DriverViewDialog';

import type { Driver } from '@/types/driver';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import { getDriversThunk, deleteDriverThunk } from '@/redux/driver';

const DriverList = () => {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const [viewOpen, setViewOpen] = useState(false);

  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  const [viewDriver, setViewDriver] = useState<Driver | null>(null);

  const { drivers, loading } = useAppSelector((state) => state.driver);

  useEffect(() => {
    dispatch(getDriversThunk());
  }, [dispatch]);

  /**
   * Add Driver
   */
  const handleAddDriver = () => {
    setSelectedDriver(null);

    setOpen(true);
  };

  /**
   * View Driver
   */
  const handleViewDriver = (driver: Driver) => {
    setViewDriver(driver);

    setViewOpen(true);
  };

  /**
   * Edit Driver
   */
  const handleEditDriver = (driver: Driver) => {
    setSelectedDriver(driver);

    setOpen(true);
  };

  /**
   * Delete Driver
   */
  const handleDeleteDriver = async (driver: Driver) => {
    const confirmed = window.confirm(`Are you sure you want to delete ${driver.name}?`);

    if (!confirmed) return;

    await dispatch(deleteDriverThunk(driver._id));
  };

  const columns = useMemo(
    () => driverColumns(handleViewDriver, handleEditDriver, handleDeleteDriver),
    []
  );

  return (
    <div className="space-y-6">
      <DataTable
        columns={columns}
        data={drivers}
        loading={loading}
        searchColumn="name"
        searchPlaceholder="Search drivers..."
        toolbarActions={
          <Button onClick={handleAddDriver}>
            <Plus className="mr-2 h-4 w-4" />
            Add Driver
          </Button>
        }
      />

      <DriverDialog open={open} onOpenChange={setOpen} driver={selectedDriver} />

      <DriverViewDialog open={viewOpen} onOpenChange={setViewOpen} driver={viewDriver} />
    </div>
  );
};

export default DriverList;
