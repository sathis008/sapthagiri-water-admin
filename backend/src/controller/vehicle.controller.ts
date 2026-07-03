import path from 'path';
import { Request, Response } from 'express';
import Vehicle from '../models/vehicle.model';

// =======================
// Create Vehicle
// =======================

export const createVehicle = async (req: Request, res: Response): Promise<void> => {
  try {
    const { vehicleNumber, capacity, rcNumber } = req.body;

    const existingVehicle = await Vehicle.findOne({
      vehicleNumber: vehicleNumber.toUpperCase(),
      isDeleted: false,
    });

    if (existingVehicle) {
      res.status(400).json({
        success: false,
        message: 'Vehicle already exists.',
      });
      return;
    }

    const vehicle = await Vehicle.create({
      ...req.body,
      vehicleNumber: vehicleNumber.toUpperCase(),
    });

    res.status(201).json({
      success: true,
      message: 'Vehicle created successfully.',
      data: vehicle,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Failed to create vehicle.',
    });
  }
};

// =======================
// Get All Vehicles
// =======================
export const getVehicles = async (req: Request, res: Response): Promise<void> => {
  try {
    const vehicles = await Vehicle.find({
      isDeleted: false,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: vehicles,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch vehicles.',
    });
  }
};

// =======================
// Get Vehicle By Id
// =======================
export const getVehicleById = async (req: Request, res: Response): Promise<void> => {
  try {
    const vehicle = await Vehicle.findOne({
      _id: req.params.id,
      isDeleted: false,
    });

    if (!vehicle) {
      res.status(404).json({
        success: false,
        message: 'Vehicle not found.',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: vehicle,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch vehicle.',
    });
  }
};
// =======================
// Update Vehicle
// =======================
export const updateVehicle = async (req: Request, res: Response): Promise<void> => {
  try {
    const vehicle = await Vehicle.findOneAndUpdate(
      {
        _id: req.params.id,
        isDeleted: false,
      },
      {
        ...req.body,

        vehicleNumber: req.body.vehicleNumber.toUpperCase(),
      },
      {
        new: true,
      }
    );

    if (!vehicle) {
      res.status(404).json({
        success: false,
        message: 'Vehicle not found.',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Vehicle updated successfully.',
      data: vehicle,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Failed to update vehicle.',
    });
  }
};

// =======================
// Delete Vehicle
// =======================
export const deleteVehicle = async (req: Request, res: Response): Promise<void> => {
  try {
    const vehicle = await Vehicle.findOneAndUpdate(
      {
        _id: req.params.id,
        isDeleted: false,
      },
      {
        isDeleted: true,
      },
      {
        new: true,
      }
    );

    if (!vehicle) {
      res.status(404).json({
        success: false,
        message: 'Vehicle not found.',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Vehicle deleted successfully.',
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Failed to delete vehicle.',
    });
  }
};
/**
 * Upload Vehicle Document
 */
export const uploadVehicleDocumentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const rawDocumentType = req.params.documentType;
    const documentType = Array.isArray(rawDocumentType) ? rawDocumentType[0] : rawDocumentType;

    if (!req.file) {
      res.status(400).json({
        success: false,
        message: 'Please upload a file.',
      });
      return;
    }

    const vehicle = await Vehicle.findById(id);

    if (!vehicle || vehicle.isDeleted) {
      res.status(404).json({
        success: false,
        message: 'Vehicle not found.',
      });
      return;
    }

    const allowedDocumentTypes = ['rc', 'insurance', 'fc', 'puc'];

    if (!allowedDocumentTypes.includes(documentType)) {
      res.status(400).json({
        success: false,
        message: 'Invalid document type.',
      });
      return;
    }

    vehicle.documents = vehicle.documents || {};

    const relativeFilePath = path.relative(process.cwd(), req.file.path);
    const fileUrl = `/${relativeFilePath.replace(/\\/g, '/')}`;

    vehicle.documents[documentType as keyof typeof vehicle.documents] = {
      fileName: req.file.originalname,
      fileUrl,
      mimeType: req.file.mimetype,
      fileSize: req.file.size,
      uploadedAt: new Date(),
    };

    await vehicle.save();

    res.status(200).json({
      success: true,
      message: `${documentType.toUpperCase()} uploaded successfully.`,
      data: vehicle,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Upload failed.',
    });
  }
};
