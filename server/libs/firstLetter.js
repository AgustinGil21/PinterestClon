export default async function getFirstLetter(content) {
  const strToArray = content.split('');

  return strToArray[0].toUpperCase();
}
