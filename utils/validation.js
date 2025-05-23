const isId = (str) => {
  if (/^[0-9a-fA-F]{24}$/.test(str.split("/").slice(-1)[0])) return true;
  return false;
};

module.exports = {
  isId,
};
