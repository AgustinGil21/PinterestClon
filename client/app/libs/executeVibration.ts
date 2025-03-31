export const executeVibration = (time?: number) => {
  const executionTime = time || 200;

  if ('vibration' in navigator) {
    navigator.vibrate(executionTime);
  }
};
