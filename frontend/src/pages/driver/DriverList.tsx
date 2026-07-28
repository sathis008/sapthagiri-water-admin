import { useEffect, useState } from 'react';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { DataTable } from '@/components/common/DataTable';

import { driverColumns } from '@/components/driver/DriverColumns';
import DriverDialog from '@/components/driver/DriverDialog';
import DriverViewDialog from '@/components/driver/DriverViewDialog';

import type { Driver } from '@/types/driver';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import { getEmployeesThunk, deleteEmployeeThunk } from '@/redux/driver';

const DriverList = () => {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const [viewOpen, setViewOpen] = useState(false);

  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  const [viewDriver, setViewDriver] = useState<Driver | null>(null);

  const { employees, loading } = useAppSelector((state) => state.driver);

  useEffect(() => {
    dispatch(getEmployeesThunk({ limit: 100 }));
  }, [dispatch]);

  /**
   * Add Employee
   */
  const handleAddEmployee = () => {
    setSelectedDriver(null);

    setOpen(true);
  };

  /**
   * View Employee
   */
  const handleViewDriver = (driver: Driver) => {
    setViewDriver(driver);

    setViewOpen(true);
  };

  /**
   * Edit Employee
   */
  const handleEditDriver = (driver: Driver) => {
    setSelectedDriver(driver);

    setOpen(true);
  };

  /**
   * Delete Employee
   */
  const handleDeleteDriver = async (driver: Driver) => {
    const confirmed = window.confirm(`Are you sure you want to delete ${driver.name}?`);

    if (!confirmed) return;

    await dispatch(deleteEmployeeThunk(driver._id));
  };

  const columns = driverColumns(handleViewDriver, handleEditDriver, handleDeleteDriver);

  return (
    <div className="space-y-6">
      <DataTable
        columns={columns}
        data={employees}
        loading={loading}
        searchColumn="name"
        searchPlaceholder="Search employees..."
        toolbarActions={
          <Button onClick={handleAddEmployee}>
            <Plus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        }
      />

      <DriverDialog open={open} onOpenChange={setOpen} driver={selectedDriver} />

      <DriverViewDialog open={viewOpen} onOpenChange={setViewOpen} driver={viewDriver} />
    </div>
  );
};

export default DriverList;
