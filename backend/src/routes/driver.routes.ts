import { Router } from 'express';

import {
  createDriver,
  getDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
  uploadDriverLicense,
} from '../controller/driver.controller';

import { uploadDriverDocument } from '../middleware/upload.middleware';

const router = Router();

/**
 * Create Driver
 */
router.post('/', createDriver);

/**
 * Get All Drivers
 */
router.get('/', getDrivers);

/**
 * Get Driver By Id
 */
router.get('/:id', getDriverById);

/**
 * Update Driver
 */
router.put('/:id', updateDriver);

/**
 * Delete Driver
 */
router.delete('/:id', deleteDriver);

/**
 * Upload Driving License
 */
router.post('/:id/upload', uploadDriverDocument.single('file'), uploadDriverLicense);

export default router;
