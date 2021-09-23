const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/key.js");
require("./models/User");
require("./services/passport");
const authRoutes = require("./routes/authRoutes.js");

const app = express();

app.use(
  cookieSession({
    maxAge: 60 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

// 引数でappを入れることにより、ローカル変数としてauthRoutesで実行され、routesファイルの実行を行える
authRoutes(app);

// mongoDBに接続する
mongoose.connect(keys.mongoURI);

const PORT = process.env.PORT || 5001;
app.listen(PORT);

// mongo userName mongodb+srv://dbAka:<password>@cluster0.sqkhu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
