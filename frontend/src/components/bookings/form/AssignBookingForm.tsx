import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import SearchableSelect from "@/components/common/SearchableSelect";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { assignBookingThunk } from "@/redux/booking";
import { searchDriversThunk } from "@/redux/driver";
import { searchVehiclesThunk } from "@/redux/vehicle";

import type { Booking } from "@/types/booking";
import type { Driver } from "@/types/driver";
import type { Vehicle } from "@/types/vehicle";

interface AssignBookingFormProps {
  booking: Booking;

  onSuccess: () => void;
}

const AssignBookingForm = ({ booking, onSuccess }: AssignBookingFormProps) => {
  const dispatch = useAppDispatch();

  const { drivers, loading: driverLoading } = useAppSelector(
    (state) => state.driver,
  );

  const { vehicles, loading: vehicleLoading } = useAppSelector(
    (state) => state.vehicle,
  );

  const [driver, setDriver] = useState<Driver | null>(null);

  const [vehicle, setVehicle] = useState<Vehicle | null>(null);

  const [notes, setNotes] = useState("");

  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!driver || !vehicle) return;

    try {
      await dispatch(
        assignBookingThunk({
          id: booking._id,

          payload: {
            driverId: driver._id,

            vehicleId: vehicle._id,

            notes,
          },
        }),
      ).unwrap();

      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleAssign} className="space-y-6">
      <SearchableSelect<Driver>
        label="Driver"

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

        onSelect={setDriver}
      />

      <SearchableSelect<Vehicle>
        label="Vehicle"
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
        onSelect={setVehicle}
      />

      <div>
        <Label>Notes</Label>

        <Textarea
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onSuccess}>
          Cancel
        </Button>

        <Button type="submit">Assign Booking</Button>
      </div>
    </form>
  );
};

export default AssignBookingForm;
