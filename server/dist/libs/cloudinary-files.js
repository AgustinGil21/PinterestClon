import cloudinary from '../utils/cloudinary.js';
export const uploadFileToCloudinary = async (filePath) => {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'pinterest-clon',
    });
};
export const destroyCloudinaryFile = async (publicId) => {
    await cloudinary.uploader.destroy(publicId);
};
export const getCloudinaryPublicId = (url) => {
    const urlParts = url.split('/');
    const resultFolder = urlParts[urlParts.length - 2];
    const resultIdWithExtension = urlParts[urlParts.length - 1];
    const resultId = resultIdWithExtension.split('.')[0];
    const publicId = `${resultFolder}/${resultId}`;
    return publicId;
};
export const deleteCloudinaryFile = async (url) => {
    const publicId = getCloudinaryPublicId(url);
    await cloudinary.uploader.destroy(publicId);
};
