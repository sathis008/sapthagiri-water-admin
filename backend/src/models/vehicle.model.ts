import mongoose, { Document, Schema } from 'mongoose';
import { documentSchema, IFileDocument } from './common/document.schema';

export interface IVehicle extends Document {
  vehicleNumber: string;

  capacity: string;

  documents?: {
    rc?: IFileDocument;
    insurance?: IFileDocument;
    fc?: IFileDocument;
    puc?: IFileDocument;
  };

  status: 'AVAILABLE' | 'ON_TRIP' | 'MAINTENANCE' | 'INACTIVE';

  manufacturer?: string;

  vehicleModel?: string;

  year?: number;

  rcNumber: string;

  rcExpiry?: Date;

  rcDocument?: string;

  insuranceCompany?: string;

  policyNumber?: string;

  insuranceExpiry?: Date;

  insuranceDocument?: string;

  fcNumber?: string;

  fcExpiry?: Date;

  fcDocument?: string;

  pucNumber?: string;

  pucExpiry?: Date;

  pucDocument?: string;

  currentKm?: number;

  notes?: string;

  isDeleted: boolean;
}

const vehicleSchema = new Schema(
  {
    vehicleNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    capacity: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ['AVAILABLE', 'ON_TRIP', 'MAINTENANCE', 'INACTIVE'],
      default: 'AVAILABLE',
    },

    manufacturer: String,

    vehicleModel: String,

    year: Number,

    rcNumber: {
      type: String,
      required: true,
    },

    rcExpiry: Date,

    insuranceCompany: String,

    policyNumber: String,

    insuranceExpiry: Date,

    fcNumber: String,

    fcExpiry: Date,

    pucNumber: String,

    pucExpiry: Date,

    documents: {
      rc: {
        type: documentSchema,
        default: {},
      },

      insurance: {
        type: documentSchema,
        default: {},
      },

      fc: {
        type: documentSchema,
        default: {},
      },

      puc: {
        type: documentSchema,
        default: {},
      },
    },

    currentKm: Number,

    notes: String,

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IVehicle>('Vehicle', vehicleSchema);
