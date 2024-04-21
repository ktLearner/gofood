const express = require('express');
const router = express.Router()

router.post('/foodData',(req,res)=>{
try {
    res.send([global.food_items,global.food_category])  // send the retrived data from database to frontend
} catch (error) {
    console.error(error.message);
    res.send("Server Error")
}})


module.exports = router;



//frontend -> backend <-> database