import { Router } from 'express';

import { uploadVehicleDocument } from '../middleware/upload.middleware';

import { uploadVehicleFile } from '../controller/upload.controller';

const router = Router();

router.post('/vehicle', uploadVehicleDocument.single('file'), uploadVehicleFile);

export default router;
