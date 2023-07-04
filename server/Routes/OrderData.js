const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
    try {
      let data = req.body.order_data;
      data.unshift({ Order_date: req.body.order_date });
      console.log("User Email:", req.body.email);
  
      let order = await Order.findOne({ email: req.body.email });
      console.log("Order:", order);
  
      if (!order) {
        await Order.create({
          email: req.body.email,
          order_data: [data]
        });
      } else {
        await Order.findOneAndUpdate(
          { email: req.body.email },
          { $push: { order_data: data } }
        );
      }
  
      res.json({ success: true });
    } catch (error) {
      console.log("Error:", error.message);
      res.status(500).send("Server Error: " + error.message);
    }
  });

router.post('/myOrderData', async (req, res) => {
    try {
        console.log(req.body.email)
        let eId = await Order.findOne({ 'email': req.body.email })
        //console.log(eId)
        res.json({orderData:eId})
    } catch (error) {
        res.send("Error",error.message)
    }
    

});



module.exports = router;