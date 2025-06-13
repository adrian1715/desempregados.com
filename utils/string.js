module.exports.toUpperCaseInitial = (word) =>
  word[0].toUpperCase() + word.substring(1);

module.exports.formatCareerName = (careerName) =>
  // Remove special characters and replace spaces with hyphens
  careerName
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
