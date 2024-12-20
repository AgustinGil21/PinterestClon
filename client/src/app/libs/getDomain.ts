// Devuelve solo el dominio de una URL, esto es
// usado en el componente Pin
export const getDomain = (url: string | undefined | null) => {
  if (!url) return null;

  const { hostname } = new URL(url);
  const parts = hostname.split('.');

  if (parts.length > 2) {
    return `${parts[parts.length - 2]}.${parts[parts.length - 1]}`;
  }

  return hostname;
};
