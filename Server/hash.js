console.clear();
const bcrypt = require("bcrypt");

(async function () {
  const salt = await bcrypt.genSalt(15);
  const hashed = await bcrypt.hash("1234", salt);
  console.log(salt);
  console.log(hashed);
})();
