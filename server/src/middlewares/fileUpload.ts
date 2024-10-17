import path from 'path';
import { promises as fs } from 'fs';
import multer, { FileFilterCallback } from 'multer';
import UUID from '../libs/uuid.js';
import { Request } from 'express';
import { fileURLToPath } from 'url';

// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta de la carpeta uploads
const uploadsDir = path.join(__dirname, '../uploads');

// Función para asegurarte de que la carpeta existe
const ensureUploadsDirExists = async () => {
  try {
    // Verifica si la carpeta existe
    await fs.access(uploadsDir);
  } catch (err) {
    // Si no existe, créala
    await fs.mkdir(uploadsDir, { recursive: true });
  }
};

// Llama a la función al iniciar tu aplicación
await ensureUploadsDirExists();

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const acceptedFileTypes = ['image/png', 'image/jpg', 'image/jpeg'];

  if (acceptedFileTypes.some((fileType) => fileType === file.mimetype)) {
    return cb(null, true);
  }

  return cb(null, false);
};

export default class FileMiddleware {
  public static readonly memoryLoader = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 2097152, // 2 MByte
    },
  });

  public static readonly diskLoader = multer({
    storage: multer.diskStorage({
      destination: (_req, _file, cb) => {
        cb(null, uploadsDir);
      },
      filename: (_req, file, cb) => {
        cb(null, `${UUID}-${file.originalname}`); // Nombre único para el archivo
      },
    }),
    limits: {
      fileSize: 67108864, // 64 MByte
    },
    fileFilter,
  });

  public static async destroyTmpFile(path: string): Promise<void> {
    try {
      return await fs.unlink(path);
    } catch (err) {
      throw new Error(`Cannot delete temporal file at ${path}!`);
    }
  }
}
