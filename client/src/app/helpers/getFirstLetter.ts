export default async function getFirstLetter(content: string) {
  const strToArray = content.split('');

  return strToArray[0].toUpperCase();
}
