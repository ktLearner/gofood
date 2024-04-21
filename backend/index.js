const express = require('express')
const app = express()
const port = 5000

//database
const mongoDB = require("./db")
mongoDB();

//linking frontend with permission
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
})
//middlewares
app.use(express.json())
app.use('/api', require("./routes/CreateUser")) 
app.use('/api', require("./routes/DisplayData"))
app.use('/api', require("./routes/OrderData"))


app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})