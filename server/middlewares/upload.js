import multer from 'multer';
import multimediaFileName from '../libs/multimedia-filename.js';

const IMAGE_MIMETYPES = ['image/png', 'image/jpeg'];

const imgStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads/unoptimized-images');
  },
  filename: (req, file, callback) => {
    const ext = file.mimetype.split('/')[1];
    const fileName = multimediaFileName();
    const completeFileName = `${fileName}.${ext}`;

    callback(null, completeFileName);
  },
});

export const imgUploader = multer({
  storage: imgStorage,
  fileFilter: (req, file, callback) => {
    if (IMAGE_MIMETYPES.includes(file.mimetype)) return callback(null, true);

    return callback(
      new Error('The image extension must be either .png or .jpeg'),
      false
    );
  },
  limits: {
    fieldSize: 1000000,
  },
});

const VIDEO_MIMETYPES = [''];

const videoStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads/videos');
  },
  filename: (req, file, callback) => {
    const ext = file.mimetype.split('/')[1];
    const fileName = multimediaFileName();
    const completeFileName = `${fileName}.${ext}`;

    callback(null, completeFileName);
  },
});

export const videoUploader = multer({
  storage: videoStorage,
  fileFilter: (req, file, callback) => {
    if (VIDEO_MIMETYPES.includes(file.mimetype)) return callback(null, true);

    return callback(new Error('The image extension must be .mp4'), false);
  },
  limits: {
    fieldSize: 1000000,
  },
});

const AUDIO_MIMETYPES = [''];

const audioStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads/audios');
  },
  filename: (req, file, callback) => {
    const ext = file.mimetype.split('/')[1];
    const fileName = multimediaFileName();
    const completeFileName = `${fileName}.${ext}`;

    callback(null, completeFileName);
  },
});

export const audioUploader = multer({
  storage: audioStorage,
  fileFilter: (req, file, callback) => {
    if (AUDIO_MIMETYPES.includes(file.mimetype)) return callback(null, true);

    return callback(new Error('The image extension must be .mp3'), false);
  },
  limits: {
    fieldSize: 1000000,
  },
});
