import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useAppDispatch } from "@/redux/hooks";

import {
  createCustomerThunk,
  getCustomersThunk,
  updateCustomerThunk,
} from "@/redux/customer";

import type { Customer, CollectionMethod } from "@/types/customer";

interface CustomerFormProps {
  customer?: Customer | null;
  onSuccess: () => void;
}

const capacityOptions = [
  { label: "12 KL", value: "12" },
  { label: "24 KL", value: "24" },
  { label: "32 KL", value: "32" },
  { label: "40 KL", value: "40" },
  { label: "50 KL", value: "50" },
  { label: "60 KL", value: "60" },
  { label: "80 KL", value: "80" },
  { label: "100 KL", value: "100" },
];

const collectionMethodOptions: { label: string; value: CollectionMethod }[] = [
  { label: "Driver", value: "DRIVER" },
  { label: "Manager", value: "MANAGER" },
  { label: "Office", value: "OFFICE" },
];

const fieldClass = "space-y-1.5 sm:space-y-2";
const labelClass = "text-sm font-medium text-slate-950";
const inputClass =
  "h-10 rounded-2xl bg-slate-100/80 px-4 text-sm shadow-none placeholder:text-slate-500 focus-visible:bg-white sm:h-11 sm:px-5";
const selectTriggerClass =
  "h-10 w-full rounded-2xl bg-slate-100/80 px-4 text-sm shadow-none focus-visible:bg-white sm:h-11 sm:px-5";
const textareaClass =
  "min-h-20 rounded-2xl bg-slate-100/80 px-4 py-3 text-sm shadow-none placeholder:text-slate-500 focus-visible:bg-white sm:min-h-28 sm:px-5 sm:py-4";

const CustomerForm = ({ customer, onSuccess }: CustomerFormProps) => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState(customer?.name ?? "");
  const [phone, setPhone] = useState(customer?.phone ?? "");
  const [alternatePhone, setAlternatePhone] = useState(
    customer?.alternatePhone ?? "",
  );
  const [address, setAddress] = useState(customer?.address ?? "");
  const [area, setArea] = useState(customer?.area ?? "");
  const [city, setCity] = useState(customer?.city ?? "");
  const [pincode, setPincode] = useState(customer?.pincode ?? "");
  const [landmark, setLandmark] = useState(customer?.landmark ?? "");
  const [capacity, setCapacity] = useState(
    customer?.capacity?.toString() ?? "",
  );
  const [price, setPrice] = useState(customer?.price?.toString() ?? "");
  const [collectionMethod, setCollectionMethod] = useState<
    CollectionMethod | ""
  >(customer?.collectionMethod ?? "");
  const [notes, setNotes] = useState(customer?.notes ?? "");

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error("Customer name is required");
      return;
    }

    if (!phone.trim()) {
      toast.error("Phone number is required");
      return;
    }

    if (!address.trim()) {
      toast.error("Address is required");
      return;
    }

    if (!collectionMethod) {
      toast.error("Collection method is required");
      return;
    }

    const payload = {
      name,
      phone,
      alternatePhone,
      address,
      area,
      city,
      pincode,
      landmark,
      capacity: capacity || undefined,
      price: price ? Number(price) : undefined,
      status: customer?.status ?? "ACTIVE",
      collectionMethod,
      notes,
    };

    const result = customer
      ? await dispatch(updateCustomerThunk({ id: customer._id, payload }))
      : await dispatch(createCustomerThunk(payload));

    const isSuccess = customer
      ? updateCustomerThunk.fulfilled.match(result)
      : createCustomerThunk.fulfilled.match(result);

    if (isSuccess) {
      toast.success(
        customer
          ? "Customer updated successfully"
          : "Customer created successfully",
      );
      dispatch(getCustomersThunk());
      onSuccess();
      return;
    }

    toast.error(result.payload as string);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-6 xl:gap-x-7 xl:gap-y-5">
        {/* Name */}
        <div className={fieldClass}>
          <Label className={labelClass}>
            Customer Name <span className="text-red-500">*</span>
          </Label>
          <Input
            className={inputClass}
            placeholder="Enter customer name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Phone */}
        <div className={fieldClass}>
          <Label className={labelClass}>
            Phone <span className="text-red-500">*</span>
          </Label>
          <Input
            className={inputClass}
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Alternate Phone */}
        <div className={fieldClass}>
          <Label className={labelClass}>Alternate Phone</Label>
          <Input
            className={inputClass}
            placeholder="Enter alternate phone"
            value={alternatePhone}
            onChange={(e) => setAlternatePhone(e.target.value)}
          />
        </div>

        {/* Address */}
        <div className={`${fieldClass} md:col-span-2 lg:col-span-3`}>
          <Label className={labelClass}>
            Address <span className="text-red-500">*</span>
          </Label>
          <Textarea
            className={textareaClass}
            rows={3}
            placeholder="Enter customer address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        {/* Area */}
        <div className={fieldClass}>
          <Label className={labelClass}>Area</Label>
          <Input
            className={inputClass}
            placeholder="Enter area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
        </div>

        {/* City */}
        <div className={fieldClass}>
          <Label className={labelClass}>City</Label>
          <Input
            className={inputClass}
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        {/* Pincode */}
        <div className={fieldClass}>
          <Label className={labelClass}>Pincode</Label>
          <Input
            className={inputClass}
            placeholder="Enter pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
        </div>

        {/* Landmark */}
        <div className={fieldClass}>
          <Label className={labelClass}>Landmark</Label>
          <Input
            className={inputClass}
            placeholder="Enter landmark"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
          />
        </div>

        {/* Capacity */}
        <div className={fieldClass}>
          <Label className={labelClass}>Capacity</Label>
          <Select value={capacity} onValueChange={setCapacity}>
            <SelectTrigger className={selectTriggerClass}>
              <SelectValue placeholder="Select capacity" />
            </SelectTrigger>
            <SelectContent>
              {capacityOptions.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price */}
        <div className={fieldClass}>
          <Label className={labelClass}>Price</Label>
          <Input
            className={inputClass}
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        {/* Collection Method — required */}
        <div className={fieldClass}>
          <Label className={labelClass}>
            Collection Method <span className="text-red-500">*</span>
          </Label>
          <Select
            value={collectionMethod}
            onValueChange={(v) => setCollectionMethod(v as CollectionMethod)}
          >
            <SelectTrigger className={selectTriggerClass}>
              <SelectValue placeholder="Select collection method" />
            </SelectTrigger>
            <SelectContent>
              {collectionMethodOptions.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Notes */}
        <div className={`${fieldClass} md:col-span-2 lg:col-span-3`}>
          <Label className={labelClass}>Notes</Label>
          <Textarea
            className={`${textareaClass} sm:min-h-32`}
            rows={4}
            placeholder="Additional notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </div>

      <div className="sticky bottom-0 -mx-4 flex flex-col-reverse gap-2 border-t border-slate-200 bg-white px-4 pt-4 sm:-mx-6 sm:flex-row sm:justify-end sm:gap-3 sm:px-6 lg:-mx-8 lg:px-8 lg:pt-5">
        <Button
          type="button"
          variant="outline"
          className="h-10 rounded-2xl px-5 sm:h-11 sm:px-6"
          onClick={onSuccess}
        >
          Cancel
        </Button>
        <Button
          type="button"
          className="h-10 rounded-2xl px-5 sm:h-11 sm:px-6"
          onClick={handleSubmit}
        >
          {customer ? "Update Customer" : "Create Customer"}
        </Button>
      </div>
    </div>
  );
};

export default CustomerForm;
