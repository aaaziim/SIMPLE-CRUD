const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion , ObjectId} = require('mongodb');

const port = process.env.PORT || 5000
const app = express();

app.use(cors());
app.use(express.json());

//username : azim210215 
//password : me5Lzz2h5Y4QcXyp


//mONGOdB cONNECT



const uri = "mongodb+srv://azim210215:me5Lzz2h5Y4QcXyp@cluster0.b9e8y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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


    const database = client.db("usersDB");
    const usersCollection = database.collection("usersCollection");


    app.get("/users", async (req, res) =>{
        const users = await usersCollection.find().toArray();
        res.send(users);  // return all users
    })

    app.get('/users/:id', async (req, res) => {
        const id = req.params.id;
        const user = await usersCollection.findOne({_id: new ObjectId(id)});
        res.send(user);
    })

    app.post('/users', async (req, res) => {
        const user = req.body;
        const result = await usersCollection.insertOne(user);
        res.send(result); 
    })


    app.put('/users/:id', async (req, res) => {
        const id = req.params.id;
        const updateUser = req.body;
        const filter = {_id: new ObjectId(id)};
        const options = { upsert: true };  // if user not found, insert a new one
        const result = await usersCollection.updateOne(filter, {$set: updateUser}, options);
        res.send(result);  // return updated user
    })
   

    app.delete('/users/:id', async (req, res) => {
        const id = req.params.id;

        const query = {_id: new ObjectId(id)}
        const result = await usersCollection.deleteOne(query);
        res.send(result); 

    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);







app.get('/', (req, res)=>{
    res.send('Hello, World!');
})


app.listen(port);