import cloudinary from '../utils/cloudinary.js';

export const uploadFileToCloudinary = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: 'pinterest-clon',
  });
};

export const destroyCloudinaryFile = async (publicId) => {
  await cloudinary.uploader.destroy(publicId);
};
