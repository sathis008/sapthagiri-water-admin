import { Schema } from 'mongoose';

export interface IFileDocument {
  fileName?: string;
  fileUrl?: string;
  mimeType?: string;
  fileSize?: number;
  uploadedAt?: Date;
}

export const documentSchema = new Schema(
  {
    fileName: {
      type: String,
      trim: true,
    },
    fileUrl: {
      type: String,
      trim: true,
    },
    mimeType: {
      type: String,
      trim: true,
    },
    fileSize: {
      type: Number,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
  }
);
