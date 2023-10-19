const getRandom = (min, max) =>
  Math.floor(min + Math.random() * (max + 1 - min));

export default function randomInteger(min, max, exceptions = []) {
  let rand = getRandom(min, max);
  while (exceptions.includes(rand)) {
    rand = getRandom(min, max);
  }
  return rand;
}
