export default (strings: string[] = []) => {

  const duplicateIndices = [];
  const seen = new Set();

  for (let i = 0; i < strings.length; i++) {
    const currentString = strings[i];

    if (seen.has(currentString)) {
      duplicateIndices.push(i);
    } else {
      seen.add(currentString);
    }
  }

  return duplicateIndices;

};
