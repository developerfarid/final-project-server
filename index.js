const express = require('express')
const app = express()
const cors = require("cors")
const ObjectId = require('mongodb').ObjectId;
const { MongoClient } = require("mongodb");
const port = process.env.PORT || 5000
require("dotenv").config();

app.use(cors())
app.use(express.json())
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.doqsn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri);


async function run() {
  try {
    await client.connect();
    const database = client.db('assinment12');
    const productCollection = database.collection('product');
    const orderCollection = database.collection('order');
    const usersCollection = database.collection('users');
    const reviewCollection = database.collection('review');
    const newsLetterCollection = database.collection('newsLetter');

    app.post("/product", async (req, res) => {
      const result = await productCollection.insertOne(req.body)
      res.json(result)
    })
    app.post("/order", async (req, res) => {
      const result = await orderCollection.insertOne(req.body)
      res.json(result)
    })
    app.post("/newsLetter", async (req, res) => {
      const result = await newsLetterCollection.insertOne(req.body)
      res.json(result)
    })
    app.post("/users", async (req, res) => {
      const result = await usersCollection.insertOne(req.body)
      res.json(result)
    })
    app.post("/review", async (req, res) => {
      const result = await reviewCollection.insertOne(req.body)
      res.json(result)
    })
    app.put("/users", async (req, res) => {
      const user = req.body
      console.log();
      const fillter = { email: user.email }
      const options = { upsert: true };
      const updateSet = {$set:user}
      const result = await usersCollection.updateOne(fillter, updateSet, options)
      res.json(result)
    })
    app.get("/product", async (req, res) => {
      
      const result = await productCollection.find({}).limit(6).toArray();
      res.send(result)
    })
    app.get("/productAll", async (req, res) => {
      
      const result = await productCollection.find({}).toArray();
      res.send(result)
    })
    app.get("/order", async (req, res) => {
      const result = await orderCollection.find({}).toArray();
      res.send(result)
    })
    app.get("/review", async (req, res) => {
      const result = await reviewCollection.find({}).toArray();
      res.send(result)
    })
    app.put("/order/:id", async (req, res) => {
      const id = req.params.id
      console.log(id);
      const query = {_id: ObjectId(id)};
      console.log(query);
      const options = { upsert: true };
      console.log(req.body);
      const updateDoc = {
        $set: {
            status:req.body?.up
        },
    };
    const result = await orderCollection.updateOne(query,updateDoc,options )
        res.json(result)

  })

  app.put('/users/admin',  async (req, res) => {
    const user = req.body;

            const filter = { email: user.email };
            const updateDoc = { $set: { role: 'admin' } };
            const result = await usersCollection.updateOne(filter, updateDoc);
            res.json(result);
 })

    app.get("/order/:email", async (req, res) => {
      const email = req.params.email
      const query = orderCollection.find({email :email })
        const result = await query.toArray()
        res.send(result)
      })
    app.get("/users/:email", async (req, res) => {
      const email = req.params.email
      const query = usersCollection.find({email :email })
        const result = await query.toArray()
        res.send(result)
      })

    app.delete("/order/:id", async (req, res) => {
      const id = req.params.id
      console.log(id);
      const query = { _id: ObjectId(id) };
      console.log(query);
      const result = await orderCollection.deleteOne(query)
          res.send(result)

    })
    app.delete("/productAll/:id", async (req, res) => {
      const id = req.params.id
      // console.log(id);
      const query = { _id: ObjectId(id) };
      console.log(query,"ok");
      const result = await productCollection.deleteOne(query)
          res.send(result)

    })
    app.get("/product/:id", async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) };
      const result = await productCollection.findOne(query)
      res.send(result)
    })

    console.log("ok");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

//visit localhost:3000
// assuming you have done 1) npm init 2) npm install express



// Replace the uri string with your MongoDB deployment's connection string.

