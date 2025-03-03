function filterObjectFields(obj, fields) {
  const filtered = {};

  Object.keys(obj).forEach((key) => {
    if (fields.includes(key)) filtered[key] = obj[key];
  });

  return filtered;
}

module.exports = { filterObjectFields };
