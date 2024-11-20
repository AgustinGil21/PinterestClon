const getDarkColor = () => {
  const darkColors = [
    '#1C1C1C', // Very Dark Gray
    '#2B2B2B', // Dark Charcoal
    '#343A40', // Dark Slate Gray
    '#3B3B3B', // Dim Gray
    '#4A4A4A', // Dark Gray
    '#2F4F4F', // Dark Slate Gray
    '#4B0082', // Dark Indigo
    '#3D3C42', // Dark Gunmetal
    '#1F1F1F', // Dark Black
    '#0A0A0A', // Almost Black
    '#3C2A25', // Dark Brown
    '#3A3C38', // Dark Olive
    '#2C2C54', // Dark Blue
    '#191919', // Charcoal Black
    '#1A1A1D', // Almost Black
    '#2C3E50', // Midnight Blue
    '#4A4E69', // Dark Lavender
    '#3C2A6E', // Dark Purple
    '#2E1A47', // Dark Violet
    '#4B3D8D', // Dark Purple
    '#4A292E', // Dark Maroon
    '#3A2A2A', // Dark Chestnut
    '#5B4B8A', // Dark Periwinkle
    '#2B2D42', // Dark Blue-Gray
    '#232F34', // Dark Cyan
    '#3D0F24', // Dark Burgundy
    '#1A4D3E', // Dark Teal
    '#2E4053', // Dark Steel Blue
    '#3C3F51', // Dark Ash
  ];

  const randomIndex = Math.floor(Math.random() * darkColors.length);
  return darkColors[randomIndex];
};

export default getDarkColor;
