const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const { errors } = require("celebrate");
const cors = require("cors");
const router = require("./routes/index");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const handleErrors = require("./middlewares/handleErrors");
const { varMongoURL } = require("./utils");
const { limiter } = require("./middlewares/limiter");

const { PORT = 3000 } = process.env;
const app = express();
app.use(helmet());

mongoose.connect(varMongoURL, {
  useNewUrlParser: true,
  autoIndex: true,
});

app.use(
  cors({
    origin: [
      "https://movies.nargisi.nomoredomains.icu",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(limiter);

app.use(router);

app.use(errorLogger);
app.use(errors());

app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
