// O(N^2) ---> First Time
export const arrayToHash = (arr) => {
  const hash = {};
  arr.forEach((row, ri) => {
    row.forEach((cell, ci) => {
      hash[`${ri}-${ci}`] = arr[ri][ci];
    });
  });
  return hash;
};

const getStatus = (neighbors, hash) => {
  //Get neighbors status
  const happy = neighbors.reduce((acc, curr) => {
    hash[curr] === 2 && acc++;
    return acc;
  }, 0);

  const sad = neighbors.reduce((acc, curr) => {
    hash[curr] === 1 && acc++;
    return acc;
  }, 0);

  return { happy, sad };
};

const transform = (element, neighbors, hash) => {
  const { happy, sad } = getStatus(neighbors, hash);
  //Applying the rules
  if (
    (element === 1 || element === 2) &&
    (happy + sad === 2 || happy + sad === 3)
  )
    return element;
  else if (element === 0 && sad === 3) return 1;
  else if (element === 0 && sad === 2 && happy === 1) return 1;
  else if (element === 0 && sad === 1 && happy === 2) return 2;
  else if (element === 0 && happy === 3) return 2;
  else return 0;
};

//O(n)
export const transformHash = (M, N, hash) => {
  const hash_copy = { ...hash };
  for (const el in hash) {
    const neighbors = findNeighbor(M, N)(el);
    hash_copy[el] = transform(hash[el], neighbors, hash_copy);
  }
  return hash_copy;
};

//O(1)
const findNeighbor = (maxR, maxC) => (key) => {
  const row = +key.split("-")[0];
  const cell = +key.split("-")[1];
  const nextRow = row + 1;
  const prevRow = row - 1;
  const nextCell = cell + 1;
  const prevCell = cell - 1;

  const neighbors = [];
  //Checking each neighbor in the hash map and adding it to neighbors
  nextRow < maxR && neighbors.push(`${nextRow}-${cell}`);
  nextCell < maxC && neighbors.push(`${row}-${nextCell}`);
  nextRow < maxR && nextCell < maxC && neighbors.push(`${nextRow}-${nextCell}`);
  prevRow !== -1 && nextCell < maxC && neighbors.push(`${prevRow}-${nextCell}`);
  prevRow !== -1 && neighbors.push(`${prevRow}-${cell}`);
  prevCell !== -1 && nextRow < maxR && neighbors.push(`${nextRow}-${prevCell}`);
  prevCell !== -1 && neighbors.push(`${row}-${prevCell}`);
  prevRow !== -1 && prevCell !== -1 && neighbors.push(`${prevRow}-${prevCell}`);

  return neighbors;
};
