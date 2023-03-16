const express = require("express");
const cors = require('cors');
const app = express();
const port = process.env.port || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("hello");
});

const uri =
  "mongodb+srv://mascara-jwellary:tDT1C18xxq9qceDT@cluster0.ugpmzsn.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run(){
    try{
        const displayProduct = client.db("mascara-jwellary").collection("displayProduct");
        const users = client.db("mascara-jwellary").collection("users");
        const products = client.db("mascara-jwellary").collection("products");

        app.get('/displayProduct', async(req,res)=>{
            const query = {};
            const data = await displayProduct.find(query).toArray()
            res.send(data)
        });
        
        // user post routes

        app.post('/users', async(req, res)=>{
          const usersData = req.body;
          const result = await users.insertOne(usersData);
          res.send(result)
        });

        // get user by email
        app.get('/users/:email', async(req,res)=>{
          const email = req.params.email;
          const query = {email : email};
          const user = await users.findOne(query);
          res.send(user)
        });
        // get all users
        app.get('/allusers', async(req,res)=>{
          const query = {};
          const allUsers = await users.find(query).toArray();
          res.send(allUsers)
        });

        // add product api
        app.post('/add-product', async(req, res)=>{
          const productData = req.body;
          const result = await products.insertOne(productData);
          res.send(result)
        });
        // get all the products api

        app.get('/allproducts', async(req,res)=>{
          const query = {};
          const product = await products.find(query).toArray();
          res.send(product)
        })
    }
    finally{

    }
}

run().catch(err => console.log(err))

app.listen(port, () => {
  console.log("port is listening");
});
