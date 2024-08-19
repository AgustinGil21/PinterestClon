// Receive something like this:
// 'https://res.cloudinary.com/cloud_name/image/upload/v1724083200/folder_name/file_id.ext'

// Return something like this:
// 'folder_name/file_id'

export const getCloudinaryPublicId = (secureUrl) => {
  const urlParts = secureUrl.split('/');
  const resultFolder = urlParts[urlParts.length - 2];
  const resultIdWithExtension = urlParts[urlParts.length - 1];
  const resultId = resultIdWithExtension.split('.')[0];
  const publicId = `${resultFolder}/${resultId}`;

  return publicId;
};
