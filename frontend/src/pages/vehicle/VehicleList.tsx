import { useEffect, useMemo, useState } from 'react';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { DataTable } from '@/components/common/DataTable';

import { vehicleColumns } from '@/components/vehicle/VehicleColumns';
import VehicleDialog from '@/components/vehicle/VehicleDialog';
import VehicleViewDialog from '@/components/vehicle/VehicleViewDialog';

import type { Vehicle } from '@/types/vehicle';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import { getVehiclesThunk, deleteVehicleThunk } from '@/redux/vehicle';

const VehicleList = () => {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const [viewOpen, setViewOpen] = useState(false);

  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const [viewVehicle, setViewVehicle] = useState<Vehicle | null>(null);

  const { vehicles, loading } = useAppSelector((state) => state.vehicle);

  useEffect(() => {
    dispatch(getVehiclesThunk());
  }, [dispatch]);

  /**
   * Add Vehicle
   */
  const handleAddVehicle = () => {
    setSelectedVehicle(null);
    setOpen(true);
  };

  /**
   * View Vehicle
   */
  const handleViewVehicle = (vehicle: Vehicle) => {
    setViewVehicle(vehicle);
    setViewOpen(true);
  };

  /**
   * Edit Vehicle
   */
  const handleEditVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setOpen(true);
  };

  /**
   * Delete Vehicle
   */
  const handleDeleteVehicle = async (vehicle: Vehicle) => {
    const confirmed = window.confirm(`Are you sure you want to delete ${vehicle.vehicleNumber}?`);

    if (!confirmed) return;

    await dispatch(deleteVehicleThunk(vehicle._id));
  };

  const columns = useMemo(
    () => vehicleColumns(handleViewVehicle, handleEditVehicle, handleDeleteVehicle),
    []
  );

  return (
    <div className="space-y-6">
      <DataTable
        columns={columns}
        data={vehicles}
        loading={loading}
        searchColumn="vehicleNumber"
        searchPlaceholder="Search vehicles..."
        toolbarActions={
          <Button onClick={handleAddVehicle}>
            <Plus className="mr-2 h-4 w-4" />
            Add Vehicle
          </Button>
        }
      />

      {/* Add / Edit */}

      <VehicleDialog open={open} onOpenChange={setOpen} vehicle={selectedVehicle} />

      {/* View */}

      <VehicleViewDialog open={viewOpen} onOpenChange={setViewOpen} vehicle={viewVehicle} />
    </div>
  );
};

export default VehicleList;
