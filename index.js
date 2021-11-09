const express = require('express')
const app = express()
const { MongoClient } = require("mongodb");
const port = process.env.PORT || 5000
require("dotenv").config();


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.doqsn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri);


async function run() {
    try {
      await client.connect();
      const database = client.db('sample_mflix');
      const movies = database.collection('movies');
      // Query for a movie that has the title 'Back to the Future'
        
      
    //   const query = { title: 'Back to the Future' };
    //   const movie = await movies.findOne(query);
      console.log("o");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);

  app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

//visit localhost:3000
// assuming you have done 1) npm init 2) npm install express



// Replace the uri string with your MongoDB deployment's connection string.

