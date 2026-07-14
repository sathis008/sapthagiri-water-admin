import SearchableSelect from "@/components/common/SearchableSelect";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { searchDriversThunk } from "@/redux/driver";
import { searchVehiclesThunk } from "@/redux/vehicle";

import type { Driver } from "@/types/driver";
import type { Vehicle } from "@/types/vehicle";

interface AssignBookingSectionProps {
  driver: Driver | null;

  vehicle: Vehicle | null;

  onDriverChange: (driver: Driver) => void;

  onVehicleChange: (vehicle: Vehicle) => void;
}

const AssignBookingSection = ({
  driver,
  vehicle,
  onDriverChange,
  onVehicleChange,
}: AssignBookingSectionProps) => {
  const dispatch = useAppDispatch();

  const { drivers, loading: driverLoading } = useAppSelector(
    (state) => state.driver,
  );

  const { vehicles, loading: vehicleLoading } = useAppSelector(
    (state) => state.vehicle,
  );
  console.log("Driver:", driver);
  return (
    <div className="rounded-lg border p-5 space-y-5">
      <h3 className="text-lg font-semibold">Assignment Details</h3>

      <SearchableSelect<Driver>
        label="Driver"
        selectedOption={driver}
        placeholder="Search Driver"
        value={driver?._id}
        options={drivers}
        loading={driverLoading}
        getOptionLabel={(item) => item.name}
        getOptionValue={(item) => item._id}
        onSearch={(value) => {
          dispatch(
            searchDriversThunk({
              page: 1,
              limit: 10,
              search: value,
            }),
          );
        }}
        onSelect={onDriverChange}
      />
      <SearchableSelect<Vehicle>
        label="Vehicle"
        selectedOption={vehicle}
        placeholder="Search Vehicle"
        value={vehicle?._id}
        options={vehicles}
        loading={vehicleLoading}
        getOptionLabel={(item) => item.vehicleNumber}
        getOptionValue={(item) => item._id}
        onSearch={(value) => {
          dispatch(
            searchVehiclesThunk({
              page: 1,
              limit: 10,
              search: value,
            }),
          );
        }}
        onSelect={onVehicleChange}
      />
    </div>
  );
};

export default AssignBookingSection;
