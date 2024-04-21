const mongoose = require('mongoose');

const mongoURI = "mongodb://god:god@ac-ammzsmu-shard-00-00.jo9v9c3.mongodb.net:27017,ac-ammzsmu-shard-00-01.jo9v9c3.mongodb.net:27017,ac-ammzsmu-shard-00-02.jo9v9c3.mongodb.net:27017/gofood?ssl=true&replicaSet=atlas-5urc71-shard-0&authSource=admin&retryWrites=true&w=majority"

const mongoDB = async()=>{

mongoose.connect(mongoURI) // connection to database
.then(()=>{
    console.log("connected")
    fetchData()
})
.catch((err)=>console.log("error",err));

const connection = mongoose.connection;


async function fetchData () { //getting data
  const foodItems  = await connection.db.collection("food_items");
  const fItem = foodItems.find().toArray()
  const data = await fItem
  const foodCategory  = await connection.db.collection("foodCategory");
  const fCat = foodCategory.find().toArray()
  const catData = await fCat

  // console.log(data)
  global.food_items = data;//making it available for whole backend
  global.food_category = catData;
}
}


module.exports=mongoDB;