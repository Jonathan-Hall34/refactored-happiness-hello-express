import 'dotenv/config'
import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';
import { MongoClient, ServerApiVersion } from 'mongodb';


const app = express()
const PORT = process.env.PORT || 3000; 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uri = process.env.MONGO_URI;
// console.log(uri);

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());

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


app.get('/', (req, res) => {
  res.send('Hello Express from Render 😍😍😍. <a href="Jonathan">Jonathan</a>')
})

app.get('/Jonathan', (req, res) => {
  res.sendFile(path.join(__dirname, 'public','Jonathan.html')); 
})

app.get('/api/query', (req, res) => {
  console.log("Client Request With Query Param:", req.query.name);
  const name = req.query.name;
res.json({"message": `Hi, ${name}. How are you?`});
});

app.get('/api/url/:id', (req, res) => {
  console.log("Client Request With URL Param:", req.params.id);
  const id = req.params.id;
  res.json({ "message": `Hi, your ID is ${id}.` });
});

app.post('/api/body', (req, res) => {
  console.log("Client Request With POST Body:", req.body.name);  
  const name = req.body.name;
  res.json({ "message": `Hi, ${name}. How are you?` });
});

app.get('/api/Jonathan', (req, res) => {
  // res.send('Jonathan. <a href="/">home</a>')
  const myVar = 'Hello from server!';
  res.json({ myVar });
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
