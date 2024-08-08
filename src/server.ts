import app from "./app";
import connect from "./helpers/db";

const startServer = async () => {
  await connect(false);
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Listen on ${process.env.PORT || 3000}`);
  });
};

startServer();
