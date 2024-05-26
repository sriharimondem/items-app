
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb://srihari.mondem%40gmail.com:mondem@us-east-1.aws.services.cloud.mongodb.com:27020/?authMechanism=PLAIN&authSource=%24external&ssl=true&appName=data-aycdnfw:GenesisExotics:local-userpass";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 1000000000,
    socketTimeoutMS: 600000,
    connectionTimeoutMS: 60000
    // Adjust the timeout as needed
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
module.exports = run;