import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import type { Resolver } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { vehicleSchema } from "./VehicleSchema";
 
import VehicleBasicInfo from "./VehicleBasinInfo";
import VehicleDocuments from "./VehicleDocuments";
import VehicleAdditional from "./VehicleAdditional";
import { z } from "zod";

import {
  useAppDispatch,
  useAppSelector,
} from "@/redux/hooks";

import {
  createVehicleThunk,
  updateVehicleThunk,
  uploadVehicleDocumentThunk,
} from "@/redux/vehicle";

import type {
  Vehicle,
  CreateVehicleRequest,
} from "@/types/vehicle";

interface VehicleFormProps {
  vehicle?: Vehicle | null;

  onSuccess: () => void;

  onCancel: () => void;
}

const VehicleForm = ({
  vehicle,
  onSuccess,
  onCancel,
}: VehicleFormProps) => {

  const dispatch = useAppDispatch();

  const { loading } = useAppSelector(
    (state) => state.vehicle
  );

  const [pendingFiles, setPendingFiles] = useState<
    Record<string, File | null>
  >({});

type VehicleFormValues = z.infer<typeof vehicleSchema>;

const form = useForm<VehicleFormValues>({
  resolver: zodResolver(vehicleSchema) as unknown as Resolver<VehicleFormValues>,

      defaultValues: {
        vehicleNumber: "",

        capacity: "",

        status: "AVAILABLE",

        manufacturer: "",

        vehicleModel: "",

        year: new Date().getFullYear(),

        rcNumber: "",

        rcExpiry: "",

        insuranceCompany: "",

        policyNumber: "",

        insuranceExpiry: "",

        fcNumber: "",

        fcExpiry: "",

        pucNumber: "",

        pucExpiry: "",

        currentKm: undefined,

        notes: "",
      },
    });

  useEffect(() => {

    if (vehicle) {

      form.reset({

        ...vehicle,

      });

    }

  }, [vehicle, form]);

  const uploadPendingFiles = async (
    vehicleId: string
  ) => {
    const entries = Object.entries(pendingFiles).filter(
      ([, file]) => file !== null
    );

    for (const [name, file] of entries) {
      if (!file) continue;

      const documentTypeMap: Record<string, string> = {
        rcCopy: "rc",
        insuranceCopy: "insurance",
        fcCopy: "fc",
        pucCopy: "puc",
      };

      const documentType = documentTypeMap[name];
      if (!documentType) continue;

      const result = await dispatch(
        uploadVehicleDocumentThunk({
          id: vehicleId,
          documentType,
          file,
        })
      );

      if (uploadVehicleDocumentThunk.fulfilled.match(result)) {
        setPendingFiles((current) => ({
          ...current,
          [name]: null,
        }));
      }
    }
  };

  const onSubmit = async (
    values: VehicleFormValues
  ) => {
    let result;

    const payload = values as unknown as CreateVehicleRequest;

    if (vehicle) {
      result = await dispatch(
        updateVehicleThunk({
          id: vehicle._id,
          payload,
        })
      );

      if (
        createVehicleThunk.fulfilled.match(result) ||
        updateVehicleThunk.fulfilled.match(result)
      ) {
        form.reset();
        onSuccess();
      }

      return;
    }

    result = await dispatch(createVehicleThunk(payload));

    if (createVehicleThunk.fulfilled.match(result)) {
      const createdVehicle = result.payload;

      if (createdVehicle && createdVehicle._id) {
        await uploadPendingFiles(createdVehicle._id);
      }

      form.reset();
      onSuccess();
    }
  };

  return (

    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6"
    >

      <VehicleBasicInfo
        control={form.control}
      />

      <VehicleDocuments
        control={form.control}
        vehicle={vehicle}
        pendingFiles={pendingFiles}
        onPendingFilesChange={setPendingFiles}
      />

      <VehicleAdditional
        control={form.control}
        loading={loading}
        isEdit={!!vehicle}
        onCancel={onCancel}
      />

    </form>

  );

};

export default VehicleForm;