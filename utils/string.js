module.exports.toUpperCaseInitial = (word) =>
  word[0].toUpperCase() + word.substring(1);

module.exports.formatCareerName = (careerName) =>
  // Remove special characters and replace spaces with hyphens
  careerName
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

module.exports.truncateToLastWord = (str, max) => {
  if (!str) return "";
  str = String(str).trim();
  if (str.length <= max) return str;
  const cut = str.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  let truncated = lastSpace > 0 ? cut.slice(0, lastSpace).trim() : cut.trim();

  // if the last character is a period, remove it to avoid "...."
  while (truncated.endsWith(".")) {
    truncated = truncated.slice(0, -1).trim();
  }

  return truncated + "...";
};

module.exports.formatState = (state, index) => {
  if (!state || !state.includes("|")) return state;
  return state.split("|")[index].trim();
};
