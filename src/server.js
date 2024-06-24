const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/api', routes);

const uri = "mongodb+srv://diegmero12:diegmero12@cluster0.rxpsijg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log("Conectado a la base de datos");
  } catch (e) {
    console.error(e);
  }
}

connectDB();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
