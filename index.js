const express = require('express');

const app = express();

app.use(express.json());


app.get("/", (req, res)=>{
    res.send("Hi, home route is working fine!! ")
})

app.post("/order", async (req, res)=>{
    const amount = req.body.amount;

    var instance = new Razorpay({ key_id: 'YOUR_KEY_ID', key_secret: 'YOUR_SECRET' });

    var options = {
        amount: amount*100, //amount in the smallest currency unit(paise)
        currency: "INR",
        receipt: "order_receipt_11",
        notes:{
            key1:"val1",
            key2: "val2"
        }
    };

    // instance.orders.create(options);

    const myOrder = await instance.orders.create(options);

    res.status(200).json({
        success: true,
        amount,
        order: myOrder
    });

})


app.listen(4000, ()=>console.log(`Server is running at port 4000.....`));