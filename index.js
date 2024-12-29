const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000
const app = express();

app.use(cors());
app.use(express.json());

//username : azim210215 
//password : me5Lzz2h5Y4QcXyp


//mONGOdB cONNECT



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://azim210215:<db_password>@cluster0.b9e8y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
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
    await client.close();
  }
}
run().catch(console.dir);







app.get('/', (req, res)=>{
    res.send('Hello, World!');
})


app.listen(port);