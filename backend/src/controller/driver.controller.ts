import { Request, Response } from 'express';

import Driver from '../models/driver.models';

/**
 * Create Driver
 */
export const createDriver = async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone } = req.body;

    const existingDriver = await Driver.findOne({
      phone: phone.trim(),
    });

    if (existingDriver) {
      res.status(409).json({
        success: false,
        message: 'Driver with this mobile number already exists.',
      });
      return;
    }

    const driver = await Driver.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Driver created successfully.',
      data: driver,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create driver.',
    });
  }
};

/**
 * Get All Drivers
 */
export const getDrivers = async (req: Request, res: Response): Promise<void> => {
  try {
    const drivers = await Driver.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: drivers,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch drivers.',
    });
  }
};

/**
 * Get Driver By Id
 */
export const getDriverById = async (req: Request, res: Response): Promise<void> => {
  try {
    const driver = await Driver.findById(req.params.id);

    if (!driver) {
      res.status(404).json({
        success: false,
        message: 'Driver not found.',
      });

      return;
    }

    res.status(200).json({
      success: true,
      data: driver,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch driver.',
    });
  }
};

/**
 * Update Driver
 */
export const updateDriver = async (req: Request, res: Response): Promise<void> => {
  try {
    const driver = await Driver.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!driver) {
      res.status(404).json({
        success: false,
        message: 'Driver not found.',
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: 'Driver updated successfully.',
      data: driver,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update driver.',
    });
  }
};

/**
 * Delete Driver
 */
export const deleteDriver = async (req: Request, res: Response): Promise<void> => {
  try {
    const driver = await Driver.findByIdAndDelete(req.params.id);

    if (!driver) {
      res.status(404).json({
        success: false,
        message: 'Driver not found.',
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: 'Driver deleted successfully.',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete driver.',
    });
  }
};

/**
 * Upload Driving License
 */
export const uploadDriverLicense = async (req: Request, res: Response): Promise<void> => {
  try {
    const file = req.file as Express.Multer.File;

    if (!file) {
      res.status(400).json({
        success: false,
        message: 'No file uploaded.',
      });

      return;
    }

    const driver = await Driver.findByIdAndUpdate(
      req.params.id,
      {
        licenseDocument: file.path,
      },
      {
        new: true,
      }
    );

    if (!driver) {
      res.status(404).json({
        success: false,
        message: 'Driver not found.',
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: 'Driving license uploaded successfully.',
      data: driver,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Upload failed.',
    });
  }
};
