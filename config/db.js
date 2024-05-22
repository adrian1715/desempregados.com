const mongoose = require("mongoose");
if (process.env.NODE_ENV !== "production") require("dotenv").config();
const dbUrl = process.env.DB_URL;

// mongoose.connect(dbUrl, {
//   useNewUrlParser: true,
// useCreateIndex: true,
// useUnifiedTopology: true,
// useFindAndModify: false,
// });

const db = mongoose.connection;

// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//   console.log("Database connected");
// });

// function dbConnect() {
// connecting to the database
mongoose
  .connect(dbUrl, {})
  .then(() => console.log("database connected"))
  .catch((err) => console.error(err));
// }
// dbConnect();

// module.exports = mongoose.connection;
// module.exports = dbConnect;
