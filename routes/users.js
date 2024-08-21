// var express = require('express');
// var router = express.Router();
// const mongoose = require('mongoose');
// const bodyParser = require("body-parser");
// const dotenv = require("dotenv");
// dotenv.config();
// // const username = process.env.MONGODB_USERNAME;
// // const password = process.env.MONGODB_PASSWORD;
// // mongoose.connect(`mongodb://127.0.0.1:27017/mini1`)
// // mongoose.connect(`mongodb+srv://${usernamee}:${passwordd}@cluster0.biuxurt.mongodb.net/formOne`
// mongoose.connect(`mongodb+srv://userone:userone@cluster0.biuxurt.mongodb.net/formOne?retryWrites=true&w=majority&appName=Cluster0`,
//   // {
//   //   useNewUrlParser: true,
//   //   useUnifiedTopology: true,
//   // }
// )
// .then(() => {
//   console.log("Connected to MongoDB Atlas successfully!"); 
// })
// .catch((error) => {
//   console.error("Error connecting to MongoDB Atlas:", error);
// });

// const userSchema = mongoose.Schema({
//   username:String,
//   email:String,
//   name:String,
//   password:String,
//   posts:[{
//     type:mongoose.Schema.Types.ObjectId, ref:"post"
//   }]
// })

// module.exports = mongoose.model("user", userSchema)



// // module.exports = router;


// var express = require('express');
// var router = express.Router();
// const mongoose = require('mongoose');
// const bodyParser = require("body-parser");
// const dotenv = require("dotenv").config();

// // Load environment variables for credentials (assuming .env file exists)
// const usernamee = process.env.MONGODB_USERNAME;
// const passwordd = process.env.MONGODB_PASSWORD;

// // Connect to MongoDB Atlas with authentication details and improved options

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = `mongodb+srv://${usernamee}:${passwordd}@cluster0.jrqqq.mongodb.net/formOne?retryWrites=true&w=majority&appName=Cluster0`;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);


// const userSchema = mongoose.Schema({
//   username: String,
//   email: String,
//   name: String,
//   password: String, // Ensure password is hashed before storing
//   posts: [{  // Array of references to posts (optional)
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "post"  // Reference to the "post" model
//   }]
// });  

// module.exports = mongoose.model("user", userSchema);





var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();

// Load environment variables for credentials
const usernamee = process.env.MONGODB_USERNAME;
const passwordd = process.env.MONGODB_PASSWORD;

// Mongoose connection to MongoDB Atlas with authentication details
const uri = `mongodb+srv://${usernamee}:${passwordd}@cluster0.jrqqq.mongodb.net/formOne?retryWrites=true&w=majority`;

// Connect to MongoDB with Mongoose
mongoose.connect(uri, 
//   {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }
)
.then(() => console.log("Successfully connected to MongoDB with Mongoose!"))
.catch(err => console.error("Connection error:", err));

// Define the user schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  name: String,
  password: String, // Ensure password is hashed before storing
  posts: [{  // Array of references to posts (optional)
    type: mongoose.Schema.Types.ObjectId,
    ref: "post"  // Reference to the "post" model
  }]
});

// Export the user model
module.exports = mongoose.model("user", userSchema);
