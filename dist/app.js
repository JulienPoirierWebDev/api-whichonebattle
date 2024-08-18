"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const user_router_1 = __importDefault(require("./routes/user.router"));
const battle_router_1 = __importDefault(require("./routes/battle.router"));
const auth_router_1 = __importDefault(require("./routes/auth.router"));
const vote_router_1 = __importDefault(require("./routes/vote.router"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use("/api/users", user_router_1.default);
app.use("/api/battles", battle_router_1.default);
app.use("/api/auth", auth_router_1.default);
app.use("/api/battles", vote_router_1.default);
app.get("/", (req, res) => {
    res.send("Hello world");
});
/*
app.get("/api/populate_db", (req, res) => {
  console.log(process.env.NODE_ENV);
  const populate = async () => {
    await connect(true);

    // test if user "julien@email.com" exist

    let userId;
    const userExist = async () => {
      const user = await User.findOne({ email: "julien@email.com" });

      if (user) {
        userId = user._id;
      }
      return user ? true : false;
    };

    if (!userExist) {
      const user = new User({
        name: "Julien POIRIER",
        email: "julien@email.com",
        password: "password",
      });

      await user.save();

      userId = user._id;
      console.log("User created");
    }

    // create several battles

    const battle = new Battle(battle1, { user_id: userId });
    await battle.save();

    const battleTwo = new Battle(battle2, { user_id: userId });
    await battleTwo.save();

    const battleThree = new Battle(battle3, { user_id: userId });
    await battleThree.save();

    const battleFour = new Battle(battle4, { user_id: userId });
    await battleFour.save();

    const battleFive = new Battle(battle5, { user_id: userId });
    await battleFive.save();

    const battleSix = new Battle(battle6, { user_id: userId });
    await battleSix.save();

    console.log("Database populated");
  };

  populate();

  // populate db
  res.send("Database populated");
});
*/
exports.default = app;
