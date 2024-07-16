import sharp from 'sharp';

export const optimizeImages = ({
  filePath,
  fileName,
  width = 128,
  height = 128,
}) => {
  return sharp(filePath)
    .resize(width, height)
    .webp()
    .toFile(`./uploads/optimized-images/${fileName}.webp`);
};
