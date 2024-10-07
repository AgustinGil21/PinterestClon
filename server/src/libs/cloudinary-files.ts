import cloudinary from '../utils/cloudinary.js';

export const uploadFileToCloudinary = async (filePath: string) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: 'pinterest-clon',
  });
};

export const destroyCloudinaryFile = async (publicId: string) => {
  await cloudinary.uploader.destroy(publicId);
};

export const getCloudinaryPublicId = (url: string): string => {
  const urlParts = url.split('/');
  const resultFolder = urlParts[urlParts.length - 2];
  const resultIdWithExtension = urlParts[urlParts.length - 1];
  const resultId = resultIdWithExtension.split('.')[0];
  const publicId = `${resultFolder}/${resultId}`;

  return publicId;
};

export const deleteCloudinaryFile = async (url: string) => {
  const publicId = getCloudinaryPublicId(url);
  await cloudinary.uploader.destroy(publicId);
};
