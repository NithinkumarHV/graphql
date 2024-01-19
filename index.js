const express = require("express");
const colors = require("colors");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./server/schema/schema");
const connectDB = require("./server/config/db");
const cors = require("cors");
const path = require("path");

const port = process.env.PORT || 8000;
const app = express();

//Connect to Database
connectDB();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.use(express.static("public"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});
app.listen(port, () => console.log(`Server running on port ${port}`));
