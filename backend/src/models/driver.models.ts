import { Document, model, Schema } from 'mongoose';

export interface IDriver extends Document {
  name: string;
  phone: string;
  alternatePhone?: string;
  address: string;
  licenseNumber: string;
  licenseExpiry: Date;
  licenseDocument?: string;
  notes?: string;
  status: 'ACTIVE' | 'INACTIVE';
}

const driverschema = new Schema<IDriver>(
  {
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
      required: true,
      trim: true,
    },
    licenseNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    licenseExpiry: {
      type: Date,
      required: true,
    },
    licenseDocument: {
      type: String,
    },
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

const Driver = model<IDriver>('Driver', driverschema);

export default Driver;
