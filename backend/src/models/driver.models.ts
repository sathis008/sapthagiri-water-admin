import { Document, model, Schema } from 'mongoose';

export interface IDriver extends Document {
  isDriver: boolean;
  name: string;
  phone: string;
  alternatePhone?: string;
  address: string;
  licenseNumber: string;
  licenseExpiry: Date;
  licenseDocument?: string;
  assignedVehicleId?: Schema.Types.ObjectId;
  notes?: string;
  status: 'ACTIVE' | 'INACTIVE';
}

const driverschema = new Schema<IDriver>(
  {
    isDriver: { type: Boolean, default: true },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    alternatePhone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    licenseNumber: {
      type: String,
      trim: true,
    },
    licenseExpiry: {
      type: Date,
    },
    licenseDocument: {
      type: String,
    },
    assignedVehicleId: { type: Schema.Types.ObjectId, ref: 'Vehicle', default: null },
    notes: {
      type: String,
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE'],
      default: 'ACTIVE',
    },
  },
  { timestamps: true }
);

// Office employees do not have a licence. A sparse index permits any number of
// documents where this field is absent while retaining uniqueness for drivers.
driverschema.index({ licenseNumber: 1 }, { unique: true, sparse: true });

const Driver = model<IDriver>('Driver', driverschema);

export default Driver;
