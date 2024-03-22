const express = require("express");
const app = express();
// const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://tung14hn:Fj2on41PODnlGR7H@mongodb.ubmfujh.mongodb.net/?retryWrites=true&w=majority&appName=mongodb";
const port = process.env.PORT || 3000;

app.get("/", function (req, res) {
  res.send("Hello World bich");
});

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    await app.listen(port, () => {
      console.log("localhost is listening on port " + port);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// mongoose
//   .connect(
//     "mongodb+srv://tung14hn:Fj2on41PODnlGR7H@mongodb.ubmfujh.mongodb.net/Node-API?retryWrites=true&w=majority",
//   )
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log(err));
