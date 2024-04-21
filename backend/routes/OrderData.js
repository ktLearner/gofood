const express = require('express');
const router = express.Router()
const Order = require('../models/Orders')
router.post('/orderdata', async (req, res) => {

    let data = req.body.order_data
    await data.splice(0, 0, { Order_data: req.body.order_date })

    let eId = await Order.findOne({ 'email': req.body.email })
    console.log(eId)
    if (eId == null) {

        try {

            await Order.create({
                email: req.body.email,
                order_data: [data]

            }).then(() => {
                res.json({ sucess: true })
            })
        } catch (error) {
            console.error(error.message);
            res.send("Server Error", error.message)
        }
    }
    else {
        try {

            await Order.findOneAndUpdate({
                email: req.body.email,

            }, { $push: { order_data: data } }
            ).then(() => {
                res.json({ sucess: true })
            })
        } catch (error) {
            res.send("Server Error", error.message)
        }

    }
}
)
router.post('/myOrder', async (req, res) => {

    
        try {
            let myData = await Order.findOne({ 'email': req.body.email })
            // res.send("NO orders yet");
            // console.log("kk")
            // console.log(myData.order_data)
            res.json({orderData:myData})
            // console.log(myData.order_data)
            // res.send(myData.order_data)
           
        } catch (error) {
            console.error(error.message);
            res.send("Server Error", error.message)
        }
    }
)


module.exports = router;



//frontend -> backend <-> database