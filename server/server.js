const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const path = require("path");
const { authMiddleware } = require("./utils/auth");

mongoose.connect(
  `mongodb+srv://FinalProject:worldview@worldview.hf9necs.mongodb.net/?retryWrites=true&w=majority`
);
// .then(() => {
//   console.log("MongoDB connected successfully");
// })
// .error(() => {
//   console.error("Error while connecting to MongoDB");
// });

mongoose.connect(
  `mongodb+srv://${process.env.mongoUserName}:${process.env.mongoUserPassword}@cluster0-yhukr.mongodb.net/${process.env.mongoDatabase}?retryWrites=true&w=majority`
);
then(() => {
  app.listen({ port: 3000 }, () => {
    console.log("Your Apollo Server is running on port 3000");
  });
});
error(() => {
  console.error("Error while connecting to MongoDB");
});

require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("DB Connected!"))
  .catch((err) => console.error(err));

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
