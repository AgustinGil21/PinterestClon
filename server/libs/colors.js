import { readFile } from 'fs/promises';

const colorsJSON = await readFile('./colors.json', 'utf-8');

const colors = JSON.parse(colorsJSON);

export default async function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);

  return colors[randomIndex];
}
