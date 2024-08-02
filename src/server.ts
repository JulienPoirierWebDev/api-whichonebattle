require("dotenv").config();
const expressApp = require("./app.ts");

expressApp.listen(process.env.PORT || 3000, () => {
  console.log(`Listen on ${process.env.PORT || 3000}`);
});
