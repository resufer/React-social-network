let tryCatcher = (maybeNull, value, elif = '') => {
  let result;
  try { result = maybeNull[value]; }
  catch { result = elif; }
  return result;
}

export default tryCatcher;