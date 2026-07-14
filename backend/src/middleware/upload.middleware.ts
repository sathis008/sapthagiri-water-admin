import multer from 'multer';
import fs from 'fs';
import path from 'path';

const createStorage = (folder: string) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const uploadPath = path.join(process.cwd(), 'uploads', folder, id);

      fs.mkdirSync(uploadPath, {
        recursive: true,
      });

      cb(null, uploadPath);
    },

    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);

      cb(null, `${Date.now()}${ext}`);
    },
  });

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowed = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];

  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF/JPG/PNG allowed.'));
  }
};

export const uploadVehicleDocument = multer({
  storage: createStorage('vehicles'),

  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export const uploadDriverDocument = multer({
  storage: createStorage('drivers'),
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
